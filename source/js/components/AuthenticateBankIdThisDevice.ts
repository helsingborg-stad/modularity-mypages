import { auth, cancel, collect, getClientIp } from '../api';
import { SecondaryButton } from './SecondaryButton';
import { COLLECTPOLL_INTERVAL, MYPAGES_URL } from '../constants';
import { BankIdStatus, getBankIdRecommendedUsereMessage, inProgress } from '../utils/bankid-message';
import { isMobileDevice, setAuthCookie } from '../utils';
import { Loader } from './Loader';

export const AuthenticateBankIdThisDevice = (resetView: Function) => {
  const component = document.createElement('div');
  const abortButtonComponent = SecondaryButton('Avbryt', resetView);
  const statusElement = document.createElement('p');
  component.setAttribute('class', 'u-margin__top--5 u-display--flex u-align-items--center u-flex-direction--column');
  component.appendChild(statusElement);
  component.appendChild(abortButtonComponent);
  statusElement.appendChild(Loader('Laddar...'));

  getClientIp()
    .then((endUserIp) => auth({ endUserIp }))
    .then(({ autoStartToken, orderRef }) => {
      abortButtonComponent.addEventListener('click', () => {
        cancel({ orderRef });
        return Promise.reject();
      });
      window.location.replace(`bankid:///?autostarttoken=${autoStartToken}&redirect=null`);
      return orderRef;
    })
    .then((orderRef: string) => {
      const collectPoll = async (resolve: Function, reject: Function) => {
        try {
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
            statusElement.innerHTML = statusMessage;
            setTimeout(collectPoll, COLLECTPOLL_INTERVAL, resolve, reject);
          } else {
            reject(statusMessage);
          }
        } catch (error) {
          statusElement.innerHTML = error as string;
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
