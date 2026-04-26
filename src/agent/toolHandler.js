// ⚙️ Tool Handler
function handleToolCall(toolName, toolInput) {
  console.log(`🔧 Tool called: ${toolName}`, toolInput);

  switch (toolName) {
    case "add_todo": {
      const item = TodoStore.add(toolInput.text);
      return { success: true, message: `Added: "${item.text}"`, todo: item };
    }

    case "list_todos": {
      const todos = TodoStore.getAll();
      if (todos.length === 0)
        return { todos: [], message: "List is empty." };
      return { todos, message: `You have ${todos.length} item(s).` };
    }

    case "update_todo": {
      const updated = TodoStore.update(toolInput.id, toolInput.new_text);
      if (!updated) return { success: false, message: "Todo not found." };
      return { success: true, message: `Updated to: "${updated.text}"`, todo: updated };
    }

    case "delete_todo": {
      const deleted = TodoStore.delete(toolInput.id);
      if (!deleted) return { success: false, message: "Todo not found." };
      return { success: true, message: `Deleted todo ID ${toolInput.id}` };
    }

    case "save_memory": {
      const mem = MemoryManager.saveInteraction(toolInput.summary);
      return { success: true, message: "Memory saved.", memory: mem };
    }

    case "recall_memory": {
      const memories = MemoryStore.getRecent(5);
      return { memories, message: `Found ${memories.length} memory entries.` };
    }

    default:
      return { error: `Unknown tool: ${toolName}` };
  }
}