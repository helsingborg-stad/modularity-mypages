import './main.scss';
import { flyg } from 'flyg';
import { renderElement } from '../../utils/dom';
import { APPROOT_WELCOME } from '../../constants';
import { getUser } from '../../services/api';

export const main = () => {
  const component = flyg<HTMLElement>`
    <h1 class="welcome ghost"></h1>
  `;

  getUser().then(({ firstName }) => {
    component.innerHTML = `Hej ${firstName}!`;
  });

  return component;
};

(async () => {
  renderElement(main(), APPROOT_WELCOME);
})();
