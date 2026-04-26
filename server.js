const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("."));

// Fallback for config.js if it's not present (e.g. in production)
app.get("/config.js", (req, res) => {
  const fs = require("fs");
  if (!fs.existsSync("./config.js")) {
    res.type("application/javascript").send(`
      const CONFIG = {
        API_KEY: "", 
        MODEL: "llama-3.3-70b-versatile",
        MAX_TOKENS: 1024,
        APP_NAME: "Voice Todo Agent",
      };
    `);
  } else {
    res.sendFile("config.js", { root: __dirname });
  }
});
app.post("/api/chat", async (req, res) => {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY || req.body.apiKey}`,
      },
      body: JSON.stringify({
        model: req.body.payload.model,
        max_tokens: req.body.payload.max_tokens,
        messages: [
          { role: "system", content: req.body.payload.system },
          ...req.body.payload.messages,
        ],
        tools: req.body.payload.tools.map(t => ({
          type: "function",
          function: {
            name: t.name,
            description: t.description,
            parameters: t.input_schema,
          }
        })),
        tool_choice: "auto",
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      console.error("Groq API Error:", JSON.stringify(data, null, 2));
    }
    res.json(data);
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));