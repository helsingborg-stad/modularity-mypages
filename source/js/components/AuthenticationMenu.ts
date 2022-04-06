import { AuthenticationMethods } from '../main';
import { SecondaryButton } from './SecondaryButton';
import { PrimaryButton } from './PrimaryButton';
import { BankIDButtonLogo } from '../assets/BankIdButtonLogo';
import { isMobileDevice } from '../utils';

export const AuthenticationMenu = (onSelect: Function) => {
  const component = document.createElement('div');

  let primaryAuthButton;
  let secondaryAuthButton;

  if (isMobileDevice()) {
    primaryAuthButton = PrimaryButton(`${BankIDButtonLogo} Logga in med mobilt BankID`, () =>
      onSelect(AuthenticationMethods.BANKID_THIS_DEVICE),
    );
    secondaryAuthButton = SecondaryButton('Mobilt BankID på en annan enhet', () =>
      onSelect(AuthenticationMethods.BANKID_OTHER_DEVICE),
    );
  } else {
    primaryAuthButton = PrimaryButton(`${BankIDButtonLogo} Logga in med mobilt BankID`, () =>
      onSelect(AuthenticationMethods.BANKID_OTHER_DEVICE),
    );
    secondaryAuthButton = SecondaryButton('BankID på fil?', () => onSelect(AuthenticationMethods.BANKID_THIS_DEVICE));
  }

  component.setAttribute('class', 'u-margin__top--5 u-display--flex u-align-items--center u-flex-direction--column');
  component.appendChild(primaryAuthButton);
  component.appendChild(secondaryAuthButton);

  return component;
};
