import qrcode from 'qrcode';
import { auth, cancel, collect, getClientIp } from '../../../api';
import { COLLECTPOLL_INTERVAL, MYPAGES_URL } from '../../../constants';
import { htmlToElement, isMobileDevice, renderElement, setAuthorizationCookie } from '../../../utils/dom';
import { BankIdHintCode, BankIdStatus, getBankIdRecommendedUsereMessage, inProgress } from '../../../utils/bankid';

export const AuthenticateBankIdOtherDevice = (resetView: Function) => {
  const component = htmlToElement<HTMLDivElement>(myPagesComponents['authentication-bankid'].html);
  const qrContainer = component.querySelector('[data-mypages-login-qr]') as HTMLDivElement;
  const statusContainer = component.querySelector('[data-mypages-login-status]') as HTMLParagraphElement;
  const loader = component.querySelector('[data-mypages-login-loader]') as HTMLElement;
  const abortButton = component.querySelector('[data-mypages-login-abort]') as HTMLButtonElement;

  abortButton.addEventListener('click', () => resetView());

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
      let timeout: NodeJS.Timeout;

      component.removeChild(loader);

      abortButton.addEventListener('click', () => {
        clearTimeout(timeout);
        cancel({ orderRef });
      });

      const collectPoll = async (resolve: Function, reject: Function) => {
        const { status, authCode, hintCode, errorCode, authorizationCode } = await collect({ orderRef });

        const statusMessage = getBankIdRecommendedUsereMessage({
          authUsingQR: true,
          mobileDevice: isMobileDevice(),
          errorCode,
          hintCode,
          status,
        });

        if (status === BankIdStatus.COMPLETE) {
          resolve(authorizationCode);
        }

        if (hintCode === BankIdHintCode.USER_SIGN) {
          clearAuthQR();
        } else {
          renderAuthQR(authCode);
        }

        if (inProgress(statusMessage)) {
          statusContainer.textContent = statusMessage;
          timeout = setTimeout(collectPoll, COLLECTPOLL_INTERVAL, resolve, reject);
        } else {
          reject(statusMessage);
        }
      };

      return new Promise(collectPoll);
    })
    .then((authorizationCode) => {
      setAuthorizationCookie(authorizationCode as string);
      window.location.href = MYPAGES_URL;
    })
    .catch((error) => {
      clearAuthQR();
      statusContainer.innerHTML = error;
    });

  return component;
};
