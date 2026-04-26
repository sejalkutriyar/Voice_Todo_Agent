# 🎙️ Voice-Based AI Agent with Memory & Tools

A powerful, voice-enabled AI assistant designed to manage a To-Do list and remember important user interactions. Built with the **Groq API (LLaMA 3.3 70B Versatile)**, this agent seamlessly decides when to converse naturally and when to trigger background tools for CRUD operations and memory management.

## 🌟 Key Features

### 1. 🗣️ Voice Interface
- **Speech-to-Text (STT):** Easily accept user commands via a microphone.
- **Text-to-Speech (TTS):** The agent replies conversationally out loud.
- Conversational, friendly, and natural voice interaction responses.

### 2. 🛠️ Tool-Based To-Do Management (CRUD)
Powered by native function-calling, the AI autonomously manages your tasks:
- **`add_todo`**: Adds a new item to your list.
- **`list_todos`**: Reads back your current pending tasks.
- **`update_todo`**: Modifies an existing task.
- **`delete_todo`**: Removes a completed or unwanted task.

### 3. 🧠 Smart Memory System
- **`save_memory`**: Automatically identifies and saves important or personal statements mentioned by the user (e.g., "I have an exam tomorrow").
- **`recall_memory`**: Retrieves past interactions to provide contextual and personalized responses.

### 4. 🤖 Intelligent Agent Behavior
- Evaluates the user's prompt in real-time to decide whether to execute a functional tool or to simply respond conversationally.
- Utilizes a robust tool-calling loop that handles multiple parallel actions flawlessly.
- Translates intents internally to ensure reliable English responses regardless of the input language (e.g., Hinglish).

---

## 🏗️ Project Structure

```text
Voice_Todo_Agent/
├── server.js                 # Node.js Express server acting as a proxy for the Groq API
├── README.md                 # Project documentation
├── index.html                # Main application UI
├── styles/
│   └── main.css              # Custom styling for the application
└── src/
    ├── agent/
    │   ├── agentCore.js      # Core logic for Groq API interactions and tool loops
    │   ├── systemPrompt.js   # AI persona, rules, and memory context
    │   └── toolHandler.js    # Routes tool executions to the correct functions
    ├── components/           # UI rendering components (Chat, Status, etc.)
    ├── memory/               # Logic for storing and retrieving past events
    ├── tools/                # JSON schemas for To-Do and Memory tools
    └── voice/                # Speech-to-Text and Text-to-Speech handling
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js installed on your machine.
- A valid [Groq API Key](https://console.groq.com/keys).

### Steps to Run Locally

1. **Clone the repository** (or download the source code):
   ```bash
   git clone <your-github-repo-link>
   cd Voice_Todo_Agent
   ```

2. **Install dependencies:**
   ```bash
   npm install express cors node-fetch
   ```

3. **Start the backend server:**
   ```bash
   node server.js
   ```

4. **Open the Application:**
   Open your browser and navigate to:
   👉 `http://localhost:3000`

5. **Provide your API Key:**
   When prompted by the UI (or in the source code if hardcoded), provide your Groq API Key to authenticate the AI requests.

---

## 🎥 Demonstration

A comprehensive demonstration video showcasing:
1. Live voice interaction.
2. Full Tool Usage (Adding, updating, listing, and deleting To-Dos).
3. Memory implementation (Saving a memory and recalling it later).
