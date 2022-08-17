import { Contact, ContactType } from '../../services/api/types';

const isEqualLodash = require('lodash.isequal');

export const isEqual = (a: unknown, b: unknown) => isEqualLodash(a, b);

export const getContactDetailsByType = (list: Contact[], type: ContactType) => {
  return list.filter((item) => item.type === type);
};

export const getPrimaryContact = (list: Contact[]) => {
  return list.find((item) => item.primary);
};

export function isSet<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null;
}

export function isEmpty(value?: string): boolean {
  return !isSet(value) || value === '';
}
