import { STORAGE_KEY } from '../constants';
import { _render } from "./Render"

function BaseStorage() {

  const getItem = (key: string) => {
    if (!key) return [];
    const item = localStorage.getItem(key);
    if (!item) return [];
    return JSON.parse(item);
  }

  const setItem = <T>(key: string, item: T) => {
    const data = JSON.stringify(item);
    if (!key) return;
    localStorage.setItem(key, data);
    _render();
  }

  const getTodoItem = () => {
    return getItem(STORAGE_KEY.TODO_KEY);
  }

  const setTodoItem = <T>(item: T) => {
    setItem(STORAGE_KEY.TODO_KEY, item);
  }

  return {
    getItem,
    setItem,
    getTodoItem,
    setTodoItem,
  }
}

export const { getItem, setItem, getTodoItem, setTodoItem } = BaseStorage();