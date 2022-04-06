export const Loader = (text?: string) => {
  const component = document.createElement('div');
  const loader = document.createElement('div');
  const p = document.createElement('p');
  loader.setAttribute(
    'class',
    'u-margin__bottom--5 c-loader c-loader__circular--color--primary c-loader__circular c-loader__circular--md',
  );
  loader.setAttribute('aria-busy', 'true');
  loader.setAttribute('role', 'progressbar');
  component.setAttribute('class', 'u-margin__bottom--3 u-margin__top--3');
  component.appendChild(loader);

  if (text) {
    p.textContent = text;
    component.appendChild(p);
  }

  return component;
};
