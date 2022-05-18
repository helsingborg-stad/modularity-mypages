const calculateElementHeight = (element: HTMLElement): number => {
  if (!element.parentElement) {
    return 0;
  }

  const clone = element.cloneNode(true) as HTMLElement;
  clone.style.cssText = 'height: auto; position: absolute; opacity: 0;';
  element.parentElement.appendChild(clone);
  const { height } = clone.getBoundingClientRect();
  element.parentElement.removeChild(clone);

  return height;
};

export const Expandable = (element: HTMLElement) => {
  element.classList.add('collapsed');

  const actions = {
    toggle: () => {
      const height = calculateElementHeight(element);
      const expanding = element.classList.contains('collapsed');
      const [target, current] = expanding ? [height, 0] : [0, height];
      element.style.height = `${current}px`;
      element.getClientRects(); //force reflow
      element.classList.toggle('collapsed');
      element.style.height = `${target}px`;
    },
  };

  element.addEventListener('transitionend', (event: TransitionEvent) => {
    if (event.propertyName === 'height') {
      element.style.removeProperty('height');
    }
  });

  return { component: element, actions };
};
