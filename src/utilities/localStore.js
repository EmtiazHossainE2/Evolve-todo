//store to db
const storeToDb = store => {
  localStorage.setItem('todos', JSON.stringify(store));
}

const getStoredTodo = () => {
  let todos = {};
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
  }
  return todos;
}

export {
  storeToDb,
  getStoredTodo,
}