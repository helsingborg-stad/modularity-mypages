export interface Address {
  city: string;
  street: string;
  postalCode: string;
}

export type ContactType = 'EMAIL' | 'PHONE';

export type ContactCategory = 'WORK' | 'PRIVATE';

export interface Contact {
  id: string;
  type: ContactType;
  category: ContactCategory;
  primary: boolean;
  value: string;
  verified: boolean;
}

export interface User {
  lastName: string;
  personalNumber: string;
  civilStatus: string;
  createdAt: number;
  uuid: string;
  address: Address;
  firstName: string;
  contact: Contact[];
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
