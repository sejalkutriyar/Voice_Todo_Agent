// 📊 Status Bar Component
const StatusBar = {
  el: null,

  init() {
    this.el = document.getElementById("status");
  },

  set(msg) {
    if (this.el) this.el.textContent = msg;
  },

  listening() {
    this.set("🎤 Sun raha hoon...");
  },

  thinking() {
    this.set("🤔 Soch raha hoon...");
  },

  ready() {
    this.set("Press the mic to speak...");
  },

  error(msg) {
    this.set("❌ Error: " + msg);
  },
};