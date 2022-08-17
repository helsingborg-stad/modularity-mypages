import './styles.scss';

import { ReactNode, useState } from 'react';

export const ToggleForm = ({
  icon,
  text,
  children,
  isChanged,
  onSubmit,
  onToggle,
}: {
  icon: string;
  children: ReactNode;
  isChanged: boolean;
  text?: string;
  onSubmit: Function;
  onToggle: Function;
}) => {
  const [state, setState] = useState({ open: false });

  const toggleState = () => {
    if (isChanged) {
      setState({ ...state, open: !state.open });
      onToggle(!state.open);
    } else {
      onSubmit();
    }
  };

  const getButtonText = (): string => {
    if (isChanged) {
      return state.open ? 'Stäng' : 'Ändra';
    }

    return 'Spara ändringarna';
  };

  return (
    <div className="c-paper c-paper--padding-2 toggle-form">
      <div className="toggle-form__header">
        <div className="toggle-form__header-content">
          <div className="toggle-form__icon">
            <i className="c-icon material-icons" translate="no" role="img">
              {icon}
            </i>
          </div>
          <div className="toggle-form__primary">{text}</div>
        </div>
        <button
          onClick={toggleState}
          className="c-button c-button__basic c-button__basic--primary c-button--md"
          type="button">
          <span className="c-button__label">
            <span className="c-button__label-text c-button__label-text--reverse">{getButtonText()}</span>
          </span>
        </button>
      </div>
      <div className="toggle-form__body">{state.open ? children : null}</div>
    </div>
  );
};
