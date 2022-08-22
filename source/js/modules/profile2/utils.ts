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

export function phoneNumberFormatter(str: string): string {
  return str.replace(/^(\d{3})(\d{3})(\d{2})(\d{2})$/, '$1-$2 $3 $4');
}

export function personalNumberFormatter(str: string): string {
  return str.replace(/^(\d{8})(\d{4})$/, '$1-$2');
}
