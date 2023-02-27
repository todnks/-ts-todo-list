export class component {
  $element: HTMLElement;
  state: [{}];
  constructor({ element }: HTMLElement) {
    this.$element = element;
    this.setup();
    this.render();
  }
  setup() { }
  setState() { }
  setEvent() { }
  template() { return ''; }
  render() {
    if (this.$element) this.$element.innerHTML = this.template();
    this.setEvent();
    this.onMounted();
  }
  onMounted() { }
}
