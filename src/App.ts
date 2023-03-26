import { Title, TodoItem, Input, LinkButton } from './components';
import { _render } from './core/Render';
import { getListData } from './hooks/useListData';
export default function App() {
  const ListData = getListData();
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
    ${TodoItem(ListData)}
    </ul>
    <div class="count-container">
      <span class="todo-count">총${ListData.length}개</span>
      <ul class="filters">
        <li>
        ${LinkButton({ href: "/", id: "all", value: "전체보기" })}
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