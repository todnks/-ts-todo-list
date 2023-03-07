
import { TODO_STORAGE_KEY } from '../constants';
import { getItem, setItem } from '../core/BaseStorage';
import { addEvent } from '../core/Render';
import { todoListData } from '../types';
export default function TodoItem(props: todoListData[]) {
  addEvent('.todo-list', 'click', ({ target }: HTMLElement) => {
    if (target.tagName === 'BUTTON') {
      const data: todoListData['id'] = getItem(TODO_STORAGE_KEY.TODO_KEY).filter((data: todoListData) => data.id.indexOf(target.dataset.id));
      setItem(TODO_STORAGE_KEY.TODO_KEY, data);
    }
  })
  return `
    ${props.map((data) => (`
    <li data-id="${data.id}" class="false">
      <div class="view">
      <input type="checkbox" class="toggle" data-id="${data.id}">
      <label class="label">
      ${data.title}
      </label>
      <button class="destroy" data-id="${data.id}"></button>
      </div>
      </li>
    `)).join('')}
    `;
}