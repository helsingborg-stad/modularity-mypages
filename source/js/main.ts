import qrcode from 'qrcode';
import { auth, collect, getClientIp } from './api';
import { renderElement } from './dom-utils';

const main = () => {
  const getSelectedAuthMethod = () => {
    return document.querySelector<HTMLInputElement>('#auth-method-select select')?.value;
  };

  const renderAuthQR = (code: string) => {
    const canvas = document.createElement('canvas');
    qrcode.toCanvas(canvas, code);
    renderElement(canvas, '#qr-container');
  };

  const renderStatus = (status: string) => {
    const p = document.createElement('p');
    p.innerHTML = status;
    renderElement(p, '#status');
  };

  const checkSomething = (orderRef: string) => {
    return new Promise<void>((resolve, reject) => {
      let interval: NodeJS.Timer;
      interval = setInterval(async () => {
        try {
          const response = await collect({ orderRef });
          const status = response.data.attributes.status;
          const qr = response.data.attributes.authCode;
          const hintCode = response.data.attributes.hintCode;

          if (hintCode !== 'userSign') {
            renderAuthQR(qr);
          } else {
            renderAuthQR('');
          }

          renderStatus(status);
          if (status === 'complete') {
            clearInterval(interval);
            resolve();
          }
        } catch {
          renderAuthQR('');
          clearInterval(interval);
          renderStatus('Something went wrong :(');
          reject();
        }
      }, 2000);
    });
  };

  const onAuthContinue = async () => {
    const value = getSelectedAuthMethod();
    if (value === 'mbid') {
      renderStatus('Starting...');
      const endUserIp = await getClientIp();
      const { orderRef, autoStartToken } = await auth({ endUserIp });

      const button = document.createElement('a');
      button.setAttribute('href', `bankid:///?autostarttoken=${autoStartToken}&redirect=`);
      button.innerHTML = 'Öppna bankid på denna enheten';

      renderElement(button, '#open-bankid');

      await checkSomething(orderRef);

      window.location.href = '/mina-sidor/?authenticated=true';
    }
  };

  const registerEventListners = () => {
    document.querySelector('#auth-continue')?.addEventListener('click', onAuthContinue);
  };

  registerEventListners();
};

main();
