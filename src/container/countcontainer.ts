import { component } from '../core/component';

export class countcontainer extends component {

  setup() {
    this.state = JSON.parse(localStorage.getItem('todos'));
  }

  template() {
    let todoList: [] = [];
    this.state?.forEach(({ title }) => {
      todoList.push(title);
    });
    return `
    ${todoList.map((title) => (
      `<li class="false">
        <div class="view">
          <input type="checkbox" class="toggle">
          <label class="label">
          ${title}
          </label>
          <button class="destroy"></button>
        </div>
      </li>`
    )).join("")}
    `;
  }
}