import Cookies from 'js-cookie';

export const removeAuthorizationCookie = () => {
  Cookies.remove('wordpress_mypages_session');
};

export const getAuthorizationCookie = () => {
  return Cookies.get('wordpress_mypages_session');
};
