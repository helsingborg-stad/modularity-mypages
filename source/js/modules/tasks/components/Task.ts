import { flyg } from 'flyg';
import { Taskmodel } from '../../../api';
import { Expandable } from './Expandable';

const icons: Record<string, Function> = {
  account: () =>
    flyg<SVGElement>`<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 11A3.5 3.5 0 0 0 12.5 7.5M15.94 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13M15 4A3.39 3.39 0 0 0 13.07 4.59A5 5 0 0 1 13.07 10.41A3.39 3.39 0 0 0 15 11A3.5 3.5 0 0 0 15 4Z" /></svg>`,
};

export const Task = (item: Taskmodel) => {
  const toggleContent = Expandable(flyg`
    <div class="task__history">
        <div class="c-paper--padding-5">
            ${item.history}
        </div>
    </div>
  `);

  const component = flyg<HTMLElement>`
    <div class="task c-paper u-margin__bottom--2">
      <div class="task__info c-paper--padding-5">
        <div class="task__header">
          <div class="task__icon">
            ${icons[item.type]()}
          </div>
        </div>
        <div class="task__body">
          <h3 class="task__title">${item.title}</h3>
          <div class="task__info">${item.info}</div>
          <div class="task__status">${item.status}</div>
        </div>
        <button class="task__expand">
          <i class="c-icon c-icon--size-xl material-icons" translate="no" role="img">chevron_right</i>
        </button>
      </div>
      ${toggleContent.component}
    </div>
  `;

  const expandButton = component.querySelector<HTMLButtonElement>('.task__expand');

  expandButton?.addEventListener('click', () => {
    component?.classList.toggle('task--opened');
    toggleContent.actions.toggle();
  });

  return component;
};
