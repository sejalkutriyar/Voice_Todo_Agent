// 🛠️ Todo Tool Definitions
const TODO_TOOLS = [
  {
    name: "add_todo",
    description: "Adds a new item to the user's To-Do list.",
    input_schema: {
      type: "object",
      properties: {
        text: { type: "string", description: "The to-do item text" },
      },
      required: ["text"],
    },
  },
  {
    name: "list_todos",
    description: "Returns all current To-Do items.",
    input_schema: { type: "object", properties: {} },
  },
  {
    name: "update_todo",
    description: "Updates an existing To-Do item by its ID.",
    input_schema: {
      type: "object",
      properties: {
        id: { type: "number", description: "ID of the todo to update" },
        new_text: { type: "string", description: "Updated text" },
      },
      required: ["id", "new_text"],
    },
  },
  {
    name: "delete_todo",
    description: "Deletes a To-Do item by its ID.",
    input_schema: {
      type: "object",
      properties: {
        id: { type: "number", description: "ID of the todo to delete" },
      },
      required: ["id"],
    },
  },
];