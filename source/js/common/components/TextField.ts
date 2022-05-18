import { flyg } from 'flyg';

interface Props {
  id: string;
  label: string;
  attrs: Record<string, string>[];
  onInput?: Function;
  onBlur?: Function;
  onFocus?: Function;
}

export const TextField = ({ id, label, attrs, onInput = () => {}, onBlur = () => {}, onFocus = () => {} }: Props) => {
  const input = flyg<HTMLInputElement>`
    <input id="${id}" />
  `;

  const component = flyg<HTMLElement>`
    <div class="c-field c-field--text c-field--md c-field--radius-md">
        <label class="c-field__label" for="${id}">${label}</label>
        <div class="c-field__inner c-field__inner--text">
            ${input}
            <i class="c-icon c-field__suffix material-icons c-field__error-icon" translate="no" role="img">error_outline</i>
        </div>
    </div>
    `;

  attrs.forEach((attribute) => {
    const [key, value] = Object.entries(attribute)[0];
    input.setAttribute(key, value);
  });

  input.addEventListener('input', (event) => {
    onInput(event);
  });

  input.addEventListener('focus', (event) => {
    onFocus(event);
  });

  input.addEventListener('blur', (event) => {
    input.setCustomValidity('');
    onBlur(event);
  });

  input.addEventListener('invalid', () => {
    input.setCustomValidity('');
  });

  const actions = {
    getValue: () => {
      return input.value;
    },
  };

  return { component, actions };
};
