import { _render } from "./Render"

export default function BaseStorage<T>(key: string, storage: Storage = localStorage)  {

  const getItem = () => {
    const item = storage.getItem(key);
    if (!item) return [];
    return JSON.parse(item);
  }

  const setItem = (item: T) => {
    const data = JSON.stringify(item);
    storage.setItem(key, data);
    _render();
  }
  return {
    getItem,
    setItem,
  }
}