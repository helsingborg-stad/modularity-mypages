import { flyg } from 'flyg';

export const Notice = ({ text }: { text: string }) => {
  const component = flyg<HTMLElement>`
      <div
        id="mypages-profile-notice"
        class="c-notice u-margin__bottom--3 c-notice--success"
        aria-labelledby="mypages-profile-notic">
        <span class="c-notice__icon">
          <i
            id="6284bd2fbb9f0"
            class="c-icon c-icon--size-md material-icons"
            translate="no"
            role="img"
            alt=""
            data-uid="6284bd2fbb9e9">
            report
          </i>
        </span>
        <span id="notice__text__6284bd2fbb6cb" for="" class="c-notice__message">${text}</span>
      </div>
    `;

  return component;
};
