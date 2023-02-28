import { component } from '../core/component';

export class countcontainer extends component {

  setup() {
    this.state = JSON.parse(localStorage.getItem('todos'));
  }
  template() {
    if (!this.state) return '';
    return `
    ${this.state?.map((data) => (
      `<li id="${data.id}" class="false">
        <div class="view">
          <input type="checkbox" class="toggle">
          <label class="label">
          ${data.title}
          </label>
          <button class="destroy"></button>
        </div>
      </li>`
    )).join("")}`;
  }
}