// 📋 Todo List Component
const TodoList = {
  container: null,

  init() {
    this.container = document.getElementById("todo-list");
  },

  render() {
    const todos = TodoStore.getAll();
    if (todos.length === 0) {
      this.container.innerHTML =
        '<li style="color:#64748b">Koi task nahi abhi...</li>';
      return;
    }
    this.container.innerHTML = todos
      .map(
        (t) => `
      <li class="${t.done ? "done" : ""}">
        <span>
          <span class="todo-id">#${t.id}</span>
          ${t.text}
        </span>
        <span style="color:#64748b; font-size:0.75rem">
          ${t.createdAt}
        </span>
      </li>`
      )
      .join("");
  },
};