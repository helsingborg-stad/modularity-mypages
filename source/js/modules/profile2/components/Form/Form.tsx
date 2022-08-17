import { FormEvent } from 'react';

interface FormProps {
  children: any;
  onInput?: Function;
  onSubmit?: Function;
}

export const Form = ({ children, onInput = () => {}, onSubmit = () => {} }: FormProps) => {
  const input = (event: FormEvent) => {
    onInput(event);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(event);
  };

  return (
    <form className="c-form" autoComplete="on" onSubmit={submit} onInput={input} onChange={input}>
      {children}
    </form>
  );
};
