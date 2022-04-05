export const SecondaryButton = (text: string, onClick: Function) => {
  const component = document.createElement('button');
  component.setAttribute('type', 'button');
  component.setAttribute(
    'class',
    'c-button c-button__basic c-button__basic--default c-button--md ripple ripple--before',
  );
  component.textContent = text;
  component.addEventListener('click', () => {
    onClick();
  });

  return component;
};
