import { login } from './modules/login';
import { renderElement } from './utils/dom';

renderElement(login(), '[data-mypages-login]');
