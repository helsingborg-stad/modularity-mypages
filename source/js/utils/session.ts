import Cookies from 'js-cookie';

export const setAuthorizationCookie = (authorizationCode: string) => {
  Cookies.set('myPagesAuthenticated', authorizationCode, { path: '/' });
};

export const removeAuthorizationCookie = () => {
  Cookies.remove('myPagesAuthenticated');
};

export const getAuthorizationCookie = () => {
  return Cookies.get('myPagesAuthenticated');
};
