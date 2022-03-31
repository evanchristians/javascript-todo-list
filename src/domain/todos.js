import * as Storage from "../infrastructure/storage.js";

const TODOS = "todos";

export const initialize = () => {
  const todos = Storage.get(TODOS);

  if (!todos) Storage.set(TODOS, []);
};

export const get = () => {
  initialize();

  return Storage.get(TODOS);
};

export const getOne = id => {
  initialize();

  const todo = Storage.get(TODOS).find(t => t.id == id);

  if (!todo) throw new Error(`Error: Todo (${id}) Not Found!`);

  return todo;
};

export const add = todo => {
  initialize();

  Storage.append(TODOS, {
    id: Date.now(),
    ...todo,
  });
};

export const update = (id, values, merge = true) => {
  const todo = getOne(id);

  const updated = merge
    ? {...todo, ...values, id}
    : {
        ...values,
        id,
      };

  const todos = get().map(t => (t.id == id ? updated : t));

  Storage.set(TODOS, todos);
};

export const remove = id => {
  const todos = Storage.get(TODOS);

  if (!todos) return;

  Storage.remove(TODOS, id);
};
