const baseURL = 'https://5562c8y5qb.execute-api.eu-north-1.amazonaws.com/dev/';
const apiKey = 'XV1z4BJs9p8b6GliroylfQfDtsKPZuB6XItJwq5b';

interface AuthRequestBody {
  endUserIp: string;
}

interface CollectRequestBody {
  orderRef: string;
}

const defaultHeaders = {
  'x-api-key': apiKey,
  'user-agent': 'MittHelsingborg',
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
