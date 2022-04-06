export const PrimaryButton = (text: string, onClick: Function) => {
  const component = document.createElement('button');
  component.setAttribute('type', 'button');
  component.setAttribute(
    'class',
    'u-width--100 c-button c-button__filled c-button__filled--primary c-button--md ripple ripple--before',
  );
  component.innerHTML = text;
  component.addEventListener('click', () => {
    onClick();
  });

  return component;
};
