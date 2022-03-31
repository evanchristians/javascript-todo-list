import * as Todos from "./domain/todos.js";

const handleSubmit = evt => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  const formProps = Object.fromEntries(formData);

  if (!formProps.text) return;

  Todos.add({
    text: formProps.text,
  });

  evt.target.reset();
  render();
};

const handleRemove = id => evt => {
  evt.preventDefault();
  Todos.remove(id);
  render();
};

const handleUpdate = (id, values) => evt => {
  evt.preventDefault();
  Todos.update(id, values);
  render();
};

const actions = [
  {
    type: "update",
    method: handleUpdate,
    values: {pending: false, done: false},
    label: "todo",
  },
  {
    type: "update",
    method: handleUpdate,
    values: {pending: true, done: false},
    label: "pending",
  },
  {
    type: "update",
    method: handleUpdate,
    values: {pending: false, done: true},
    label: "done",
  },
  {type: "remove", method: handleRemove, label: "delete"},
];

const render = () => {
  const list = document.getElementById("todo-list");

  list.innerHTML = "";

  Todos.get().forEach(todo => {
    const todoListItem = document.createElement("li");
    todoListItem.className = todo.done
      ? "done"
      : todo.pending
      ? "pending"
      : "todo";
    todoListItem.innerText = todo.text;

    actions.forEach(action => {
      const button = document.createElement("button");
      button.addEventListener("click", action.method(todo.id, action.values));
      button.innerText = action.label;

      todoListItem.appendChild(button);
    });

    list.appendChild(todoListItem);
  });
};

window.addEventListener("load", () => {
  const form = document.getElementById("todo-form");

  form.addEventListener("submit", handleSubmit);

  render();
});
