// 🧠 Memory Tool Definitions
const MEMORY_TOOLS = [
  {
    name: "save_memory",
    description: "Saves an important interaction to memory for future recall.",
    input_schema: {
      type: "object",
      properties: {
        summary: {
          type: "string",
          description: "Brief summary of what to remember",
        },
      },
      required: ["summary"],
    },
  },
  {
    name: "recall_memory",
    description: "Retrieves recent memories of past important interactions.",
    input_schema: { type: "object", properties: {} },
  },
];