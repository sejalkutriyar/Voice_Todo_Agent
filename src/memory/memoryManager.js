// 🧩 Memory Manager
const MemoryManager = {
  getContextString() {
    const memories = MemoryStore.getRecent(5);
    if (memories.length === 0) return "No memory yet.";
    return memories
      .map((m) => `- [${m.timestamp}] ${m.summary}`)
      .join("\n");
  },

  saveInteraction(summary) {
    return MemoryStore.add(summary);
  },
};