import { TODO_STORAGE_KEY } from './constants';
import { getItem, setItem } from './core/BaseStorage';
import { todoListData } from './types/index';
import { Title, TodoItem, Input, LinkButton } from './components';
import { Selector } from "./utills";
import { addEvent } from './core/Render';
export default function App() {

  let storageData: todoListData[] = getItem(TODO_STORAGE_KEY.TODO_KEY);

  addEvent(".new-todo", 'keypress', (e: KeyboardEvent) => {
    const input = Selector<HTMLInputElement>(".new-todo");
    if (e.key !== "Enter" || !input || !input.value) return;
    const insertData: todoListData = {
      id: new Date().getTime().toString(),
      title: input.value,
      completed: false
    }
    const newTodoList = storageData;
    newTodoList.push(insertData);
    setItem(TODO_STORAGE_KEY.TODO_KEY, newTodoList);
    input.value = '';
  });
  return `
    <div class="todoapp">
    ${Title('TODOS')}
    ${Input({
    type: 'text',
    className: 'new-todo',
    placeholder: '할일을 추가해주세요',
    autofoucs: true
  })}
    <main>
    <ul id="todo-list" class="todo-list">
    ${TodoItem(storageData)}
    </ul>
    <div class="count-container">
      <span class="todo-count">총${storageData.length}개</span>
      <ul class="filters">
        <li>
        ${LinkButton({ href: "/#", id: "all", value: "전체보기" })}
        </li>
        <li>
        ${LinkButton({ href: "/#active", id: "active", value: "해야할 일" })}
        </li>
        <li>
        ${LinkButton({ href: "/#completed", id: "completed", value: "완료한 일" })}
        </li>
      </ul>
    </div>
    </main>
    </div>`;
}