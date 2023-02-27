import { countcontainer } from './container/countcontainer';
import { component } from './core/component';

export class App extends component {

  setEvent() {
    document.querySelector(".new-todo")?.addEventListener('keyup', (event) => {
      let storageData = JSON.parse(localStorage.getItem('todos'));
      if (event.keyCode !== 13 || !event.target.value) return;
      const insertdata: object = {
        title: event.target?.value,
        completed: false
      }
      if (storageData !== null) storageData.push(insertdata);
      if (storageData === null) storageData = [insertdata];
      localStorage.setItem("todos", JSON.stringify(storageData));
      this.onMounted();
      event.target.value = ''
    })
  }
  template() {
    return `
    <div class="todoapp">
    <h1>TODOS</h1>
    <input class="new-todo" placeholder="할일을 추가해주세요" autofocus>
    <main>
    <ul id="todo-list" class="todo-list">
    <ul>
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
    new countcontainer({ element: document.querySelector('#todo-list') as HTMLElement });
  }
}