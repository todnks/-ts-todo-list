import { SelectorAll } from "../utills";
import { routeEvent } from './Router';
interface IRenderContext {
  container: Element | null,
  rootComponent: () => string,
  eventStack: TEventStack[]
}
type TEventStack = {
  target: string,
  eventType: string,
  callback: () => void,
}

function Render() {
  const RenderContext: IRenderContext = {
    container: null,
    rootComponent: () => '',
    eventStack: []
  }
  const _render = () => {
    const { container, rootComponent } = RenderContext;
    if (container) {
      container.innerHTML = rootComponent();
      routeEvent();
      subscribeEvent();
    }
  }

  const subscribeEvent = () => {
    RenderContext.eventStack.forEach(({ target, eventType, callback }) => {
      const targetList = SelectorAll(target);
      if (!targetList.length) return;
      targetList.forEach((item) => {
        item.addEventListener(eventType, callback);
      });
    });
    RenderContext.eventStack = [];
  };

  const addEvent = (target: string, eventType: string, callback: () => void) => {
    RenderContext.eventStack.push({
      target,
      eventType,
      callback,
    })
  }

  const render = (rootComponent: IRenderContext['rootComponent']) => {
    RenderContext.rootComponent = rootComponent;
    _render();
  }

  const createRoot = (container: IRenderContext['container']) => {
    RenderContext.container = container;
    return {
      render
    }
  }
  return {
    createRoot,
    _render,
    addEvent
  }
}

export const { createRoot, addEvent, _render } = Render();