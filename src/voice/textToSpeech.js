// 🔊 Text To Speech
const TextToSpeech = {
  speak(text) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";
    utterance.rate = 0.95;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  },

  stop() {
    window.speechSynthesis.cancel();
  },

  isSpeaking() {
    return window.speechSynthesis.speaking;
  },
};