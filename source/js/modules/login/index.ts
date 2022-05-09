import { login } from '../../api';
import { removeAuthorizationCookie } from '../../utils/session';

export default () => {
  document.querySelector('[data-mypages-signin]')?.addEventListener('click', () => {
    login().then(({ redirectUrl }) => {
      location.href = redirectUrl;
    });
  });

  document.querySelector('[data-mypages-signout]')?.addEventListener('click', () => {
    removeAuthorizationCookie();
    location.reload();
  });
};
