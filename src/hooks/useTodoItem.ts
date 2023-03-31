import BaseStorage from '../core/BaseStorage';
import { todoListData } from '../types';
import { SelectorAll, Selector } from '../utills';

export default function useTodoItem() {
  const {getItem, setItem} = BaseStorage('todos');
  const todoList : todoListData[] = getItem();
  const newTodoData = (data: todoListData) => {
    todoList.push(data);
    setItem(todoList);
  }

  const deleteTodoData = (datasetId: string) => {
    const data = todoList.filter((data: todoListData) => data.id.indexOf(datasetId));
    setItem(data);
  }

  const checkTodoData = (datasetId: string) => {

    const data = todoList.find((data: todoListData) => data.id === datasetId) || null;
    if(!data) return;
    if (!data.completed) { data.completed = true } else data.completed = false;

    const newdata = todoList.map((obj: todoListData) => obj.id === data.id ? data : obj);
    setItem(newdata);
  }

  const editingBox = (target: HTMLElement, targetClassList: HTMLElement) => {

    if (target.tagName != 'LABEL') return;
    const targetLists = SelectorAll<HTMLElement>('.editing');
    if (targetLists.length >= 1) return alert('한번에 하나만 수정 할수있습니다');
    targetClassList.classList.add('editing');
  }

  const editingTodoData = (keyboard: string) => {

    const targetList = Selector<HTMLElement>('.editing');
    const input = Selector<HTMLInputElement>(".editing > .edit");

    if (!targetList || !input) return;

    if (keyboard === 'Escape') {
      return targetList.classList.remove('editing');
    }

    if (keyboard === "Enter") {
      if (!input.value) return alert('내용을 입력해주세요');
      const data = todoList.find((data: todoListData) => data.id === targetList.dataset.id) || null;
      if(!data) return;
      data.title = input.value;
      const updatedListData = todoList.map((List: todoListData) => List.id === data.id ? data : List);
      setItem(updatedListData);
    }
  }
  const listSetup = (href: string) => {
    window.location.hash = href.replace('#', '');
  }

  return {
    newTodoData,
    deleteTodoData,
    checkTodoData,
    editingBox,
    editingTodoData,
    listSetup
  }
}
export const { newTodoData, deleteTodoData, checkTodoData, editingBox, editingTodoData, listSetup } = useTodoItem();