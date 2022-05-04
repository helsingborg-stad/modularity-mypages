import './main.scss';
import { flyg } from 'flyg';
import { getUser } from '../../api';
import { renderElement } from '../../utils/dom';

export const main = async () => {
  const rootComponent = document.createElement('div');
  const user = await getUser();

  const title = flyg<HTMLElement>`
    <h1>Hej ${user.firstName}!</h1>
  `;

  rootComponent.appendChild(title);

  return rootComponent;
};

(async () => {
  renderElement(await main(), '[data-mypages-welcome]');
})();
