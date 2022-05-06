import { login, session } from '../../api';
import { SESSION_ID_PARAMETER } from '../../constants';
import { removeAuthorizationCookie, setAuthorizationCookie } from '../../utils/session';

export default () => {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get(SESSION_ID_PARAMETER);

  if (sessionId) {
    session(sessionId).then((response) => {
      setAuthorizationCookie(response.sessionToken);
    });
  }

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
