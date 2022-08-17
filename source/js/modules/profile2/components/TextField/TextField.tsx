import { HTMLInputTypeAttribute, FocusEvent } from 'react';

interface TextFieldInterface {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
  id?: string;
  pattern?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  'data-invalid-message'?: string;
}

export const TextField = ({ onChange, name, value, id, label, type, ...attrs }: TextFieldInterface) => {
  const clearCustomValidity = (event: FocusEvent<HTMLInputElement>) => {
    event.target.setCustomValidity('');
  };

  return (
    <div className="form-group">
      <label className="c-field__text--label">{label}</label>
      <div className="c-field c-field--text c-field--md c-field--radius-md">
        <div className="c-field__inner c-field__inner--text">
          <input
            onBlur={clearCustomValidity}
            onInvalid={clearCustomValidity}
            type={type}
            id={id}
            name={name}
            onChange={onChange}
            value={value ?? ''}
            {...attrs}
          />
        </div>
      </div>
    </div>
  );
};
