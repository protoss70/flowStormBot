import ChannelService from './ChannelService';
import BrowserFeatures from './BrowserFeatures';
import fire from './firebase';
import axios from "axios";

export default function Bot(url, deviceId, autoStart, clientCallback, fromKotlin = true, ttsFileType = 'mp3') {
	class BotInterface {}
	let service = null;
	let receivedRecords = [];
	let currentAudio = undefined;

	let outputAudio = true;
	let inputAudio = true;
	let maskSignals = true;
	let saveSession = false;
	let startMessage = '#intro';
	let key = undefined;
	let language = 'en';
	let allowedSounds = ['error'];
	let userToken = undefined;

	const bot = fromKotlin ? this : new BotInterface();
	bot.botCallback = clientCallback;
	bot.sessionEnded = false;
	let audioOpen = false;
	let lastResponseEmpty = false;
	let sleepTimeLimit = 0;
	let queueRunning = false;
	let queueWaiting = false;
	let userTyping = false;

	let startTime = 0;
	let turnLogs = [];
	let lastSttResult = '';

	const audios = {
		listening: new Audio('https://repository.flowstorm.ai/audio/client/listening.mp3'),
		recognized: new Audio('https://repository.flowstorm.ai/audio/client/recognized.mp3'),
		waiting: new Audio('https://repository.flowstorm.ai/audio/client/waiting.mp3'),
		error: new Audio('https://repository.flowstorm.ai/audio/client/error.mp3'),
		sleep: new Audio('https://repository.flowstorm.ai/audio/client/sleep.mp3'),
	};
	const waitingSoundDelay = 0;

	let senderId = deviceId;
	if (deviceId === undefined && typeof window.localStorage !== 'undefined') {
		if (localStorage.getItem('sender') === null) {
			senderId = [...Array(16)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
			localStorage.setItem('sender', senderId);
		} else {
			senderId = localStorage.getItem('sender');
		}
	}

	bot.pause = () => {
		setClientStatus('PAUSED');
		if (currentAudio.src !== '' && outputAudio) currentAudio.pause();
	};

	bot.resume = () => {
		setClientStatus('RESPONDING');
		if (currentAudio.src !== '' && outputAudio) currentAudio.play();
		else if (!outputAudio) {
			skipPlayedMessages();
			setClientStatus('LISTENING');
		}
	};

	bot.inAudio = state => {
		const statusString = inputAudio ? 'on' : 'off';
		addLog('INFO', 'Input audio ' + statusString);
		if (state === 'LISTENING') {
			if (inputAudio) {
				handleAudioInput(userTyping);
			} else {
				bot.closeAudioStream('InputAudioEvent', true);
			}
		}
	};

	bot.setInAudio = (bool, state) => {
		inputAudio = bool;
		const statusString = inputAudio ? 'on' : 'off';
		addLog('INFO', 'Input audio ' + statusString);
		if (state === 'LISTENING') {
			if (inputAudio) {
				handleAudioInput(true);
			} else {
				bot.closeAudioStream('InputAudioEvent', true);
			}
		}
		bot.setInCallback();
	}

	bot.setInCallback = () => {};

	bot.setOutAudio = (bool, state) => {
		if (outputAudio === bool){
			const statusString = outputAudio ? 'on' : 'off';
			addLog('INFO', 'Output audio ' + statusString);
			return;
		}

		if (outputAudio) {
			if (state === 'RESPONDING') {
				onRespondingClick();
			}
			outputAudio = false;
		} else {
			outputAudio = true;
		}
		const statusString = outputAudio ? 'on' : 'off';
		addLog('INFO', 'Output audio ' + statusString);
	}

	bot.outAudio = state => {
		if (outputAudio) {
			if (state === 'RESPONDING') {
				onRespondingClick();
			}
			outputAudio = false;
		} else {
			outputAudio = true;
		}
		const statusString = outputAudio ? 'on' : 'off';
		addLog('INFO', 'Output audio ' + statusString);
	};

	bot.getOutAudio = () =>{
		return outputAudio;
	};

	bot.click = status => {
		addLog('INFO', 'Click on state ' + status);
		switch (status) {
			case 'RESPONDING':
				onRespondingClick();
				break;
			default:
				break;
		}
	};

	bot.playAudio = (audio) => {
		addLog('INFO', 'Playing audio file ' + audio);
	    if (audio && outputAudio) {
            currentAudio.src = audio;
            currentAudio.addEventListener('ended', handleAudioEnded);
            currentAudio.play().catch(error => {
				errorCallback({ type: 'Client', message: `Audio error in ${currentAudio.src}:  ${error}` });
            });
        }
        if (currentAudio.src === '' || !outputAudio || !audio) {
            bot.addRecord();
        }
	};

	bot.startTyping = () => {
	    userTyping = true;
	}

	window.addEventListener('message', event => {
		if (event.data === 'BotStopEvent') {
			bot.onStopClick();
		}
	});

	bot.init = function(
		appKey,
		lang,
		defaultInputAudio,
		defaultOutputAudio,
		startingMessage = '#intro',
		mask = true,
        sounds = ['error'],
		save = false,
		token = undefined,
	) {
		outputAudio = defaultOutputAudio;
		inputAudio = defaultInputAudio;
		key = appKey;
		language = lang;
		startMessage = startingMessage;
		maskSignals = mask;
		allowedSounds = sounds;
		saveSession = save;

	    userToken = token;

		if (sleepTimeLimit < getCurrentMillis() || sleepTimeLimit === 0) {
			return initialize();
		} else {
			sleepTimeLimit = 0;
			service
				.sendText(startMessage)
				.then(_ => {
				    startTime = getCurrentMillis();
                    addSentMessage(startMessage);
					return this;
				})
				.catch(error => {
					initialize();
				});
		}
	};

	bot.getFiles = async (query, url="https://manual-search-develop.alquist.ai/retrieve") => {
		const data = {query}
		var results = null;
		try{
			results = await axios.post(url, data, {headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}});
		}
		catch{
			results = {}
		}
		return results;
	}

	bot.getPage = async (page, index) => {
		const url = `https://manual-search-develop.alquist.ai/download/${index}/${page}.pdf`;
		const config = {
			"Content-Type": "application/json",
			"Content-Disposition": "inline"
		}
		console.log(url);
		return await axios.get(url, config);
	}

	bot.checkExistingUser = async () => {
		return await fire.newUser();
	}

	bot.signIn = async () => {
		await fire.SignIn();
		const user = fire.currentUser();
		if (user){
			sessionStorage.setItem("flowstorm-bot-user", user._delegate.email);
		}
		return user; 
	}

	bot.signOut = () => {
		fire.signOut();
	}

	bot.updateUser = async (updates) => {
		const userEmail = fire.currentUser()._delegate.email;
		fire.update(userEmail, updates)
	} 

	bot.getUser = async () => {
		const user = fire.currentUser();
		var email = null;
		if (user === null){
			email = sessionStorage.getItem("flowstorm-bot-user");
		}else{
			email = user._delegate.email;
		}
		
		if (email){
			const res = await fire.findUser(email);
			if (res._delegate._document === null){
				return null;
			}else{
				return res.data();
			}
		}
		return null
	}

	function initialize() {
		sleepTimeLimit = 0;
		currentAudio = new Audio('https://repository.flowstorm.ai/audio/client/intro.mp3');
		const audioPromise = currentAudio.play();
		fire.initApp();
		if (audioPromise !== undefined) {
			audioPromise
				.then(_ => {
				    if (!allowedSounds.includes('intro')){
				        currentAudio.pause();
				        currentAudio.currentTime = 0;
                    }
					console.log('Audio OK');
				})
				.catch(error => {
					console.error(error);
				});
		}
		for (const key in audios) {
		    audios[key].volume = 0.0;
			audios[key].play().then(_ => {
				audios[key].pause();
				audios[key].currentTime = 0;
			});
		}
		startTime = getCurrentMillis();

		console.log('Bot init');
		addLog('INFO', 'Bot init');


		const endpoint = '/socket/';
		service = new ChannelService(
			new BrowserFeatures(),
			url.replace('http', 'ws') + endpoint,
			onMessage,
			errorCallback,
			key,
			language,
			senderId,
			bot,
			userToken,
			ttsFileType
		);
		service
			.open()
			.then(() => {})
			.catch(error => {
				errorCallback({ type: 'Client', message: `Error opening socket:  ${error}` });
			});
		return this;
	}

	function addLog(level, text) {
	    const time = new Date();
	    const relativeTime = (getCurrentMillis() - startTime) / 1000;
	    turnLogs.push({time, relativeTime, level, text});
	}

	function setClientStatus(status) {
        addLog('INFO', 'Client status changed to ' + status);
	    clientCallback.setStatus({ 'status': status });
	}

	function errorCallback(err) {
		playSound('error');
		addLog('ERROR', err.message);
        service.sendLogs(turnLogs);
        turnLogs = [];
        clientCallback.onError(err);
		bot.onStopClick();
		clientCallback.onEnd();
	}

	function isNotNil(param) {
		return param !== null && param;
	}

	function handleAudioEnded() {
		currentAudio.removeEventListener('ended', handleAudioEnded);
		bot.addRecord();
	}

	bot.addRecord = function() {
		if (isNotNil(receivedRecords) && receivedRecords.length > 0) {
			const [head, ...tail] = receivedRecords;
			const { audio, image, text, background, video, code, nodeId,  dialogueNodeId} = head;

			// const bulkMessages = filter(isNotNil, [text, image]);

			if (clientCallback.focusOnNode && nodeId !== 0) clientCallback.focusOnNode(nodeId);
			if (video){
			    clientCallback.addVideo(video, function () {
			        receivedRecords = tail;
                    if (currentAudio.src === '' || !outputAudio || !audio) {
                        bot.addRecord();
                    }
			    });
			} else {
                receivedRecords = tail;
				console.log(receivedRecords);
			    if (text.startsWith('#') && text.length > 1 &&text.substring(0, 2) !== "# "){
                    clientCallback.handleCommand(text, code);
                    // TODO rework to be more general
                    if (text !== '#walk')
                        bot.addRecord();
			    } else {
                    clientCallback.addMessage('received', text, image, background, nodeId, dialogueNodeId);
                    bot.playAudio(audio);
			    }
			}

		} else if (!queueRunning) {
			if (service.sessionId && sleepTimeLimit === 0) {
			    const delay = audioOpen ? 200 : 0;
			    setTimeout(() => { handleAudioInput(false);}, delay)
			} else {
				if (bot.sessionEnded || sleepTimeLimit !== 0) {
					playSound('sleep');
					clientCallback.onEnd();
				}
				clientCallback.setStatus({ isActive: true, status: 'SLEEPING' });
			}
			receivedRecords = undefined;
		} else {
		    queueWaiting = true;
		}
	}

	const itemMap = ({ audio, image, text, ssml, background, video, code, nodeId }) => ({
        audio: isNotNil(audio)
            ? audio.startsWith('/')
                ? `${url}${audio}`
                : audio
            : isNotNil(ssml)
            ? ssml.includes('<audio')
                ? ssml.split('"')[1]
                : null
            : null,
        image: isNotNil(image) ? (image.startsWith('/') ? `${url}${image}` : image) : null,
        video: isNotNil(video) ? video : null,
        text: isNotNil(text) ? text : '',
        background: isNotNil(background) ? (background.length === 0 ? null : background) : null,
        code: isNotNil(code) ? (code.length === 0 ? '{}' : code) : '{}',
        nodeId: isNotNil(nodeId) ? nodeId : 0,
    })

	function onMessage(param) {
		const paramResponse = param.response;
		const items = paramResponse === undefined ? [] : paramResponse.items;
		addLog('INFO', 'Received event ' + param.type);
		switch (param.type) {
		    case 'ResponseItem':
				setClientStatus('RESPONDING');
		        stopWaitSound();
                const record = itemMap(param.responseItem);
                if (receivedRecords === undefined) {
                    receivedRecords = [];
                }
				if (param.responseItem.ttsConfig && param.responseItem.ttsConfig.locale && service.language !== param.responseItem.ttsConfig.locale){
					service.setLanguage(param.responseItem.ttsConfig.locale);
					service.language = param.responseItem.ttsConfig.locale;
				}

                receivedRecords.push(record);
                if (!queueRunning || queueWaiting) {
                    queueWaiting = false;
                    queueRunning = true;
                    bot.addRecord();
                }
                break;
			case 'Response':
				setClientStatus('RESPONDING');
				// TODO remove
				stopWaitSound();
				service.language = paramResponse.locale;
				lastResponseEmpty = items.length === 0;
				if (paramResponse.sleepTimeout > 0) {
					sleepTimeLimit = getCurrentMillis() + paramResponse.sleepTimeout * 1000;
				}
				const records = items.map(itemMap);
                if (receivedRecords !== undefined) {
				    receivedRecords = receivedRecords.concat(records);
                } else {
                    receivedRecords = records;
                }
				clientCallback.addLogs(paramResponse.logs);
				if (paramResponse.sessionEnded) {
                    bot.sessionEnded = true;
                    service.setSessionId(null);
				}
                if (!queueRunning || queueWaiting) {
                    queueRunning = false;
                    queueWaiting = false;
                    bot.addRecord();
                } else {
                    queueRunning = false;
                }
				break;
			case 'Recognized':
				// Difference between Firefox and Chrome
				const recognizedItems = param.message === undefined ? [param] : param.message.items;
				const recognizedItem = recognizedItems[0];
				// const bulkMessages = transformIncomingMessages(recognizedItems);
				if (recognizedItem.text.length >= lastSttResult.length || recognizedItem.isFinal) {
				    lastSttResult = recognizedItem.text;
			        addSentMessage(recognizedItem.text);
                }
			    startTime = getCurrentMillis();
				// startWaitSound();
				lastSttResult = '';
				if (recognizedItem.isFinal) {
                    setClientStatus('PROCESSING');
                    bot.closeAudioStream('recognized', false);
				}
				break;
			case 'Ready':
				service.setSessionId(clientCallback.getUUID());
				bot.sessionEnded = false;
				audioOpen = false;
				if (autoStart) {
					addSentMessage(startMessage);
					service.sendText(startMessage);
					startTime = getCurrentMillis();
				} else {
					clientCallback.play('bot_ready');
				}
				break;
			case 'InputAudioStreamOpen':
				// clientCallback.setStatus({ inputDisabled: false, status: 'LISTENING'});
				setClientStatus('LISTENING');
				break;
			case 'SessionStarted':
				const sessionId = param.sessionId;
                lastSttResult = '';
				service.setSessionId(sessionId);
				setClientStatus('RESPONDING');
				break;
			case 'Error':
                clientCallback.onError({ type: 'Server:', message: param.text });
				playSound('error');
				if (sessionId === null) {
				    break;
				}
			case 'SessionEnded':
			    service.sendLogs(turnLogs);
			    turnLogs = [];audioOpen
			    startTime = 0;
				bot.sessionEnded = true;
				bot.closeAudioStream('sessionEnd', false);
				service.setSessionId(null);
				if (!outputAudio) {
					clientCallback.onEnd();
					stopWaitSound();
					playSound('sleep');
					setClientStatus('SLEEPING');
				}
				break;
			default:
				break;
		}
	}
	bot.closeAudioStream = (origin = 'default', sendEvent = true) => {
		if (origin !== 'sessionEnd') playSound('recognized');
		if (audioOpen) {
			service
				.getStt()
				.stop(sendEvent)
				.then(() => {
					audioOpen = false;
				})
				.catch(() => {
					errorCallback({ type: 'Client', message: `Speech to text stop error in ${origin}` });
				});
		}
	}
	function handleAudioInput(start) {
        service.sendLogs(turnLogs);
        turnLogs = [];
		if (inputAudio) {
			if (start && !audioOpen && sleepTimeLimit < getCurrentMillis()) {
				playSound('listening');
				service
					.getStt()
					.start()
					.then(() => {
						audioOpen = true;
					})
					.catch(e => {
					    if (saveSession) {
                            setClientStatus('LISTENING');
					    } else {
					        errorCallback({ type: 'Client', message: `Speech to text start error: ${e}` });
					    }
					});
			} else {
				setClientStatus('LISTENING');
			}
		} else {
			setClientStatus('LISTENING');
		}
	}

	bot.audioInputCallback = () => {};

	bot.handleOnTextInput = (text, audioOn, setting = {}) => {
		const incomingAction = skipPlayedMessages();
		userTyping = false;
		sleepTimeLimit = 0;
		bot.audioInputCallback();
		if (!incomingAction){
			if (!setting.sopInput && !setting.buttonInput){
				addSentMessage(text, null);
			}
			setClientStatus('PROCESSING');
			// startWaitSound();
			service.sendText(text);
			startTime = getCurrentMillis();
			if (audioOn && inputAudio) {
				bot.closeAudioStream('handleTextInput', false);
			}
		}
	}

	function skipPlayedMessages() {
		var incomingActions = null;
		if (currentAudio.src !== '') {
			currentAudio.pause();
			currentAudio.src = '';

			if (isNotNil(receivedRecords) && receivedRecords.length > 0) {
				receivedRecords.forEach(message => {
					if (isNotNil(receivedRecords) && receivedRecords.length > 0) {
						console.log(receivedRecords);
						if (message.text.startsWith('#') && message.text.length > 1 && message.text.substring(0, 2) !== "# "){
							incomingActions = true;
							clientCallback.handleCommand(message.text, message.code);
						} else {
							clientCallback.addMessage('received', message.text, message.image, message.background, message.nodeId);
							// bot.playAudio(message.audio);
						}
					}
				});
				
				receivedRecords = undefined;
			}
		}
		return incomingActions;
	}

	bot.onStopClick = () => {
		bot.sessionEnded = true;
		stopWaitSound();
		if (currentAudio) skipPlayedMessages();
		if (service) {
			service.setSessionId(null);
			service.close();
		}
		sleepTimeLimit = 0;
		setClientStatus('SLEEPING');
	};

	function startWaitSound() {
		setTimeout(function() {
			audios.waiting.addEventListener('ended', restartWaitingAudio);
			audios.waiting.play();
		}, waitingSoundDelay);
	}

	function stopWaitSound() {
		audios.waiting.removeEventListener('ended', restartWaitingAudio);
		audios.waiting.pause();
		audios.waiting.currentTime = 0;
	}

	function restartWaitingAudio() {
		playSound('waiting');
	}

	function playSound(sound) {
	    if (allowedSounds.includes(sound)) {
		    audios[sound].volume = 1.0;
            audios[sound].currentTime = 0;
            audios[sound].play();
		}
	}

	function getCurrentMillis() {
		const date = new Date();
		return date.getTime();
	}

	function onRespondingClick() {
		skipPlayedMessages();
		if (sleepTimeLimit > 0) {
			clientCallback.onEnd();
			setClientStatus('SLEEPING');
		} else if (!bot.sessionEnded) {
			handleAudioInput(true);
			setClientStatus('LISTENING');
		} else {
			bot.onStopClick();
			clientCallback.onEnd();
		}
	}

	function addSentMessage(messageText) {
	    const text = messageText.charAt(0) === '#' && maskSignals ? null : messageText;
	   	const signal = messageText
        clientCallback.addMessage('sent', text, null, null, signal);
		bot.audioInputCallback();
	}

	return bot;
}
