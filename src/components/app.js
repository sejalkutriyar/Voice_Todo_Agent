// 🎮 Main App Controller
async function processUserInput(text) {
  if (!text.trim()) return;

  ChatDisplay.addMessage(text, "user");
  StatusBar.thinking();

  const reply = await AgentCore.chat(text);

  ChatDisplay.addMessage(reply, "agent");
  TextToSpeech.speak(reply);
  StatusBar.ready();

  TodoList.render();
  renderMemory();
}

function renderMemory() {
  const list = document.getElementById("memory-list");
  const mems = MemoryStore.getRecent(5);
  if (mems.length === 0) {
    list.innerHTML = "<li>Koi memory save nahi abhi...</li>";
    return;
  }
  list.innerHTML = mems
    .map((m) => `<li><strong>${m.timestamp}</strong>: ${m.summary}</li>`)
    .join("");
}

// Global render function for agentCore
function renderTodos() {
  TodoList.render();
}

// Text input handler
document.getElementById("send-btn").addEventListener("click", () => {
  const input = document.getElementById("text-input");
  processUserInput(input.value);
  input.value = "";
});

document.getElementById("text-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const input = document.getElementById("text-input");
    processUserInput(input.value);
    input.value = "";
  }
});

// App initialize karo
SpeechToText.init();
StatusBar.init();
ChatDisplay.init();
TodoList.init();
VoiceInterface.init();
TodoList.render();
renderMemory();