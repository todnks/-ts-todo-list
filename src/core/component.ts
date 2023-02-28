interface todoListData {
  id: number,
  title: string,
  completed: boolean
}
export class component {
  $element: HTMLElement;
  state?: todoListData[];
  constructor(element: HTMLElement) {
    this.$element = element;
    this.setup();
    this.render();
  }
  setup() { }
  setState() { }
  setEvent() { }
  template() { return ''; }
  render() {
    this.$element.innerHTML = this.template();
    this.setEvent();
    this.onMounted();
  }
  onMounted() { }
}
