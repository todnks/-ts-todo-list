export function Selector<T extends Element>(target: string): T | null {
  return document.querySelector(target);
}

export function SelectorAll<T extends Element>(target: string): T[] {
  const targets = document.querySelectorAll(target);
  if (!targets) return [];
  return [...targets] as T[];
}