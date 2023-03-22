import { STORAGE_KEY } from '../constants';
import { getItem, setItem } from '../core/BaseStorage';
import { addEvent } from '../core/Render';
import { todoListData } from '../types';
import { Selector, SelectorAll } from '../utills';


export default function TodoItem(props: todoListData[]) {

  addEvent('.todo-list', 'click', ({ target }: HTMLElement) => {

    if (target.className === 'destroy') {
      const data: todoListData['id'] = getItem(STORAGE_KEY.TODO_KEY).filter((data: todoListData) => data.id.indexOf(target.dataset.id));
      setItem(STORAGE_KEY.TODO_KEY, data);
    }

    if (target.className === 'toggle') {
      const data: todoListData = getItem(STORAGE_KEY.TODO_KEY).find((data: todoListData) => data.id === target.dataset.id);

      if (!data.completed) { data.completed = true } else data.completed = false;

      const newdata = getItem(STORAGE_KEY.TODO_KEY).map((obj: todoListData) => obj.id === data.id ? data : obj);
      setItem(STORAGE_KEY.TODO_KEY, newdata);
    }
  });
  addEvent('.todo-list', ('dblclick'), ({ target }: HTMLElement) => {
    if (target.tagName != 'LABEL') return;
    const targetLists = SelectorAll<HTMLElement>('.editing');
    if (targetLists.length >= 1) return alert('한번에 하나만 수정 할수있습니다');

    const targetClassList: HTMLElement = target.offsetParent;

    targetClassList.classList.add('editing');
  });

  addEvent('.todo-list', ('keyup'), (e: KeyboardEvent) => {

    const targetList = Selector<HTMLElement>('.editing');
    if (!targetList) return;

    const input = Selector<HTMLInputElement>(".editing > .edit");
    if (e.key === 'Escape') {
      return targetList.classList.remove('editing');
    }
    if (e.key !== "Enter" || !input) return;
    if (!input.value) return alert('내용을 입력해주세요');

    const data: todoListData = getItem(STORAGE_KEY.TODO_KEY).find((data: todoListData) => data.id === targetList.dataset.id);
    data.title = input.value;

    const updatedListData = getItem(STORAGE_KEY.TODO_KEY).map((List: todoListData) => List.id === data.id ? data : List);

    setItem(STORAGE_KEY.TODO_KEY, updatedListData);
  });
  return `
    ${props ? props.map((data) => (`
    <li data-id="${data.id}" class="${data.completed ? 'completed' : data.completed}">
      <div class="view">
        <input type="checkbox" class="toggle" data-id="${data.id}" ${data.completed ? 'checked' : data.completed}>
        <label class="label">${data.title}</label>
        <button class="destroy" data-id="${data.id}"></button>
      </div>
      <input class="edit" value="${data.title}"/>
    </li>
    `)).join('') : ''}
    `;
}