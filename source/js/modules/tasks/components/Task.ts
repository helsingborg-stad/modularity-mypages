import { flyg } from 'flyg';
import { Expandable } from '../../../common/components/Expandable';
import { Case } from '../../../services/api/types';

const icons: Record<string, Function> = {
  ['Skol-  och fritidsförvaltningen']: () =>
    flyg<SVGElement>`<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z" /></svg>`,
  ['Räddningstjänsten Skåne Nordväst']: () =>
    flyg<SVGElement>`<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z" /></svg>`,
  default: () =>
    flyg<SVGElement>`<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 11A3.5 3.5 0 0 0 12.5 7.5M15.94 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13M15 4A3.39 3.39 0 0 0 13.07 4.59A5 5 0 0 1 13.07 10.41A3.39 3.39 0 0 0 15 11A3.5 3.5 0 0 0 15 4Z" /></svg>`,
};

// TODO: Remove. Only for testing
const formatJSON = (value: string) => {
  const brace = {
    brace: 0,
  };
  return value.replace(/({|}[,]*|[^{}:]+:[^{}:,]*[,{]*)/g, (m, p1) => {
    const returnFunction = () => `<div style="text-indent: ${brace.brace * 20}px;">${p1}</div>`;
    let returnString: any = 0;
    if (p1.lastIndexOf('{') === p1.length - 1) {
      returnString = returnFunction();
      brace.brace += 1;
    } else if (p1.indexOf('}') === 0) {
      brace.brace -= 1;
      returnString = returnFunction();
    } else {
      returnString = returnFunction();
    }
    return returnString;
  });
};

export const Task = (item: Case) => {
  const toggleContent = Expandable(flyg`
    <div class="task__history">
        <div class="c-paper--padding-5">
           <pre></pre>
        </div>
    </div>
  `);

  // TODO: Remove. Only for testing
  const pre = toggleContent.component.querySelector('pre');
  pre!.innerHTML = formatJSON(JSON.stringify(item));

  const component = flyg<HTMLElement>`
    <div class="task c-paper u-margin__bottom--2">
      <div class="task__info c-paper--padding-5">
        <div class="task__header">
          <div class="task__icon">
            ${icons[item.OrganisationName] ? icons[item.OrganisationName]() : icons.default()}
          </div>
        </div>
        <div class="task__body">
          <h3 class="task__title">${item.ServiceName}</h3>
            <div class="task__info">
              ${new Date(item.CurrentStateDate).toLocaleDateString('sv-SE')}
              ${new Date(item.CurrentStateDate).toLocaleTimeString('sv-SE')}
            </div>
          <div class="task__status">${item.Status}</div>
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
