import { addEvent, _render } from '../core/Render';
import { deleteTodoData, checkTodoData, editingBox, editingTodoData } from '../hooks/useTodoItem';
import { todoListData } from '../types';
import Input from './Input';

export default function TodoItem(todoItem: todoListData[]) {

  addEvent('.todo-list', 'click', ({ target }: HTMLElement) => {
    if (target.className === 'destroy') {
      deleteTodoData(target.dataset.id);
    }
    if (target.className === 'toggle') {
      checkTodoData(target.dataset.id);
    }
  });

  addEvent('.todo-list', ('dblclick'), ({ target }: HTMLElement) => {
    editingBox(target, target.offsetParent);
  });

  addEvent('.todo-list', ('keyup'), (keyboard: KeyboardEvent) => {
    editingTodoData(keyboard.key);
  });

  return `
    ${todoItem ? todoItem.map((todoData) => (`
    <li data-id="${todoData.id}" class="${todoData.completed ? 'completed' : todoData.completed}">
      <div class="view">
      ${Input({
    type: 'checkbox',
    className: 'toggle',
    data: `${todoData.id}`,
    checked: `${todoData.completed ? 'checked' : todoData.completed}`,
  })}
        <label class="label">${todoData.title}</label>
        <button class="destroy" data-id="${todoData.id}"></button>
      </div>
      ${Input({ type: 'text', className: 'edit', value: `${todoData.title}` })}
    </li>
    `)).join('') : ''}
    `;
}