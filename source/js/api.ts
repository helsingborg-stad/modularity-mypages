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

export interface Citizen {
  HasSigned: boolean;
  IsCoApplicant: boolean;
  UserIdentity: string;
  FirstName: string;
  LastName: string;
  StreetAddress: string;
  PostalCode: string;
  City: string;
  AltStreetAddress: string;
  AltPostalCode: string;
  AltCity: string;
  Email: string;
  HomePhone: string;
  MobilePhone: string;
  MunicipalityCode: string;
  BirthPlaceCountyCode?: any;
  BirthPlaceCommunity?: any;
  BirthPlaceOverSeaCity?: any;
  BirthPlaceOverSeaCountry?: any;
  MaritalStatusCode?: any;
  HasProtectedIdentity: boolean;
  HasProtectedIdentityCivilRegister: boolean;
}

export interface Signature {
  Date: Date;
  SignatureData: string;
  Issuer: string;
  UserIdentity: string;
}

export interface Attachment {
  Type: string;
  FileName: string;
  SystemFileName: string;
  FileType: string;
  FileDescription: string;
  FileDefinition?: any;
  DateUploaded: Date;
  FileSize: number;
  Content: string;
  FieldId: string;
  Arguments: any[];
  ServedByCitizens: any[];
  DecisionId?: any;
  FileDefinitionDisplayed?: any;
  SupplementId?: any;
  SupplementCitizenComment?: any;
}

export interface Case {
  Id: string;
  DiaryNumber: string;
  DateSubmitted: Date;
  CurrentStateDate: Date;
  Ombudsman?: any;
  SentInAs: string;
  RequiresMultipleSignatures: boolean;
  Status: string;
  ServiceId: string;
  ServiceName: string;
  ServiceVersion: number;
  ServiceStatuses: string[];
  Citizens: Citizen[];
  Signatures: Signature[];
  Payments: any[];
  QueueItems: any[];
  Fields: any[];
  Attachments: Attachment[];
  GroupId?: any;
  OrganisationName: string;
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

export const getTasks = (): Promise<{ archive: Case[]; current: Case[] }> => {
  return fetch(`${baseURL}cases/list`, {
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
