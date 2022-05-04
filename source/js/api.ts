import { htmlToElement } from './utils/dom';
import { getAuthorizationCookie, removeAuthorizationCookie } from './utils/session';

const baseURL = 'https://e0rmbakcci.execute-api.eu-north-1.amazonaws.com/dev/';
const apiKey = 'XV1z4BJs9p8b6GliroylfQfDtsKPZuB6XItJwq5b';

interface AuthRequestBody {
  endUserIp: string;
}

interface CollectRequestBody {
  orderRef: string;
}

interface CancelRequestBody {
  orderRef: string;
}

interface User {
  email: string;
  mobilePhone: string;
}

export interface Taskmodel {
  type: string;
  title: string;
  complete: boolean;
  lastUpdated: string;
  history: string;
  info?: string;
  status?: string;
}

const defaultHeaders = {
  'x-api-key': apiKey,
};

const authorizationHeaders = {
  Authorization: `Bearer ${getAuthorizationCookie()}`,
};

const handleError = (error: Error) => {
  switch (error.message) {
    case '401':
      removeAuthorizationCookie();
      location.reload();
      break;
    default:
      break;
  }
};

export const getClientIp = () => {
  //TODO: Get user IP somehow
  return Promise.resolve('127.0.0.0');
};

export const auth = (authRequestBody: AuthRequestBody) => {
  return fetch(`${baseURL}auth/bankid/auth`, {
    method: 'POST',
    body: JSON.stringify(authRequestBody),
    headers: new Headers(defaultHeaders),
  })
    .then((response) => response.json())
    .then((response) => {
      return response.data.attributes;
    });
};

export const collect = (collectRequestBody: CollectRequestBody) => {
  return fetch(`${baseURL}auth/bankid/collect`, {
    method: 'POST',
    body: JSON.stringify(collectRequestBody),
    headers: new Headers(defaultHeaders),
  })
    .then((response) => response.json())
    .then((response) => {
      return response.data.attributes;
    });
};

export const cancel = (cancelRequestBody: CancelRequestBody) => {
  return fetch(`${baseURL}auth/bankid/cancel`, {
    method: 'POST',
    body: JSON.stringify(cancelRequestBody),
    headers: new Headers(defaultHeaders),
  })
    .then((response) => response.json())
    .then((response) => {
      return response.data.attributes;
    });
};

export const getUser = () => {
  return fetch(`${baseURL}users/me`, {
    method: 'GET',
    headers: new Headers({ ...defaultHeaders, ...authorizationHeaders }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status.toString());
      }
      return response.json();
    })
    .then((response) => {
      return response.data.attributes;
    })
    .catch((error) => {
      handleError(error);
    });
};

export const putUser = (putUserRequestBody: User) => {
  return fetch(`${baseURL}users/me`, {
    method: 'PUT',
    body: JSON.stringify(putUserRequestBody),
    headers: new Headers({ ...defaultHeaders, ...authorizationHeaders }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status.toString());
      }
      return response.json();
    })
    .then((response) => {
      return response.data.attributes;
    })
    .catch((error) => {
      handleError(error);
    });
};

export const getComponent = (component: string, options: Record<string, string>) => {
  return fetch('/wp-json/modularity-mypages/v1/getComponentButton?' + new URLSearchParams(options), {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((response) => {
      return htmlToElement(response.html);
    });
};

export const getTasks = (): Promise<Taskmodel[]> => {
  return Promise.resolve([
    {
      title: 'Ekonomiskt bistånd',
      complete: false,
      lastUpdated: 'Senast uppdaterad 19 april',
      type: 'account',
      status: 'Öppen',
      history:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis libero sed dui tempus malesuada. Duis vulputate consequat placerat. Fusce convallis posuere enim at lobortis. ',
    },
    {
      title: 'Uppdatera din profil',
      complete: false,
      lastUpdated: 'Senast uppdaterad 20 januari',
      type: 'account',
      info: 'För att vi ska kunna ge dig bra service, så vill vi gärna ha mer information om dig.',
      history:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis libero sed dui tempus malesuada. Duis vulputate consequat placerat. Fusce convallis posuere enim at lobortis. ',
    },
    {
      title: 'Ekonomiskt bistånd',
      complete: true,
      lastUpdated: 'Senast uppdaterad 25 mars',
      type: 'account',
      status: 'Utbetald',
      history:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis libero sed dui tempus malesuada. Duis vulputate consequat placerat. Fusce convallis posuere enim at lobortis. ',
    },
  ]);
};
