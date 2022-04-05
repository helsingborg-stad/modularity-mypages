import { auth, collect, getClientIp } from '../api';
import { SecondaryButton } from './SecondaryButton';
import { COLLECTPOLL_INTERVAL, MYPAGES_URL } from '../constants';

export const AuthenticateBankIdThisDevice = (resetView: Function) => {
  const component = document.createElement('div');
  const abortButtonComponent = SecondaryButton('Avbryt', resetView);
  const statusElement = document.createElement('p');
  component.setAttribute('class', 'u-margin__top--5 u-display--flex u-align-items--center u-flex-direction--column');
  component.appendChild(statusElement);
  component.appendChild(abortButtonComponent);
  statusElement.textContent = 'Vänligen vänta...';

  getClientIp()
    .then((endUserIp) => auth({ endUserIp }))
    .then(({ autoStartToken, orderRef }) => {
      abortButtonComponent.addEventListener('click', () => {
        // Cancel request with orderRef
      });
      window.location.replace(`bankid:///?autostarttoken=${autoStartToken}&redirect=null`);
      statusElement.textContent = 'Försöker starta bankid...';
      return orderRef;
    })
    .then((orderRef: string) => {
      const collectPoll = async (resolve: Function, reject: Function) => {
        try {
          const { status, hintCode } = await collect({ orderRef });
          if (hintCode === 'userSign') {
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
