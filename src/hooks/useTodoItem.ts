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

  const editingTodoData = (dataId: string , newData : string) => {
    const data = todoList.find((data: todoListData) => data.id === dataId) || null;
    if(!data) return false;
    data.title = newData;
    const updatedListData = todoList.map((List: todoListData) => List.id === data.id ? data : List);
    setItem(updatedListData);
    return true;
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