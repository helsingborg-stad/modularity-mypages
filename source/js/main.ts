import { AuthenticateBankIdOtherDevice } from './components/AuthenticateBankIdOtherDevice';
import { AuthenticateBankIdThisDevice } from './components/AuthenticateBankIdThisDevice';
import { AuthenticationMenu } from './components/AuthenticationMenu';
import { renderElement } from './utils';
import Cookies from 'js-cookie';

export enum AuthenticationMethods {
  BANKID_OTHER_DEVICE,
  BANKID_THIS_DEVICE,
}

const App = () => {
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
  document.querySelector('[data-mypages-signout="true"]')?.addEventListener('click', () => {
    Cookies.remove('myPagesAuthenticated');
    location.reload();
  });

  actions.loadInitialState();

  return rootComponent;
};

renderElement(App(), '[data-mypages-login]');
