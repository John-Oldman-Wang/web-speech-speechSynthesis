
const synth = window.speechSynthesis;
window.s = synth;
const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance;


const Voices = Symbol('voices');
const Text = Symbol('text');
const cache = {

};

class Speech {
    constructor(text) {
        synth.cancel();
        if (typeof text !== 'string' && arguments.length > 0) {
            throw new Error('this first arguments must be string!')
        }
        this[Text] = text;
        this.init();
    }

    set text(text) {
        synth.cancel()
        this.init;
        this[Text] = text;
    }
    get text() {
        return this[Text]
    }
    init() {
        this.words = this.text.split(/,|，/g).filter(item => !!item);
    }
    play(text) {
        if (this.words.length == 0) {
            this.init()
        }
        const words = this.words
        words.concat(['']).forEach((word, index, arr) => {
            const voiceFragment = new SpeechSynthesisUtterance(word);
            voiceFragment.voice = this.voice;
            const self = this
            if (index != 0) {
                voiceFragment.onstart = function () {
                    self.words.shift()
                }
            }

            if (index == arr.length - 1) {
                voiceFragment.onend = function () {
                    self.words.shift()
                }
            }
            synth.speak(voiceFragment)
        })
        return this;
    }

    pause() {
        synth.speaking && synth.cancel();
        return this
    }
    on(type, cb) {
        synth.addEventListener(type, fn)
        return fn
    }
    getLang() {
        if (cache[Voices]) {
            return cache[Voices];
        }
        cache[Voices] = synth.getVoices();
        return cache[Voices];
    }
    setLang(voice) {
        if (voice){
            this.voice = voice
            return this
        }
        const voices = this.getLang()
        this.voice = voices[20]
        return this
    }
}

export default Speech;