import { getTasks, Task } from '../../api';
import { htmlToElement, renderElement } from '../../utils/dom';

const task = (item: Task): Node => {
  return htmlToElement(`
        <div class="c-paper c-paper--padding-3 u-margin__bottom--1 tasklist__item">
            <div class="tasklist__item-header">
                <div class="tasklist__item-icon tasklist__item-icon--${item.type}"></div>
            </div>
            <div class="tasklist__item-body">
                <h3 class="tasklist__item-title">${item.title}</h3>
                ${item.info ? `<div class="tasklist__item-info">${item.info}</div>` : ''}
                ${item.status ? `<div class="tasklist__item-status">${item.status}</div>` : ''}
            </div>
            <div class="tasklist__item-footer">
                <div class="tasklist__item-date">${item.lastUpdated}</div>
            </div>
        </div>
    `);
};

export const main = async () => {
  const rootComponent = document.createElement('div');
  const response = await getTasks();
  const [completedTasks, ongoingTasks] = response.reduce(
    ([completed, ongoing], item) => (item.complete ? [[...completed, item], ongoing] : [completed, [...ongoing, item]]),
    [[], []] as [Task[], Task[]],
  );

  if (ongoingTasks.length > 0) {
    const header = htmlToElement<HTMLElement>(`<h2 class="u-margin__bottom--2">Aktiva ärenden</h2>`);
    const list = htmlToElement<HTMLElement>(`<div class="tasklist"></div>`);
    ongoingTasks.forEach((item) => list.appendChild(task(item)));
    rootComponent.appendChild(header);
    rootComponent.appendChild(list);
  }

  if (completedTasks.length > 0) {
    const header = htmlToElement<HTMLElement>(`<h2 class="u-margin__bottom--2">Avslutade ärenden</h2>`);
    const list = htmlToElement<HTMLElement>(`<div class="tasklist tasklist--completed"></div>`);
    completedTasks.forEach((item) => list.appendChild(task(item)));
    rootComponent.appendChild(header);
    rootComponent.appendChild(list);
  }

  const button = htmlToElement<HTMLElement>(
    `<button type="button" class="c-button c-button__outlined c-button__outlined--primary c-button--md ripple ripple--before u-margin__top--3"">Visa alla</div>`,
  );

  rootComponent.appendChild(button);

  return rootComponent;
};

(async () => {
  renderElement(await main(), '[data-mypages-tasks]');
})();
