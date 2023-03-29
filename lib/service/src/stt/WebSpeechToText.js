export default class WebSpeechToText {
	constructor(features, cbx, bot, ttsLanguage="en") {
		this.features = features;
		this.cbx = cbx;
		this.ttsLanguage = ttsLanguage;
		this.bot = bot;
		console.log("Google STT is being used");
	}

	open = async () => {
		return this.features.getSpeechRecognition().then(SpeechRecognition => {
			const recognition = new SpeechRecognition();
			recognition.lang = this.ttsLanguage;
			recognition.interimResults = false;
			recognition.maxAlternatives = 1;

			recognition.onresult = event => {
				for (let i = 0; i < event.results.length; i++) {
					const results = event.results[i];

					const isFinal = results.isFinal;
					for (let y = 0; y < results.length && y < 1; y++) {
						// limit to one result - mobile chrome fix by zayda
						const result = results[y];
						this.cbx({
							type: 'Transcript',
							transcript: result.transcript,
							confidence: result.confidence,
							isFinal,
						});
					}
				}
			};
			recognition.onerror = function(event) {
				console.log(`WebSpeech error: ${event.error}`);
				this.bot.audioInputCallback();
			};
			recognition.onnomatch = function(event) {
				console.log(`No match received`);
				this.bot.audioInputCallback();
			};

			recognition.addEventListener("audioend", () => {
				console.log("Audio capturing ended");
				this.bot.audioInputCallback();
			  });

			this.recognition = recognition;
			return Promise.resolve();
		});
	};

	setLanguage = (language) => {
		if (this.recognition){
			this.ttsLanguage = language;
			this.recognition.lang = this.ttsLanguage;
			console.log("Recognition language changed to ", this.recognition.lang)
		}
	}

	start = async () => {
		this.recognition.start();
		this.cbx({ type: 'Event', eventType: 'InputAudioStreamOpen' });
		return Promise.resolve();
	};

	stop = async () => {
		this.recognition.stop();
		return Promise.resolve();
	};

	close = async () => {
		this.recognition = null;
		return Promise.resolve();
	};
}
