import { countcontainer } from './container/countcontainer';
import { component } from './core/component';

export class App extends component {

  setEvent() {
    document.querySelector(".new-todo")?.addEventListener('keyup', (event) => {
      const storageData = JSON.parse(localStorage.getItem('todos'));
      if (event.keyCode !== 13 || !event.target.value) return;
      let insertdata: object = {
        title: event.target.value,
        completed: false
      }
      if (storageData !== null) {
        storageData.push(insertdata);
        localStorage.setItem("todos", JSON.stringify(storageData));
        return;
      };
      localStorage.setItem("todos", JSON.stringify([insertdata]));
    })
  }
  template() {
    return `
    <div class="todoapp">
    <h1>TODOS</h1>
    <input class="new-todo" placeholder="할일을 추가해주세요" autofocus>
    <main></main>
    </div>`;
  }
  onMounted() {
    new countcontainer({ element: document.querySelector('main') as HTMLElement });
  }
}