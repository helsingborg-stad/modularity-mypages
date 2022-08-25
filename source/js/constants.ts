import { getAttributes } from './utils/dom';

export const APPROOT_LOGIN = '[data-mypages-login]';
export const APPROOT_PROFILE = '[data-mypages-profile]';
export const APPROOT_PROFILE_2 = '[data-mypages-profile-2]';
export const APPROOT_PROFILE_3 = '[data-mypages-profile-3]';
export const APPROOT_TASKS = '[data-mypages-tasks]';
export const APPROOT_WELCOME = '[data-mypages-welcome]';
export const AUTHENTICATION_URL = '/auth';
export const MYPAGES_URL = '/mitt-helsingborg/mina-sidor';

export const [API_URL, API_KEY, SESSION_COOKIE] = getAttributes(APPROOT_LOGIN, [
  'data-endpoint',
  'data-apikey',
  'data-session-cookie',
]);
