import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { APPROOT_PROFILE } from '../../constants';
import { getUser } from '../../services/api';
import { User } from '../../services/api/types';
import { AddList, Details, Loader, ToggleForm } from './components';
import { useAddList } from './hooks/useAddList';
import { getContactDetailsByType, getPrimaryContact } from './utils';

interface ProfileState {
  loading: boolean;
  user: User;
}

const Profile = () => {
  const [state, setState] = useState<ProfileState>({ loading: true, user: {} as User });
  const isMounted = useRef(false);
  const emailAddList = useAddList();
  const phoneAddList = useAddList();

  useEffect(() => {
    getUser().then((user) => {
      setState({ loading: false, user });
    });
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      emailAddList.save(getContactDetailsByType(state.user.contact, 'EMAIL'));
      phoneAddList.save(getContactDetailsByType(state.user.contact, 'PHONE'));
    } else {
      isMounted.current = true;
    }
  }, [state.user]);

  const onSubmitEmail = () => {
    /* Todo: Faked submit. Call put API and update with the response.  */
    const fakeResponse = {
      ...state.user,
      contact: [...getContactDetailsByType(state.user.contact, 'PHONE'), ...(emailAddList.contact ?? [])],
    };

    setState((currentState) => ({
      ...currentState,
      user: fakeResponse,
    }));
  };

  const onSubmitPhone = () => {
    /* Todo: Faked submit. Call put API and update with the response.  */
    const fakeResponse = {
      ...state.user,
      contact: [...getContactDetailsByType(state.user.contact, 'EMAIL'), ...(phoneAddList.contact ?? [])],
    };

    setState((currentState) => ({
      ...currentState,
      user: fakeResponse,
    }));
  };

  return (
    <div>
      {state.loading ? (
        <Loader />
      ) : (
        <div>
          <Details
            personalNumber={state.user.personalNumber}
            name={`${state.user.firstName} ${state.user.lastName}`}
            address={`${state.user.address.street}, ${state.user.address.postalCode} ${state.user.address.city}`}
          />
          <ToggleForm
            isChanged={emailAddList.isChanged()}
            icon="email"
            onSubmit={onSubmitEmail}
            onToggle={(open: boolean) => {
              emailAddList.showAddControls(!open);
            }}
            text={getPrimaryContact(getContactDetailsByType(state.user.contact, 'EMAIL'))?.value || 'E-post saknas'}>
            <AddList
              addList={emailAddList}
              type="EMAIL"
              textFieldAttrs={{
                'data-invalid-message': 'You need to add a valid E-mail',
                placeholder: 'email@email.com',
                required: true,
                pattern: '[^@\\s]+@[^@\\s]+\\.[^@\\s]+',
                autoComplete: 'e-mail',
              }}
            />
          </ToggleForm>

          <ToggleForm
            isChanged={phoneAddList.isChanged()}
            icon="phone"
            onSubmit={onSubmitPhone}
            onToggle={(open: boolean) => {
              phoneAddList.showAddControls(!open);
            }}
            text={
              getPrimaryContact(getContactDetailsByType(state.user.contact, 'PHONE'))?.value || 'Telefonnummer saknas'
            }>
            <AddList
              addList={phoneAddList}
              type="PHONE"
              textFieldAttrs={{
                'data-invalid-message': 'You need to add a valid number',
                required: true,
                pattern: '[0-9]+',
              }}
            />
          </ToggleForm>
        </div>
      )}
    </div>
  );
};

createRoot(document.querySelector(APPROOT_PROFILE) as Element).render(<Profile />);
