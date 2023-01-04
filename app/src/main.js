import * as Sentry from '@sentry/browser';
import Bot from '@flowstorm/bot-service';
import BotUI from '@flowstorm/bot-ui';
import { Converter } from 'showdown'
import { Integrations } from '@sentry/tracing';
import { v4 as uuidv4 } from 'uuid';

import {
	getContentAsHtml,
	getCookie,
	getRndInteger,
	sendRequest,
	setCookie,
	BotInitializer
} from './utils';
import {
	playTemplate,
	modalTemplate,
} from './templates';

import './assets/main.scss';

const scrollSpeed = 120; // pixels per second
const scrollDelay = 3; // seconds before the scrolling starts

const environment = '';
let botKey = environment === '' || environment === '-preview' ? '5f7db5f1e662e830b20dbe7c' : '606c52c6d750aa1b1537e5d6';
let studioUrl = environment === 'local' ? 'http://localhost:8089' :  `https://studio${environment}.flowstorm.ai`
let defaultCoreUrl = environment === 'local' ? 'http://localhost:8080' :  `https://core${environment}.flowstorm.ai`

let idToken = undefined
let accessToken = undefined
let termsId = undefined

const converter = new Converter();
var botInitializer = new BotInitializer();
var buttonInput = false;

const audios = {};

const regex = /https:\/\/core(-([0-9]+|preview)){0,1}.flowstorm.ai\/file\/tts\/[0-9a-f]+\.wav/g

const botUIDefaultSettings = {
	guiMode: 'chat',
	fullScreen: false,
	widgetSize: {
		width: '400px',
		height: '700px',
	},
	imageAverageColorOpacity: 0.5,
	backgroundImageBlur: 0,
	textInputEnabled: true,
	collapsable: true,
	backgroundAdvancedAnimationParticlesCount: 5,
	animationSpeed: 500,
	backgroundSimpleAnimation: true,
	collapsed: true,
	sections: ["LOGIN", "INPUTSELECT", "SOP", "QUESTION", "SOLUTIONS", "PDF", "FEEDBACK"],
};

const clientDefaultSetting = {
	allowUrlParams: false,
	botKey,
	customCssClass: null,
	domain: '',
	startMessage: undefined,
	jwtToken: null,
	attributes: {},
	callback: {},
	coreUrl: defaultCoreUrl,
	autoStart: false,
	ttsFileType: 'mp3',
}

let bot = undefined;
let botBackground = undefined;
let botElement;
let modal;
let botState = {};
let paused = true;
let textInputEnabled = false;

export const initFSClientBot = (initParams = {}) => {
	Sentry.init({
		dsn: 'https://da1caa885aee4032898d553d1129571b@o318069.ingest.sentry.io/5438705',
		integrations: [new Integrations.BrowserTracing()],
		tracesSampleRate: 1.0,
		environment,
	});

	const urlParams = new URLSearchParams(window.location.search);
	let settings = {
		...clientDefaultSetting,
		...botUIDefaultSettings,
		...initParams,
	};
	const { allowUrlParams, startMessage } = settings;
	botKey = settings.botKey;
	textInputEnabled = settings.textInputEnabled;
	settings.textInputEnabled = false;
    botInitializer = new BotInitializer(startMessage, settings.attributes);

	if (allowUrlParams) {
	    const urlParamsObject = {};
	    [...(urlParams.entries())].forEach( (urlParamPair) => urlParamsObject[urlParamPair[0]]=urlParamPair[1])
		const urlBotKey = urlParams.get('key');
		if (window.location.pathname.length === 25) {
			botKey = window.location.pathname.substring(1);
		} else if (urlBotKey !== null && urlBotKey.length === 24) {
			botKey = urlBotKey;
		}
		const backgroundAdvancedAnimationParticlesCount = urlParams.get('animObjects') === null ? 5 : parseInt(urlParams.get('animObjects'));
		const backgroundSimpleAnimation = urlParams.get('animate') === null ? true : urlParams.get('animate') === 'true';
		const avatarURL = urlParams.get('avatarURL');
		const animationSpeed = backgroundSimpleAnimation ? 500 : 0;
		settings = {
			...settings,
			backgroundAdvancedAnimationParticlesCount,
			backgroundSimpleAnimation,
			animationSpeed,
			avatarURL,
		    ...urlParamsObject,
		}
	}
	const botUI = initUI(settings);
	if (botUI) {
		createBot(botUI, settings);
		initBot();
		bot.stateHandler = stateHandler;
		window.addEventListener("load", () => {
		    if (settings.interactionMode == 'SOP') {
			    bot.stateHandler(botUI.getSection(), getStatus());
			}
		})
		if (!bot.getInAudio){
			botUI.setInputMode("text");
		}
	} else {
		let { elementId = null } = settings;
		console.error(`Element with ID "${elementId}" was not found in DOM. Cannot initialize BOT UI. Use existing element with ID or remove elementId property from initialization.`);
	}
	return autoStartBot;
}

const initUI = (settings = {}) => {
	let { elementId = null, customCssClass = null } = settings;
	if (elementId === null) {
		const clientElement = document.createElement("div");
		elementId = `fs-client-${uuidv4()}`;
		clientElement.setAttribute('id', elementId);
		document.body.appendChild(clientElement);
	}
	if (customCssClass !== null) {
		customCssClass = customCssClass.toString().split(/[ ,;]+/);
		const element = document.getElementById(elementId);
		if (element) {
			element.classList.add(...customCssClass);
		}
	}
	const botUI = new BotUI(
		elementId,
		settings,
	);
	botUI.setUserText();

	botElement = BotUI.element;
	if (!botElement) {
		return null;
	}

	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			if (mutation.type === "attributes") {
				checkBotUIOverlays(mutation.target);
			}
		});
	});

	observer.observe(botElement, {
		attributes: true,
	});

	if (settings.avatarURL){
        botUI.setWebRtcAvatar(settings.avatarURL);
        settings.ttsFileType = 'wav';
    }

	return botUI;
}

const checkBotUIOverlays = (element) => {
	const { dataset: { collapsable } } = element;
	const playButton = botElement.querySelector('[data-play]');
	if (collapsable === 'collapsed') {
		if (modal) {
			modal.style.display = 'none';
		}
		if (playButton) {
			playButton.style.display = 'none';
		}
	} else {
		if (modal) {
			const modalContentElement = modal.querySelector('[data-fs-bot-modal-consent]');
			const { height: botHeight } = botElement.getBoundingClientRect();
			const { paddingBottom: botPaddingBottom } = getComputedStyle(botElement);
			modalContentElement.style.height = ((botHeight - parseInt(botPaddingBottom, 10)) * 3/5) + 'px';
			modal.style.display = 'block';
		}
		if (playButton) {
			playButton.style.display = 'block';
		}
	}
}

var stateHandler;

var createBot = (botUI, settings) => {
	const { status = undefined } = botState;

	window.addEventListener('message', event => {
		 if (event.data === 'BotStopEvent') {
				clientCallback.onEnd();
		 }
	});

	botUI.disableStop(status === 'SLEEPING' || !status)

	const defaultCallback = {};

	defaultCallback.setStatus = (newState) => {
		botState = newState;
		if (newState.status === 'LISTENING') {
			botUI.setOutputAudio(1);
		} else {
			botUI.setInputAudio(1);
		}
		changePlayIcon(newState.status === 'SLEEPING' || newState.status === 'PAUSED' || !newState.status, botUI);
		botUI.disableStop(newState.status === 'SLEEPING')
		if (newState.status === 'SLEEPING'){
			botUI.setMicIcon(false);
		}
	}

	defaultCallback.getStatusString = (status) => {
		return status;
	}

	defaultCallback.addMessage = (type, text, image, background, signal) => {
		if (type === 'sent') {
			if (text !== null) {
				botUI.setUserText(text);
			}
		} else {
		    paused = true;
			botUI.expand();
			paused = false;
			if (BotUI.botTextKioskElement) {
				BotUI.botTextKioskElement.style.transition = 'transform 0s linear 0s';
				BotUI.botTextKioskElement.style.transform = 'translateY(0px)';
			}
			const playButton = botElement.querySelector('[data-play]')
			if (playButton !== null) { playButton.remove(); }
			botUI.setBotText(text);
			window.setTimeout(() => {
				const windowHeight =
					BotUI.orientation === 'portrait' ? window.innerHeight / 2 : window.innerHeight;
				if (BotUI.botTextKioskElement && BotUI.botTextKioskElement.scrollHeight > windowHeight) {
					const backgroundElementYTranslate = windowHeight - BotUI.botTextKioskElement.scrollHeight;
					BotUI.botTextKioskElement.style.transition =
						'transform ' +
						-backgroundElementYTranslate / scrollSpeed +
						's linear ' +
						scrollDelay +
						's';
					BotUI.botTextKioskElement.style.transform =
						'translateY(' + backgroundElementYTranslate + 'px)';
				}
			}, BotUI.settings.animationSpeed + 5);
		}
		if (image !== undefined && image !== null) {
			botUI.setImage(image);
		}
		if (background !== undefined && background !== null && background !== botBackground) {
			botBackground = background;
			if (settings.avatarURL){
                botUI.sendRTCData({'Background': background});
			} else {
                if (background.startsWith('#')) {
                    botUI.setBackgroundColor(background);
                } else {
                    botUI.setBackgroundImage(background);
                }
			}
		}
	}

	stateHandler = (section, status) => {
		console.log(section);
		if (section === "SOP"){
			if (status === undefined || status === "SLEEPING"){
				botUI.removeOverlay();
				run();
			}
		}
	}

	defaultCallback.addVideo = (url, callback) => {
	    botUI.setVideo(url, callback);
	}

	defaultCallback.addLogs = (logs) => {
		logs.forEach(l => {
			console.log(l.text);
		});
	}

	defaultCallback.onError = (error) => {
		console.log(error);
		Sentry.captureException(error.message);
	}

	defaultCallback.onEnd = () => {
		botUI.setBotText();
		botUI.setUserText();
		botUI.setInputAudio(null);
		botUI.setImage(null);
		addPlayButton(botUI);
        botUI.sendRTCData({'Expression': { 'Name': 'neutral'}});
        if (bot.sessionEnded) { initBot(); }
	}

	async function handleFile(oldMode, index, query){
		console.log(index, query);
		botUI.toggleLoader(true);
		const files = (await bot.getFiles(query, index)).data;
		botUI.toggleLoader(false);
		console.log(files);
		botUI.continueCallback = () => {
			bot.handleOnTextInput(`continue`, false, {sopInput: true});
		}

		botUI.askAnotherCallback = () => {
			bot.handleOnTextInput(`ask another`, false, {sopInput: true});
		}
		
		files.predictions.forEach(file => {
			const page = parseInt(file.name.replace(".pdf", ""));
			file.text = file.doc_name + ", page: " + page;
			file.page = page;
			file.url = async () => {return `https://manual-search-develop.alquist.ai/download/${index}/${page}.pdf`;};
			const settings = {
				oldMode: oldMode,
				groupName: "pdfFiles",
				disableGroup: false,
				appSelect: false,
				solutions: true,
				text:  file.text,
				pdf: {...file}
			}
			botUI.setButton(settings, () => {});
			console.log(settings);
		});
	}

	defaultCallback.handleCommand = (command, code) => {
        const payload = JSON.parse(code);
	    switch(command) {
			case '#expression':
				botUI.sendRTCData({'Expression': { 'Name': payload['name']}});
				break;
			case '#animation':
				botUI.sendRTCData({'Animation': payload['name']});
				break;
			case '#gesture':
				botUI.sendRTCData({'Animation': payload['name']});
				break;
			case '#snow':payload
				botUI.sendRTCData({'Snowing': payload['snowing']});
				break;
			case '#transition':
				botUI.sendRTCData({'Transition': ""});
				break;
			case '#shirt':
				botUI.sendRTCData({'ChangeShirt': payload['state']});
				break;
			case '#level':
				botUI.sendRTCData({'Level': payload['name'] + 'Level'});
				break;
			case '#avatar':
				botUI.sendRTCData({'Character': payload['name']});
				break;
			case '#walk':
				botUI.sendRTCData({'Walk': payload['action']});
				break;
			case "#actions":
				buttonInput = true;
				const oldMode = botUI.getInputMode();
				console.log(payload);
				payload.tiles.forEach(button => {
					const settings = {
						oldMode: oldMode,
						groupName: payload.title,
						disableGroup: true,
						appSelect: payload.appSelect,
						solutions: payload.solutions,
						...button,
					}
					botUI.setButton(settings, () => {
						if (getStatus() === "LISTENING" || getStatus() === "RESPONDING") {
							bot.handleOnTextInput(`#${button.action}`, false, {buttonInput: true});
						}
						bot.setInAudio(botUI.getInputMode() === "voice" ? true : false);
						buttonInput = false;
					});
					bot.setInAudio(false);
				});
				break;
			case "#pdf":
				const query = botUI.getLastUserMessage().children[0].textContent;
				handleFile(oldMode, payload.index.toLowerCase(), query);
				break;
			default:

        }
	}

	defaultCallback.getAttributes = () => {
	    const attributes = botInitializer.getAttributes();
	    botInitializer.resetAttributes();
		return attributes;
	}

	defaultCallback.getUUID = () => uuidv4();

	defaultCallback.getVoice = () => undefined;

	defaultCallback.focusOnNode = () => {}

	defaultCallback.play = (sound) => {
		if (sound === 'in' || sound === 'out') {
			audios[sound].play();
		}
	}

	const sendText = (text) => {
		text = text.trim();
		const status = getStatus();
		if (text === '') return
		if (status === "LISTENING" || status === "RESPONDING") {
			const audioOn = status === "LISTENING" && botUI.getInputMode == 'voice';
			bot.handleOnTextInput(text, audioOn);
		}
	}

	const changeAudio = (direction) => {
		const status = getStatus();
		if (bot != null) {
			if (direction === "Input") {
				// bot.inAudio(status)
				return;
			} else {
				bot.outAudio(status)
			}
		}
	}

	const stop = () => {
		bot.onStopClick()
        if (settings.avatarURL) {
            botUI.sendRTCData({'Stop': ""});
        }
		clientCallback.onEnd()
	}

	const click = () => {
		const status = getStatus();
        if (settings.avatarURL) {
            botUI.sendRTCData({'Stop': ""});
        }
		bot.click(status);
	}

	const run = (minimize = false) => {
		const { status = undefined } = botState;
		console.log(status);
		let pauseOnListening = false;
		switch (status) {
			case 'SLEEPING':
				if (!minimize) {
					botUI.setMicIcon(true);
				    startBot();
				}
				break;
			case 'LISTENING':
				bot.setInAudio(false);
				pauseOnListening = !pauseOnListening;
				changePlayIcon(pauseOnListening, botUI);
				break;
			case 'RESPONDING':
				bot.pause()
				if (settings.avatarURL) {
				    botUI.sendRTCData({'Pause': "true"});
					botUI.removeOverlay();
				}
				break;
			case 'PAUSED':
				bot.resume()
				if (settings.avatarURL) {
				    botUI.sendRTCData({'Pause': "false"});
					bot.setInAudio(botUI.getInputMode() === "voice" ? true : false);
					botUI.resume(botUI.getInputMode, buttonInput);
				}
				break;
			case undefined:
				botUI.setMicIcon(true);
                if (BotUI.avatarElement.children[0]){
                    BotUI.avatarElement.children[0].play();
                }
			    startBot();
		}
	}

	const handleDataChannelResponse = (response) => {
	    switch (response) {
            case 'AudioEnded':
                bot.addRecord();
                break;
            case 'AnimEnded':
                bot.addRecord();
                break;
            default:
                console.log('Received data channel response', response);
        }
	}

	// let deviceId = '';
	// if (localStorage.getItem('sender') === null) {
	//    deviceId = Math.abs(getRndInteger(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)).toString(36);
	//    localStorage.setItem('sender', deviceId);
	// } else {
	//    deviceId = localStorage.getItem('sender');
	// }

    let deviceId = getCookie('deviceId');
    if (deviceId === null) {
    	const { domain } = settings;
        deviceId = Math.abs(getRndInteger(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)).toString(36);
		setCookie('deviceId', deviceId, domain);
    }

    if (settings.jwtToken) {
        accessToken = settings.jwtToken;
        signupAnonymous(botUI);
    } else {
        getTokens(deviceId, (response) => {
            idToken = response['id'];
            accessToken = response['access'];
            signupAnonymous(botUI);
        });
    }


	botUI.chatInputCallback = ((inputValue) => {
		const status = getStatus();
		if (status === "SLEEPING") {
		} else {
			sendText(inputValue);
		}
	});

	botUI.chatMicrophoneCallback = (inputValue) => changeAudio("Input");

	botUI.chatMuteCallback = (inputValue) => changeAudio("Output");

	botUI.chatArrowCallback = (inputValue) => click();

	botUI.chatPlayCallback = (inputValue) => {
		paused = !paused;
		run();
	}

	botUI.sectionChangeCallback = (section) => {
		stateHandler(section, getStatus());
	}

	botUI.chatSopNextCallback = (inputValue) => {
		const status = getStatus();
		console.log(status);
		if (status !== undefined && status !== "SLEEPING") {
			bot.handleOnTextInput(`yes`, false, {sopInput: true});
		}
	}

	botUI.chatBackCallback = (inputValue) => {
		botUI.previousSection();
		bot.setInAudio(botUI.getInputMode() === "voice" ? true : false);
	}

	botUI.setModeCallback = (mode) => {
		if (mode === "voice"){
			bot.setInAudio(true);
			if(getStatus() === "LISTENING"){
				bot.inAudio("LISTENING");
				botUI.addOverlay();
			}
		}else if(mode === "sop"){
			bot.setInAudio(false);
			bot.closeAudioStream('handleTextInput', false);
		}
	}

	botUI.chatMicCallback = (inputValue) => {
		if (settings.interactionMode === 'SOP') {
            const status = getStatus();
            if (status === "SLEEPING" || status === undefined){
                run();
                botUI.setMicIcon(true);
            } else {
                stop();
            }
		} else {
            botUI.setMicIcon(BotUI.chatInputMicElement.classList.contains('icon--light'));
		    botUI.chatMicrophoneCallback()
		}
		
	}

	botUI.chatSopQuestionCallback = (inputValue) => {
		botUI.setSection("QUESTION");
	}

	botUI.chatKeyboardCallback = (inputValue) => {
		var mode = botUI.getInputMode();
		mode = mode === "text" ? "voice" : "text";
		botUI.setInputMode(mode);
		bot.setInAudio(mode === "voice" ? true : false);
		if (mode === "voice" && getState() === "LISTENING"){
			botUI.addOverlay();
		}
	}

	botUI.chatStopCallback = (inputValue) => stop();

	botUI.chatTextInputElementCallback = (inputValue) => {
	    const status = getStatus();
	    if (status === 'LISTENING'){
            bot.closeAudioStream('User started typing', true);
        } else  if (status === 'RESPONDING'){
            bot.startTyping();
        }
	}

	botUI.dataChannelMessageCallback = (dataArray) => {
        const messageType = dataArray[0];
        switch(messageType){
            case 1:
                const messageString = new TextDecoder('utf-16').decode(dataArray.slice(1));
                handleDataChannelResponse(messageString);
                break;
        }
	}


	botUI.collapsableTriggerCallback = ((collapsed) => {
		const status = getStatus();
		if (!paused && status) {
			run(true);
		}
	});

    const clientCallback = {
        ...defaultCallback,
        ...settings.callback
    };

	bot = Bot(
		settings.coreUrl,
		deviceId, // sender
		settings.autoStart, // autostart
		clientCallback,
		false, // called from Kotlin
		settings.ttsFileType,
	);

	if (settings.avatarURL){
        bot.playAudio = (audio) => {
            if (audio === null) {
                bot.addRecord();
            } else if (audio.match(regex)){
                botUI.sendRTCData({'PCM': audio});
            } else {
                const newAudio = new Audio(audio);
                newAudio.onended = bot.addRecord;
                newAudio.play();
            }
        }
    }

	return bot;
};

const getStartAction = () => {
    let startAction = botInitializer.getMessage();
    const urlParams = new URLSearchParams(window.location.search);
    if (startAction) {
        botInitializer.setMessage(botInitializer.defaultStartMessage);
        return startAction;
    } else if (window.location.hash) {
        return window.location.hash;
    } else if (urlParams.get('text') !== null) {
        return `#${urlParams.get('text')}`;
    } else {
        return '#intro';
    }
};

const getStatus = () => {
	let  { status = undefined } = botState;
	return status;
}

const startBot = () => {
	const status = getStatus();
    if (status === undefined || status === 'SLEEPING') {
        bot.handleOnTextInput(getStartAction(), false);
    }
};

const autoStartBot = (startMessage, attributes) => {
    botInitializer.addAttributes(attributes);
    botInitializer.setMessage(startMessage);
    startBot();
};

const initBot = () => {
	if (bot) {
		bot.init(botKey, 'en', true, true, getStartAction(), undefined, undefined, undefined, accessToken);
	} else {
		Sentry.captureMessage('Bot is undefined');
		console.error('There was an unexpected error with the bot. Please try reloading the page.');
	}
};

const getTokens = function(deviceId, callback) {
    sendRequest(studioUrl + '/auth/' + deviceId, 'GET', callback);
}

const signupAnonymous = function(botUI) {
    sendRequest(
        studioUrl + '/user/signupAnonymous',
        'POST',
        () => {
            getTermsByApplication(botKey, botUI);
        },
        accessToken,
        null,
        () => {
            getTermsByApplication(botKey, botUI);
        },
    );
}

const getTermsByApplication = (appKey, botUI) => {
    sendRequest(studioUrl + '/terms/application/' + appKey,
		'GET',
		(response) => {
        if (response === null) {
			addPlayButton(botUI);
        } else {
            termsId = response['_id'];
			getConsent(botUI);
        }
    	},
		accessToken,
		null,
		() => {
			addPlayButton(botUI);
    	},
	);
}

const addPlayButton = (botUI) => {
    if (textInputEnabled) {
        botUI.setTextInputEnabled(textInputEnabled);
        changePlayIcon(true, botUI);
    } else {
        BotUI.element.style.setProperty('--bot-ui-chat-input-height', BotUI.element.style.getPropertyValue('--bot-ui-chat-pcm-height'));
        const playHtml = getContentAsHtml(playTemplate);
        botElement.append(playHtml);
        botElement.querySelector('[data-play]').onclick = (e) => {
            if (mobileCheck() && BotUI.settings.fullScreen){
                if (document.body.requestFullScreen) {
                    document.body.requestFullScreen();
                } else if (document.body.mozRequestFullScreen) {
                    document.body.mozRequestFullScreen();
                } else if (document.body.webkitRequestFullScreen) {
                    document.body.webkitRequestFullScreen();
                }
            }
            if (BotUI.avatarElement.children[0]){
                BotUI.avatarElement.children[0].play();
            }
            startBot();
            e.target.remove();
        };
        botElement.querySelector('[data-play]').style.display='block';
        checkBotUIOverlays(botElement);
    }

}

const getConsent = (botUI) => {
	const modalHtml = getContentAsHtml(modalTemplate);
	botElement.append(modalHtml);
	modal = modalHtml.querySelector('[data-fs-bot-modal]');
	const removeModalAndAllowPlay = () => {
		modal.remove();
		modal = null;
		addPlayButton(botUI);
	}
	modalHtml.querySelector('[data-fs-bot-consent-button]').onclick = () => {
		sendConsent(() => {
			removeModalAndAllowPlay();
		});
	}
	sendRequest(
		studioUrl + '/terms/' + termsId + '/consent',
		'GET',
		(response) => { // Found consent
			removeModalAndAllowPlay();
    	},
		accessToken,
		null,
		() => { // Not found consent
			sendRequest(studioUrl + '/terms/' + termsId,
				'GET',
				(response) => {
					const modalContentElement = modal.querySelector('[data-fs-bot-modal-consent]');
					const html = converter.makeHtml(response['text']);
					modalContentElement.innerHTML = html;
					checkBotUIOverlays(botElement);
        		},
				accessToken,
			);
    	},
	);
}

const sendConsent = (callback) => {
    sendRequest(studioUrl + '/terms/' + termsId + '/consent', 'POST', callback, accessToken);
}

const mobileCheck = () => {
	let check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
};

const changePlayIcon = (showPlayIcon, botUI) => {
	if (showPlayIcon) {
		botUI.setPlayIcon("icon--content--play");
	} else {
		botUI.setPlayIcon("icon--content--pause")
	}
}


