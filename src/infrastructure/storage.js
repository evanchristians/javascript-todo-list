export const append = (storageKey, value) => {
  const arr = JSON.parse(localStorage.getItem(storageKey));
  const appended = JSON.stringify([...arr, value]);

  localStorage.setItem(storageKey, appended);
};

export const remove = (storageKey, id) => {
  const arr = JSON.parse(localStorage.getItem(storageKey));
  const removed = JSON.stringify(arr.filter(x => x.id != id));

  localStorage.setItem(storageKey, removed);
};

export const set = (storageKey, value) => {
  localStorage.setItem(storageKey, JSON.stringify(value));
};

export const get = storageKey => JSON.parse(localStorage.getItem(storageKey));
