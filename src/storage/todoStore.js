// 🗂️ Todo CRUD Operations
const TodoStore = {
  _key: "voice_agent_todos",

  getAll() {
    const data = localStorage.getItem(this._key);
    return data ? JSON.parse(data) : [];
  },

  save(todos) {
    localStorage.setItem(this._key, JSON.stringify(todos));
  },

  add(text) {
    const todos = this.getAll();
    const newTodo = {
      id: Date.now(),
      text,
      done: false,
      createdAt: new Date().toLocaleString("en-IN"),
    };
    todos.push(newTodo);
    this.save(todos);
    return newTodo;
  },

  update(id, newText) {
    const todos = this.getAll();
    const idx = todos.findIndex((t) => t.id === Number(id));
    if (idx === -1) return null;
    todos[idx].text = newText;
    this.save(todos);
    return todos[idx];
  },

  delete(id) {
    const todos = this.getAll();
    const idx = todos.findIndex((t) => t.id === Number(id));
    if (idx === -1) return false;
    todos.splice(idx, 1);
    this.save(todos);
    return true;
  },

  markDone(id) {
    const todos = this.getAll();
    const idx = todos.findIndex((t) => t.id === Number(id));
    if (idx === -1) return null;
    todos[idx].done = true;
    this.save(todos);
    return todos[idx];
  },
};