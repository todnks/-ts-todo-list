import { component } from '../core/component';

export class countcontainer extends component {
  template() {
    return `
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
    </div>`;
  }
}