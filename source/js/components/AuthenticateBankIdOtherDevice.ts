import qrcode from 'qrcode';
import { auth, cancel, collect, getClientIp } from '../api';
import { SecondaryButton } from './SecondaryButton';
import { COLLECTPOLL_INTERVAL, MYPAGES_URL } from '../constants';
import { isMobileDevice, renderElement, setAuthCookie } from '../utils';
import {
  BankIdHintCode,
  BankIdRecommendedUsereMessages,
  BankIdStatus,
  getBankIdRecommendedUsereMessage,
} from '../utils/bankid-message';
import { Loader } from './Loader';

export const AuthenticateBankIdOtherDevice = (resetView: Function) => {
  const component = document.createElement('div');
  const abortButtonComponent = SecondaryButton('Avbryt', resetView);
  const statusElement = document.createElement('p');
  const qrContainer = document.createElement('div');
  component.setAttribute('class', 'u-margin__top--5 u-display--flex u-align-items--center u-flex-direction--column');
  component.appendChild(statusElement);
  component.appendChild(qrContainer);
  component.appendChild(abortButtonComponent);
  statusElement.appendChild(Loader('Laddar...'));

  const renderAuthQR = (code: string) => {
    const canvas = document.createElement('canvas');
    qrcode.toCanvas(canvas, code, {
      width: 170,
    });
    renderElement(canvas, qrContainer);
  };

  const clearAuthQR = () => {
    if (qrContainer.childNodes[0]) {
      qrContainer.removeChild(qrContainer.childNodes[0]);
    }
  };

  getClientIp()
    .then((endUserIp) => auth({ endUserIp }))
    .then(({ orderRef }) => {
      abortButtonComponent.addEventListener('click', () => {
        cancel({ orderRef });
        return Promise.reject();
      });
      return orderRef;
    })
    .then((orderRef: string) => {
      const collectPoll = async (resolve: Function, reject: Function) => {
        try {
          const { status, authCode, hintCode, errorCode, authorizationCode } = await collect({ orderRef });

          statusElement.innerHTML = getBankIdRecommendedUsereMessage({
            authUsingQR: true,
            mobileDevice: isMobileDevice(),
            errorCode,
            hintCode,
            status,
          });

          if (hintCode === BankIdHintCode.USER_SIGN) {
            clearAuthQR();
          } else {
            renderAuthQR(authCode);
          }

          if (status === BankIdStatus.COMPLETE) {
            resolve(authorizationCode);
          } else {
            setTimeout(collectPoll, COLLECTPOLL_INTERVAL, resolve, reject);
          }
        } catch {
          clearAuthQR();
          reject(BankIdRecommendedUsereMessages.RFA22);
        }
      };

      return new Promise(collectPoll);
    })
    .then((authorizationCode) => {
      setAuthCookie(authorizationCode as string);
      window.location.href = MYPAGES_URL;
    })
    .catch((error) => {
      statusElement.innerHTML = error;
    });

  return component;
};
