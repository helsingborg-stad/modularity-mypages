import Cookies from 'js-cookie';

export const removeAuthorizationCookie = () => {
  Cookies.remove('session');
};

export const getAuthorizationCookie = () => {
  return Cookies.get('session');
};
