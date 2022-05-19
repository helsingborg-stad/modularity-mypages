import { API_KEY, API_URL, AUTHENTICATION_URL, MYPAGES_URL } from './constants';
import { htmlToElement } from './utils/dom';
import { getAuthorizationCookie, removeAuthorizationCookie } from './utils/session';
export interface Address {
  city: string;
  street: string;
  postalCode: string;
}

export interface User {
  mobilePhone: string;
  lastName: string;
  personalNumber: string;
  civilStatus: string;
  createdAt: number;
  uuid: string;
  address: Address;
  email: string;
  firstName: string;
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
