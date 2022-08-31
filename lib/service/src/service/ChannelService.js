import { CrossBrowserStt } from '../stt';

const dateTimeFormat = Intl.DateTimeFormat;

export default class ChannelService {
	constructor(
		features,
		wsUrl,
		callback,
		errorCallback,
		key,
		language = 'cs-CZ',
		deviceId,
		bot,
		token,
		ttsFileType
	) {
		this.features = features;
		this.wsUrl = wsUrl;
		this.key = key;
		this.callback = callback;
		this.errorCallback = errorCallback;
		this.language = language;
		this.muted = false;
		this.deviceId = deviceId;
		this.bot = bot;
		this.token = token;
		this.ttsFileType = ttsFileType;

		// TODO move elsewhere
		this.voices = {
			George: 'en',
			Grace: 'en',
			Gordon: 'en',
			Gwyneth: 'en',
			Gabriela: 'cs',
			Anthony: 'en',
			Audrey: 'en',
			Arthur: 'en',
			Amy: 'en',
			Michael: 'en',
			Mary: 'en',
			Milan: 'cs',
			Victor: 'en',
			Victoria: 'en',
		};
	}

	onSttCallback = ({ type, transcript, isFinal, eventType }) => {
		if (type === 'Transcript') {
			// TODO unify
			if (isFinal) {
				this.sendText(transcript);
				this.callback({ type: 'Recognized', message: { items: [{ text: transcript }] } });
			}
		} else if (type === 'Event') {
			this.callback({ type: eventType });
		}
	};

	open = async () => {
		this.webSocket = new WebSocket(this.wsUrl);

		this.stt = new CrossBrowserStt(
			this.features,
			this.webSocket,
			this.onSttCallback,
			this.sendAudioOpen,
			this.sendAudioClose
		);

		const voice = this.bot.botCallback.getVoice();
		const locale = voice === undefined ? this.language : this.voices[voice];
		this.stt
			.detectEngine()
			.then(e => {
				console.log('detected engine', e);
				return this.stt.selectEngine(e);
			})
			.then(() => {
				this.stt.selectLanguage(locale);
				this.stt.open();
			});

		// listen to onmessage event
		this.webSocket.onmessage = e => {
			if (e.data instanceof ArrayBuffer) {
				this.replay(e.data);
			} else if (e.data instanceof Blob) {
				new Response(e.data).arrayBuffer().then(this.replay);
			} else if (typeof e.data === 'string') {
				const data = JSON.parse(e.data);

				this.stt.event(data);
				this.callback(data);
			}
		};

		this.webSocket.onerror = e => {
			this.errorCallback({ type: 'Client', message: `Socket error:  ${e}` });
		};

		this.webSocket.onclose = e => {
            console.log('Reason for websocket closing: ', e.reason);
        };

		return new Promise(resolve => {
			this.webSocket.onopen = () => {
                this.sendPing(this);
				this.webSocket.send(
					JSON.stringify({
						type: 'Init',
						key: this.key,
						appKey: this.key,
						deviceId: this.deviceId,
						sender: this.deviceId,
						token: this.token,
						config: {
							tts: 'RequiredLinks',
							sttSampleRate: 44100,
							ttsFileType: this.ttsFileType,
							locale,
							zoneId: dateTimeFormat().resolvedOptions().timeZone,
							voice,
							sendResponseItems: true,
							sttInterimResults: true,
						},
					})
				);
				resolve();
			};
		});
	};

	sendPing = (service) => {
	    window.setTimeout(
	        function() {
	            if (service.webSocket && service.sessionId !== null) {
	                service.webSocket.send(new Int16Array());
	                service.sendPing(service);
	            }
            },
	        10000);
	}

	getStt = () => {
		return this.stt;
	};

	close = async () => {
		await this.stt.close();
		if (this.webSocket) {
			this.webSocket.close();
			this.webSocket = null;
		}
		return Promise.resolve();
	};

	sendText = async text => {
		const input = {
            zoneId: dateTimeFormat().resolvedOptions().timeZone,
            locale: this.language,
            attributes: this.bot.botCallback.getAttributes(),
            transcript: {
                text
            }
        };
		if (this.webSocket) {
			if (this.webSocket.readyState === 1) {
				this.webSocket.send(JSON.stringify({ type: 'Input', input }));
				return Promise.resolve();
			} else {
				return Promise.reject('Incorrect websocket state');
			}
		}
	};

	sendLogs = (entries) => {
	    if (this.webSocket) {
            this.webSocket.send(JSON.stringify({ type: 'Log', entries }));
	    }
	}

	sendAudioOpen = () => {
		if (this.webSocket && this.sessionId) {
			this.webSocket.send(
				JSON.stringify({
					type: 'InputAudioStreamOpen',
					message: {
						appKey: this.key,
						deviceId: this.deviceId,
						sender: this.deviceId,
						token: this.token,
						sessionId: this.sessionId,
					},
					appKey: this.key,
				})
			);
		}
	};

	sendAudioClose = () => {
		if (this.webSocket) {
			this.webSocket.send(
				JSON.stringify({
					type: 'InputAudioStreamClose',
					appKey: this.key,
				})
			);
		}
	};

	replay = async arrayBuffer => {
		return this.features.getAudioContext().then(AudioContext => {
			const audioContext = new AudioContext();

			return audioContext.decodeAudioData(arrayBuffer).then(audioBuffer => {
				const source = audioContext.createBufferSource();
				source.buffer = audioBuffer;
				source.connect(audioContext.destination);

				source.onended = () => {
					audioContext.close();
				};

				source.start(0);
			});
		});
	};

	setSessionId = sessionId => {
		this.sessionId = sessionId;
	};
}
