// 🧠 Agent Core
const AgentCore = {
  conversationHistory: [],

  async chat(userMessage) {
    this.conversationHistory.push({ 
      role: "user", 
      content: userMessage 
    });

    const allTools = [...TODO_TOOLS, ...MEMORY_TOOLS];

    try {
      let response = await this._callClaude(allTools);

      // Tool use loop
      while (response.stop_reason === "tool_use") {
        const toolUseBlocks = response.content.filter(
          (b) => b.type === "tool_use"
        );
        if (toolUseBlocks.length === 0) break;

        // History update karo - Groq format mein
        this.conversationHistory.push({ 
          role: "assistant", 
          content: response.rawMessage.content || "",
          tool_calls: response.rawMessage.tool_calls,
        });

        for (const toolUseBlock of toolUseBlocks) {
          // Tool execute karo
          const toolResult = handleToolCall(
            toolUseBlock.name,
            toolUseBlock.input
          );

          // UI refresh karo
          if (["add_todo", "update_todo", "delete_todo", "list_todos"]
              .includes(toolUseBlock.name)) {
            if (typeof renderTodos === "function") renderTodos();
          }
          if (["save_memory", "recall_memory"]
              .includes(toolUseBlock.name)) {
            if (typeof renderMemory === "function") renderMemory();
          }

          this.conversationHistory.push({
            role: "tool",
            tool_call_id: toolUseBlock.id,
            name: toolUseBlock.name,
            content: JSON.stringify(toolResult),
          });
        }

        // Wapas call karo
        response = await this._callClaude(allTools);
      }

      // Final response
      const finalText =
        response.content.find((b) => b.type === "text")?.text || "Done!";
      
      this.conversationHistory.push({ 
        role: "assistant", 
        content: finalText,
      });

      return finalText;
    } catch (err) {
      console.error("Agent error:", err);
      return "Sorry, kuch problem ho gayi. Please try again.";
    }
  },

  async _callClaude(tools) {
    const res = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey: CONFIG.API_KEY,
        payload: {
          model: CONFIG.MODEL,
          max_tokens: CONFIG.MAX_TOKENS,
          system: getSystemPrompt(),
          tools,
          messages: this.conversationHistory,
        }
      }),
    });

    if (!res.ok) throw new Error(`API error: ${res.status}`);

    const data = await res.json();
    console.log("API Response:", JSON.stringify(data, null, 2));

    if (data.error) throw new Error(data.error.message || "API Error");

    // Groq response ko convert karo
    const choice = data.choices?.[0];
    const message = choice?.message;

    const content = [];

    if (message) {
      let responseText = message.content || "";
      let extractedToolCalls = [];

      // Fallback: parse <function=name>{"arg":"val"}</function>
      const functionRegex = /<function=(\w+)>([\s\S]*?)<\/function>/g;
      let match;
      while ((match = functionRegex.exec(responseText)) !== null) {
        const funcName = match[1];
        let funcArgs = {};
        try {
          funcArgs = match[2].trim() ? JSON.parse(match[2]) : {};
        } catch (e) {
          console.error("Failed to parse function args", match[2]);
        }
        
        const tcId = "call_" + Math.random().toString(36).substr(2, 9);
        extractedToolCalls.push({
          type: "tool_use",
          id: tcId,
          name: funcName,
          input: funcArgs
        });

        // Add to message.tool_calls so it gets saved in history correctly
        if (!message.tool_calls) message.tool_calls = [];
        message.tool_calls.push({
          id: tcId,
          type: "function",
          function: {
            name: funcName,
            arguments: JSON.stringify(funcArgs)
          }
        });
      }

      // Remove the raw function tags from the text
      responseText = responseText.replace(/<function=\w+>[\s\S]*?<\/function>/g, "").trim();
      message.content = responseText;

      if (responseText) {
        content.push({ type: "text", text: responseText });
      }

      if (message.tool_calls) {
        for (const tc of message.tool_calls) {
          // Only add if not already added via fallback
          if (!content.some(c => c.id === tc.id)) {
             content.push({
               type: "tool_use",
               id: tc.id,
               name: tc.function.name,
               input: tc.function.arguments ? JSON.parse(tc.function.arguments) : {},
             });
          }
        }
      }
    }

    return {
      stop_reason: message?.tool_calls?.length ? "tool_use" : "end_turn",
      content,
      rawMessage: message,
    };
  },

  clearHistory() {
    this.conversationHistory = [];
  },
};