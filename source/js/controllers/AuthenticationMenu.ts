import { AuthenticationMethods } from '../modules/login';
import { htmlToElement, isMobileDevice } from '../utils';

const desktop = (onSelect: Function) => {
  const component = htmlToElement<HTMLDivElement>(myPagesComponents['login-menu-desktop'].html);
  const primaryButton = component.querySelector<HTMLButtonElement>('[data-mypages-login-primary]');
  const secondaryButton = component.querySelector<HTMLButtonElement>('[data-mypages-login-secondary]');

  primaryButton?.addEventListener('click', () => onSelect(AuthenticationMethods.BANKID_OTHER_DEVICE));
  secondaryButton?.addEventListener('click', () => onSelect(AuthenticationMethods.BANKID_THIS_DEVICE));

  return component;
};

const mobile = (onSelect: Function) => {
  const component = htmlToElement<HTMLDivElement>(myPagesComponents['login-menu-mobile'].html);
  const primaryButton = component.querySelector<HTMLButtonElement>('[data-mypages-login-primary]');
  const secondaryButton = component.querySelector<HTMLButtonElement>('[data-mypages-login-secondary]');

  primaryButton?.addEventListener('click', () => onSelect(AuthenticationMethods.BANKID_THIS_DEVICE));
  secondaryButton?.addEventListener('click', () => onSelect(AuthenticationMethods.BANKID_OTHER_DEVICE));

  return component;
};

export const AuthenticationMenu = async (onSelect: Function) => {
  return isMobileDevice() ? mobile(onSelect) : desktop(onSelect);
};
