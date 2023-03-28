import { setTodoItem, getTodoItem } from '../core/BaseStorage';
import { todoListData } from '../types';
import { SelectorAll, Selector } from '../utills';

export default function useTodoItem() {

  const newTodoData = (keyboard: string) => {
    const data = getTodoItem();
    const input = Selector<HTMLInputElement>(".new-todo");

    if (keyboard !== "Enter" || !input || !input.value) return;

    const insertData: todoListData = {
      id: new Date().getTime().toString(),
      title: input.value,
      completed: false
    }
    data.push(insertData);
    setTodoItem(data);
    input.value = '';
  }

  const deleteTodoData = (datasetId: string) => {
    const data: todoListData['id'] = getTodoItem().filter((data: todoListData) => data.id.indexOf(datasetId));
    setTodoItem(data);
  }

  const checkTodoData = (datasetId: string) => {

    const data: todoListData = getTodoItem().find((data: todoListData) => data.id === datasetId);

    if (!data.completed) { data.completed = true } else data.completed = false;

    const newdata = getTodoItem().map((obj: todoListData) => obj.id === data.id ? data : obj);
    setTodoItem(newdata);
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
      const data: todoListData = getTodoItem().find((data: todoListData) => data.id === targetList.dataset.id);
      data.title = input.value;
      const updatedListData = getTodoItem().map((List: todoListData) => List.id === data.id ? data : List);
      setTodoItem(updatedListData);
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