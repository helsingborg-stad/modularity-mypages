import { AuthMethods } from '../main';
import { SecondaryButton } from './SecondaryButton';
import { PrimaryButton } from './PrimaryButton';
import { BankIDButtonLogo } from '../assets/BankIdButtonLogo';

export const AuthenticationMenu = (onSelect: Function) => {
  const component = document.createElement('div');
  const primaryAuthButton = PrimaryButton(`${BankIDButtonLogo} Logga in med mobilt BankID`, () =>
    onSelect(AuthMethods.BANKID_OTHER_DEVICE),
  );
  const secondaryAuthButton = SecondaryButton('BankID på fil?', () => onSelect(AuthMethods.BANKID_THIS_DEVICE));
  component.setAttribute('class', 'u-margin__top--5 u-display--flex u-align-items--center u-flex-direction--column');
  component.appendChild(primaryAuthButton);
  component.appendChild(secondaryAuthButton);

  return component;
};
