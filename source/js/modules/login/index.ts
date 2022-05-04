import { AuthenticateBankIdOtherDevice } from './controllers/AuthenticateBankIdOtherDevice';
import { AuthenticateBankIdThisDevice } from './controllers/AuthenticateBankIdThisDevice';
import { AuthenticationMenu } from './controllers/AuthenticationMenu';

import { removeAuthorizationCookie, renderElement } from '../../utils/dom';

export enum AuthenticationMethods {
  BANKID_OTHER_DEVICE,
  BANKID_THIS_DEVICE,
}

export const login = () => {
  const rootComponent = document.createElement('div');
  const actions = {
    onNavigate: function (value: AuthenticationMethods) {
      switch (value) {
        case AuthenticationMethods.BANKID_THIS_DEVICE:
          const authenticateBankIdThisDevice = AuthenticateBankIdThisDevice(this.loadInitialState.bind(actions));
          renderElement(authenticateBankIdThisDevice, rootComponent);
          break;
        case AuthenticationMethods.BANKID_OTHER_DEVICE:
          const authenticateBankIdOtherDevice = AuthenticateBankIdOtherDevice(this.loadInitialState.bind(actions));
          renderElement(authenticateBankIdOtherDevice, rootComponent);
          break;
      }
    },
    loadInitialState: async function () {
      const authMenuComponent = await AuthenticationMenu(this.onNavigate.bind(actions));
      renderElement(authMenuComponent, rootComponent);
    },
  };

  // Sign out function
  document.querySelector('[data-mypages-signout]')?.addEventListener('click', () => {
    removeAuthorizationCookie();
    location.reload();
  });

  actions.loadInitialState();

  return rootComponent;
};
