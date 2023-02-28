import { component } from '../core/component';
import { keys } from "../constants"

export class listContainer extends component {

  setup() {
    this.state = JSON.parse(localStorage.getItem(keys.key)!);
  }
  setEvent() {

    const destroyBtn = document.querySelectorAll(".destroy");
    destroyBtn.forEach(element => {
      element.addEventListener("click", () => {
        const data = this.state?.filter(data => String(data.id).indexOf(element.id));
        localStorage.setItem(keys.key, JSON.stringify(data));
        new listContainer(document.querySelector('#todo-list')!);
      })
    });
  }
  template() {
    if (!this.state) return '';
    return `
    ${this.state.map((data) => (
      `<li id="${data.id}" class="false">
        <div class="view">
          <input type="checkbox" class="toggle" id="${data.id}">
          <label class="label">
          ${data.title}
          </label>
          <button class="destroy" id="${data.id}"></button>
        </div>
      </li>`
    )).join("")}`;
  }
}