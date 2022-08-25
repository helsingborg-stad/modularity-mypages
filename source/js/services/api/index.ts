import { getAuthorizationCookie, removeAuthorizationCookie } from '../../utils/session';
import { API_KEY, API_URL, AUTHENTICATION_URL, MYPAGES_URL } from '../../constants';
import { htmlToElement } from '../../utils/dom';
import { Case, Profile } from './types';

const userMock: Profile = {
  lastName: 'Walldèn',
  personalNumber: '193504049135',
  civilStatus: 'OG',
  createdAt: 1635423159911,
  uuid: 'DE35BE68-D5C4-4467-BE46-BA8F5A5B5B71',
  address: { city: 'STOCKHOLM', street: 'PACKHUSGRÄND 2', postalCode: '11130' },
  firstName: 'Filip',
  contact: [
    {
      id: '6434345',
      type: 'EMAIL',
      category: 'PRIVATE',
      primary: true,
      value: 'Filip@private.se',
      verified: true,
    },
    {
      id: '23452351',
      type: 'PHONE',
      category: 'PRIVATE',
      primary: true,
      value: '0798182818',
      verified: true,
    },
    {
      id: '967832',
      type: 'EMAIL',
      category: 'WORK',
      primary: false,
      value: 'Filip@work.se',
      verified: true,
    },
    {
      id: '6585673',
      type: 'PHONE',
      category: 'WORK',
      primary: false,
      value: '0798182866',
      verified: true,
    },
  ],
};

const defaultHeaders = {
  'x-api-key': API_KEY,
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

export const getProfile = () => {
  return Promise.resolve(userMock);
};

export const getUser = () => {
  return fetch(`${API_URL}users/me`, {
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

export const putUser = (putUserRequestBody: { email: string; mobilePhone: string }) => {
  return fetch(`${API_URL}users/me`, {
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

export const getTasks = (): Promise<{ archive: Case[]; current: Case[] }> => {
  return fetch(`${API_URL}cases/list`, {
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
      return response.data;
    })
    .catch((error) => {
      handleError(error);
    });
};

export const login = () => {
  const callbackUrl = new URL(window.location.origin + AUTHENTICATION_URL);
  callbackUrl.searchParams.set('callbackUrl', window.location.origin + MYPAGES_URL);
  return fetch(`${API_URL}auth/login`, {
    method: 'POST',
    body: JSON.stringify({ callbackUrl }),
    headers: new Headers(defaultHeaders),
  })
    .then((response) => response.json())
    .then((response) => {
      return response.data;
    });
};

export const logout = (sessionId: string) => {
  return fetch(`${API_URL}auth/logout`, {
    method: 'POST',
    body: JSON.stringify({ sessionId }),
    headers: new Headers(defaultHeaders),
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    });
};

export const session = (sessionId: string) => {
  return fetch(`${API_URL}auth/session`, {
    method: 'POST',
    body: JSON.stringify({ sessionId }),
    headers: new Headers(defaultHeaders),
  })
    .then((response) => response.json())
    .then((response) => {
      return response.data;
    });
};
