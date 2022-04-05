import { AuthenticateBankIdOtherDevice } from './components/AuthenticateBankIdOtherDevice';
import { AuthenticateBankIdThisDevice } from './components/AuthenticateBankIdThisDevice';
import { AuthMenu } from './components/AuthMenu';
import { renderElement } from './dom-utils';

export enum AuthMethods {
  BANKID_OTHER_DEVICE,
  BANKID_THIS_DEVICE,
}

const App = () => {
  const rootComponent = document.createElement('div');
  const actions = {
    onNavigate: function (value: AuthMethods) {
      switch (value) {
        case AuthMethods.BANKID_THIS_DEVICE:
          const authenticateBankIdThisDevice = AuthenticateBankIdThisDevice(this.loadInitialState.bind(actions));
          renderElement(authenticateBankIdThisDevice, rootComponent);
          break;
        case AuthMethods.BANKID_OTHER_DEVICE:
          const authenticateBankIdOtherDevice = AuthenticateBankIdOtherDevice(this.loadInitialState.bind(actions));
          renderElement(authenticateBankIdOtherDevice, rootComponent);
          break;
      }
    },
    loadInitialState: function () {
      const authMenuComponent = AuthMenu(this.onNavigate.bind(actions));
      renderElement(authMenuComponent, rootComponent);
    },
  };

  actions.loadInitialState();

  return rootComponent;
};

renderElement(App(), '#login-app');
