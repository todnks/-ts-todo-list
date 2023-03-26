import { routes } from '../router/routes';
import { _render, addEvent } from './Render';

export default function Router() {

  const routeEvent = () => {
    addEvent('a', 'click', ({ target }: HTMLElement) => {
      const { hash } = target.dataset;
      if (hash) push(hash);
    });
    window.addEventListener('popstate', () => {
      _render();
    })
  }

  const push = (path: string) => {
    const hashName = path.replace('#', '');
    window.location.hash = findroute(hashName) === -1 ? '/' : hashName;
  }

  const findroute = (path: string) => {
    return routes.findIndex((key) => key === path);
  }
  return {
    routeEvent,
    push
  }
}
export const { routeEvent } = Router();