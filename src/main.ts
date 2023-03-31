import './style.css';
import App from './App';
import { createRoot } from './core/Render';
import { Selector } from './utills';
createRoot(Selector('#app')).render(App);