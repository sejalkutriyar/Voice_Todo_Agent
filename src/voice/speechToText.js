// 🎤 Speech To Text
const SpeechToText = {
  recognition: null,
  isListening: false,

  init() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Browser speech recognition not supported. Use Chrome!");
      return false;
    }
    this.recognition = new SpeechRecognition();
    this.recognition.lang = "en-US";
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;
    return true;
  },

  listen() {
    return new Promise((resolve, reject) => {
      if (!this.recognition && !this.init()) {
        return reject("Not supported");
      }
      this.isListening = true;
      this.recognition.start();

      this.recognition.onresult = (e) => {
        const text = e.results[0][0].transcript;
        this.isListening = false;
        resolve(text);
      };

      this.recognition.onerror = (e) => {
        this.isListening = false;
        reject(e.error);
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };
    });
  },

  stop() {
    if (this.recognition) this.recognition.stop();
    this.isListening = false;
  },
};