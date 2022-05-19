import './main.scss';

import { flyg } from 'flyg';
import { Task } from './components/Task';
import { Loader } from '../../common/components/Loader';
import { Case, getTasks } from '../../api';
import { renderElement } from '../../utils/dom';
import { APPROOT_TASKS } from '../../constants';

export const main = async () => {
  const rootComponent = document.createElement('div');
  const { current, archive } = await getTasks();

  if (current.length > 0) {
    const list = flyg<HTMLElement>`
      <div class="tasklist">
        <h2 class="tasklist__header u-margin__bottom--2">Aktuella</h2>
        ${current.map((item: Case) => Task(item))}
      </div>`;

    rootComponent.appendChild(list);
  }

  if (archive.length > 0) {
    const list = flyg<HTMLElement>`
      <div class="tasklist tasklist--completed">
        <h2 class="tasklist__header u-margin__bottom--2">Tidigare</h2>
        ${archive.map((item: Case) => Task(item))}
      </div>`;

    rootComponent.appendChild(list);
  }

  if (current.length === 0 && archive.length === 0) {
    const info = flyg<HTMLElement>`
      <p>Du har inga skapade ärenden.</p>
    `;

    rootComponent.appendChild(info);
  }

  return rootComponent;
};

(async () => {
  renderElement(Loader(), APPROOT_TASKS);
  renderElement(await main(), APPROOT_TASKS);
})();
