import Cookies from 'js-cookie';
import { SESSION_COOKIE } from '../constants';

export const removeAuthorizationCookie = () => {
  Cookies.remove(SESSION_COOKIE);
};

export const getAuthorizationCookie = () => {
  return Cookies.get(SESSION_COOKIE);
};
