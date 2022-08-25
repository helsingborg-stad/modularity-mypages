import { FormEvent, useState } from 'react';
import { Contact, ContactCategory, ContactType } from '../../../services/api/types';
import { isEmpty, isEqual } from '../utils';

export interface UseAddList {
  contact?: Contact[];
  formData?: { value?: string };
  addControls?: boolean;
  add: (value: string, type: ContactType, category: ContactCategory) => void;
  save: (contact: Contact[]) => void;
  remove: (item: Contact) => void;
  isChanged: () => boolean;
  onPrimaryChanged: (event: FormEvent<HTMLInputElement>) => void;
  showAddControls: (value: boolean) => void;
  handleFormDataChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useAddList = (): UseAddList => {
  const [state, setState] = useState<{
    orginal: Contact[];
    contact: Contact[];
    addControls: boolean;
    formData: { value?: string };
  }>();

  const add = (value: string, type: ContactType, category: ContactCategory) => {
    setState((currentState) => {
      if (currentState) {
        if (isEmpty(currentState.formData.value)) {
          return;
        }

        if (currentState.contact.find((item) => item.value === value)) {
          return;
        }

        currentState.contact.push({
          id: Math.random().toString(36).substring(3, 9),
          value,
          type,
          category,
          primary: false,
          verified: false,
        });

        return { ...currentState, formData: {}, addControls: false };
      }
    });
  };

  const remove = (item: Contact) => {
    setState((currentState) => {
      if (currentState) {
        currentState.contact.splice(currentState?.contact.indexOf(item), 1);
        return { ...currentState };
      }
    });
  };

  const save = (contact: Contact[]) => {
    setState({
      formData: {},
      orginal: contact,
      addControls: false,
      contact: JSON.parse(JSON.stringify(contact)),
    });
  };

  const showAddControls = (value: boolean) => {
    setState((currentState) => {
      if (currentState) {
        return {
          ...currentState,
          addControls: value,
        };
      }
    });
  };

  const isChanged = () => isEqual(state?.orginal, state?.contact);

  const onPrimaryChanged = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    setState((currentState) => {
      if (currentState) {
        currentState.contact.map((item) => {
          item.primary = item.value === value;
        });

        return { ...currentState };
      }
    });
  };

  const handleFormDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((currentState) => {
      if (currentState) {
        return { ...currentState, formData: { ...currentState.formData, [event.target.name]: event.target.value } };
      }
    });
  };

  return {
    contact: state?.contact,
    formData: state?.formData,
    addControls: state?.addControls,
    add,
    save,
    remove,
    isChanged,
    onPrimaryChanged,
    showAddControls,
    handleFormDataChange,
  };
};
