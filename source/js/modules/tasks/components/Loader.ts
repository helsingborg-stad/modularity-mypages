import { flyg } from 'flyg';

export const Loader = () =>
  flyg<HTMLElement>`
        <div class="c-loader c-loader__circular--color--black c-loader__circular c-loader__circular--md u-margin__top--5 u-margin__bottom--5" aria-busy="true" role="progressbar"></div>
    `;
