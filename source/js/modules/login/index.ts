import { flyg } from 'flyg';
import { APPROOT_LOGIN } from '../../constants';
import { login } from '../../services/api';
import { renderElement } from '../../utils/dom';
import { getAuthorizationCookie, removeAuthorizationCookie } from '../../utils/session';

export const main = () => {
  const loginButton = () => {
    const component = flyg<HTMLElement>`
      <button class="c-button c-button__basic c-button__basic--primary c-button--md ripple ripple--before" type="button">Mina sidor</button>
    `;

    component.addEventListener('click', () => {
      login().then(({ redirectUrl }) => {
        location.href = redirectUrl;
      });
    });

    return component;
  };

  const signOutButton = () => {
    const component = flyg<HTMLElement>`
      <button class="c-button c-button__basic c-button__basic--primary c-button--md ripple ripple--before" type="button">Logga ut</button>
    `;

    component.addEventListener('click', () => {
      removeAuthorizationCookie();
      location.reload();
    });

    return component;
  };

  return getAuthorizationCookie() ? signOutButton() : loginButton();
};

(async () => {
  renderElement(main(), APPROOT_LOGIN);
})();
