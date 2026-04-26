// 💬 Chat Display Component
const ChatDisplay = {
  container: null,

  init() {
    this.container = document.getElementById("chat-display");
  },

  addMessage(text, role = "agent") {
    const div = document.createElement("div");
    div.className = `msg ${role}`;
    div.textContent = text;
    this.container.appendChild(div);
    this.container.scrollTop = this.container.scrollHeight;
  },

  clear() {
    this.container.innerHTML = "";
  },
};