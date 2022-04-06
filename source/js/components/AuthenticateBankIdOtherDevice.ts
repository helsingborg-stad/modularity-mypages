import qrcode from 'qrcode';
import { auth, cancel, collect, getClientIp } from '../api';
import { SecondaryButton } from './SecondaryButton';
import { COLLECTPOLL_INTERVAL, MYPAGES_URL } from '../constants';
import { renderElement } from '../utils';

export const AuthenticateBankIdOtherDevice = (resetView: Function) => {
  const component = document.createElement('div');
  const abortButtonComponent = SecondaryButton('Avbryt', resetView);
  const statusElement = document.createElement('p');
  const qrContainer = document.createElement('div');
  component.setAttribute('class', 'u-margin__top--5 u-display--flex u-align-items--center u-flex-direction--column');
  component.appendChild(statusElement);
  component.appendChild(qrContainer);
  component.appendChild(abortButtonComponent);
  statusElement.textContent = 'Vänligen vänta...';

  const renderAuthQR = (code: string) => {
    const canvas = document.createElement('canvas');
    qrcode.toCanvas(canvas, code);
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
      statusElement.textContent = 'Väntar...';
      return orderRef;
    })
    .then((orderRef: string) => {
      const collectPoll = async (resolve: Function, reject: Function) => {
        try {
          const { status, authCode, hintCode } = await collect({ orderRef });
          if (hintCode !== 'userSign') {
            renderAuthQR(authCode);
          } else {
            clearAuthQR();
            statusElement.textContent = 'Väntar på signering...';
          }
          if (status === 'complete') {
            statusElement.textContent = 'Klart';
            resolve();
          } else {
            setTimeout(collectPoll, COLLECTPOLL_INTERVAL, resolve, reject);
          }
        } catch {
          statusElement.textContent = 'Något gick fel';
          clearAuthQR();
          reject();
        }
      };

      return new Promise(collectPoll);
    })
    .then(() => {
      window.location.href = MYPAGES_URL;
    });

  return component;
};
