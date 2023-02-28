import { listContainer } from './container/listContainer';
import { component } from './core/component';
import { keys } from "./constants"
interface todoListData {
  id: number,
  title: string,
  completed: boolean
}
export class App extends component {

  setEvent() {
    const input: HTMLInputElement = document.querySelector('.new-todo')!;
    input?.addEventListener('keypress', (event: KeyboardEvent) => {

      let storageData: todoListData[] = JSON.parse(localStorage.getItem(keys.key)!);

      if (event.key !== "Enter" || !input.value) return;

      const insertData: todoListData = {
        id: new Date().getTime(),
        title: input.value,
        completed: false
      }

      if (storageData !== null) storageData.push(insertData);
      if (storageData === null) storageData = [insertData];

      localStorage.setItem(keys.key, JSON.stringify(storageData));
      this.onMounted();
      input.value = ''
    })
  }
  template() {
    return `
    <div class="todoapp">
    <h1>TODOS</h1>
    <input class="new-todo" placeholder="할일을 추가해주세요" autofocus>
    <main>
    <ul id="todo-list" class="todo-list">
    </ul>
    <div class="count-container">
      <span class="todo-count">총0개</span>
      <ul class="filters">
        <li>
          <a id="all" href="/#">전체보기</a>
        </li>
        <li>
          <a id="active" href="/#active">해야할 일</a>
        </li>
        <li>
          <a id="completed" href="/#completed">완료한 일</a>
        </li>
      </ul>
    </div>
    </main>
    </div>`;
  }
  onMounted() {
    new listContainer(document.querySelector('#todo-list')!);
  }
}