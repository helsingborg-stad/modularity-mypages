import { auth, cancel, collect, getClientIp } from '../api';
import { COLLECTPOLL_INTERVAL, MYPAGES_URL } from '../constants';
import { BankIdStatus, getBankIdRecommendedUsereMessage, inProgress } from '../utils/bankid-message';
import { htmlToElement, isMobileDevice, setAuthCookie } from '../utils';

export const AuthenticateBankIdThisDevice = (resetView: Function) => {
  const component = htmlToElement<HTMLDivElement>(myPagesComponents['authentication-bankid'].html);
  const statusContainer = component.querySelector('[data-mypages-login-status]') as HTMLParagraphElement;
  const loader = component.querySelector('[data-mypages-login-loader]') as HTMLElement;
  const abortButton = component.querySelector('[data-mypages-login-abort]') as HTMLButtonElement;

  abortButton.addEventListener('click', () => resetView());

  getClientIp()
    .then((endUserIp) => auth({ endUserIp }))
    .then(({ autoStartToken, orderRef }) => {
      let timeout: NodeJS.Timeout;

      component.removeChild(loader);

      abortButton.addEventListener('click', () => {
        clearTimeout(timeout);
        cancel({ orderRef });
      });

      window.location.replace(`bankid:///?autostarttoken=${autoStartToken}&redirect=null`);

      const collectPoll = async (resolve: Function, reject: Function) => {
        const { status, hintCode, errorCode, authorizationCode } = await collect({ orderRef });

        const statusMessage = getBankIdRecommendedUsereMessage({
          authUsingQR: false,
          mobileDevice: isMobileDevice(),
          errorCode,
          hintCode,
          status,
        });

        if (status === BankIdStatus.COMPLETE) {
          resolve(authorizationCode);
        }

        if (inProgress(statusMessage)) {
          statusContainer.innerHTML = statusMessage;
          timeout = setTimeout(collectPoll, COLLECTPOLL_INTERVAL, resolve, reject);
        } else {
          reject(statusMessage);
        }
      };

      return new Promise(collectPoll);
    })
    .then((authorizationCode) => {
      setAuthCookie(authorizationCode as string);
      window.location.href = MYPAGES_URL;
    })
    .catch((error) => {
      statusContainer.innerHTML = error;
    });

  return component;
};
