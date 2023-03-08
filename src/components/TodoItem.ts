
import { TODO_STORAGE_KEY } from '../constants';
import { getItem, setItem } from '../core/BaseStorage';
import { addEvent } from '../core/Render';
import { todoListData } from '../types';
export default function TodoItem(props: todoListData[]) {
  addEvent('.todo-list', 'click', ({ target }: HTMLElement) => {
    if (target.className === 'destroy') {
      const data: todoListData['id'] = getItem(TODO_STORAGE_KEY.TODO_KEY).filter((data: todoListData) => data.id.indexOf(target.dataset.id));
      setItem(TODO_STORAGE_KEY.TODO_KEY, data);
    }
    if (target.className === 'toggle') {
      const data: todoListData = getItem(TODO_STORAGE_KEY.TODO_KEY).find((data: todoListData) => data.id === target.dataset.id);
      if (!data.completed) { data.completed = true } else data.completed = false;
      const newdata = getItem(TODO_STORAGE_KEY.TODO_KEY).map((obj: todoListData) => obj.id === data.id ? data : obj);
      setItem(TODO_STORAGE_KEY.TODO_KEY, newdata);
    }
  })
  return ` 
    ${props.map((data) => (`
    <li data-id="${data.id}" class="${data.completed ? 'completed' : data.completed}">
      <div class="view">
      <input type="checkbox" class="toggle" data-id="${data.id}" ${data.completed ? 'checked' : data.completed}>
      <label class="label">
      ${data.title}
      </label>
      <button class="destroy" data-id="${data.id}"></button>
      </div>
      </li>
    `)).join('')}
    `;
}