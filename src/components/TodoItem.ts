import { addEvent, _render } from '../core/Render';
import { deleteTodoData, checkTodoData, editingTodoData } from '../hooks/useTodoItem';
import { todoListData } from '../types';
import { Selector, SelectorAll } from '../utills';
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
    if(target.tagName != 'LABEL') return;
    const editing : HTMLElement[] = SelectorAll<HTMLElement>('.editing');
    if(editing.length >= 1){
      return alert('한번에 한개씩만 입력해주세요');
    };
    return target.offsetParent.classList.add('editing');
  });

  addEvent('.todo-list', ('keyup'), (keyboard: KeyboardEvent & { target : HTMLInputElement } ) => {
    const {target} = keyboard;
    const targetList = Selector<HTMLElement>('.editing');
    if(!targetList || !targetList.dataset.id) return alert('잘못된접근입니다');
    if(keyboard.key === "Enter"){
      if(!editingTodoData(targetList.dataset.id,target.value)){
        return alert('존재하지않는글입니다');
      }
      alert('글수정완료');
    }
    if (keyboard.key === 'Escape') {
      return targetList.classList.remove('editing');
    }
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