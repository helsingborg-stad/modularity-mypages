import { flyg } from 'flyg';
import { Task } from './components/Task';
import { getTasks, Taskmodel } from '../../api';
import { renderElement } from '../../utils/dom';
import './main.scss';

export const main = async () => {
  const rootComponent = document.createElement('div');
  const response = await getTasks();
  const [completedTasks, ongoingTasks] = response.reduce(
    ([completed, ongoing], item) => (item.complete ? [[...completed, item], ongoing] : [completed, [...ongoing, item]]),
    [[], []] as [Taskmodel[], Taskmodel[]],
  );

  if (ongoingTasks.length > 0) {
    const list = flyg<HTMLElement>`<div></div>`;
    const tasks = flyg<HTMLElement>`
      <div class="tasklist">
        <h2 class="tasklist__header u-margin__bottom--2">Aktiva</h2>
        ${list}
      </div>`;

    ongoingTasks.forEach((item: Taskmodel) => list.appendChild(Task(item)));
    rootComponent.appendChild(tasks);
  }

  if (completedTasks.length > 0) {
    const list = flyg<HTMLElement>`<div></div>`;
    const tasks = flyg<HTMLElement>`
      <div class="tasklist tasklist--completed">
        <h2 class="tasklist__header u-margin__bottom--2">Avslutade</h2>
        ${list}
      </div>`;

    completedTasks.forEach((item: Taskmodel) => list.appendChild(Task(item)));
    rootComponent.appendChild(tasks);
  }

  return rootComponent;
};

(async () => {
  renderElement(await main(), '[data-mypages-tasks]');
})();
