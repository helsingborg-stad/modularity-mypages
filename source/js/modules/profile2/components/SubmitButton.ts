import { flyg } from 'flyg';

export const SubmitButton = () => {
  return flyg<HTMLButtonElement>`
    <button
      class="c-button c-button__filled c-button__filled--primary c-button--md ripple ripple--before"
      type="submit"
      <span class="c-button__label">
          <span class="c-button__label-text">Save</span>
      </span>
    </button>`;
};
