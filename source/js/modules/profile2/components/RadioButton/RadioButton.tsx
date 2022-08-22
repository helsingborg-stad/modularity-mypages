interface RadiobuttonInterface {
  value: string;
  checked?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formatter?: (value: string) => string;
}

export const Radiobutton = ({
  id,
  value,
  checked,
  onChange,
  formatter,
}: RadiobuttonInterface & React.HTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="c-option c-option--md c-option__radio">
      <input
        id={id}
        onChange={onChange}
        name={value}
        checked={checked}
        type="radio"
        className="c-option__radio--hidden-box"
        placeholder={value}
        value={value}
        aria-checked="false"
        tabIndex={0}
        aria-labelledby=""
      />
      <label htmlFor={id} className="c-option__radio--label">
        <span className="c-option__radio--label-box"></span>
        <span className="c-option__radio--label-text">{formatter ? formatter(value) : value}</span>
      </label>
    </div>
  );
};
