// 🧠 Memory Store
const MemoryStore = {
  _key: "voice_agent_memory",

  getAll() {
    const data = localStorage.getItem(this._key);
    return data ? JSON.parse(data) : [];
  },

  save(memories) {
    localStorage.setItem(this._key, JSON.stringify(memories));
  },

  add(summary) {
    const memories = this.getAll();
    const entry = {
      id: Date.now(),
      summary,
      timestamp: new Date().toLocaleString("en-IN"),
    };
    memories.push(entry);
    if (memories.length > 20) memories.shift();
    this.save(memories);
    return entry;
  },

  getRecent(n = 5) {
    const all = this.getAll();
    return all.slice(-n);
  },

  clear() {
    localStorage.removeItem(this._key);
  },
};