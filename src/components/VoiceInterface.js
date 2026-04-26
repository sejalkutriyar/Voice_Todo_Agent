// 🎤 Voice Interface Component
const VoiceInterface = {
  micBtn: null,
  statusEl: null,

  init() {
    this.micBtn = document.getElementById("mic-btn");
    this.statusEl = document.getElementById("status");

    this.micBtn.addEventListener("click", async () => {
      if (SpeechToText.isListening) {
        SpeechToText.stop();
        this.setStatus("Press the mic to speak...");
        this.micBtn.classList.remove("listening");
        return;
      }

      this.micBtn.classList.add("listening");
      this.setStatus("🎤 Sun raha hoon...");

      try {
        const text = await SpeechToText.listen();
        this.micBtn.classList.remove("listening");
        this.setStatus("🤔 Soch raha hoon...");
        await processUserInput(text);
        this.setStatus("Press the mic to speak...");
      } catch (err) {
        this.micBtn.classList.remove("listening");
        this.setStatus("❌ Error: " + err);
      }
    });
  },

  setStatus(msg) {
    if (this.statusEl) this.statusEl.textContent = msg;
  },
};