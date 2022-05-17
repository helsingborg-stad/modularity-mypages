import './main.scss';
import { flyg } from 'flyg';
import { getUser } from '../../api';
import { renderElement } from '../../utils/dom';

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
  renderElement(main(), '[data-mypages-welcome]');
})();
