import { _render } from "./Render"

interface stroage {
  key: string,
  stroage: Storage,
}

function BaseStorage() {
  const getItem = (key: stroage['key']) => {
    const item = localStorage.getItem(key);
    if (!item) return []
    return JSON.parse(item);
  }

  const setItem = <T>(key: stroage['key'], item: T) => {
    const data = JSON.stringify(item);
    localStorage.setItem(key, data);
    _render();
  }
  return {
    getItem,
    setItem
  }
}
export const { getItem, setItem } = BaseStorage();