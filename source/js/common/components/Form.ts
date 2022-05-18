import { flyg } from 'flyg';

interface Props {
  content: HTMLElement;
  onInput?: Function;
  onSubmit?: Function;
}

export const Form = ({ content, onInput = () => {}, onSubmit = () => {} }: Props) => {
  const component = flyg<HTMLElement>`
    <form class="c-form" autocomplete="on">
      ${content}
    </form>
  `;

  component.addEventListener('input', (event) => {
    onInput(event);
  });

  component.addEventListener('submit', (event) => {
    event.preventDefault();
    onSubmit(event);
  });

  return component;
};
