import { getUser, putUser } from '../../api';
import { getInputValue, hideElement, setInputValue, showElement } from '../../utils/dom';

const main = () => {
  let user: Record<string, string>;
  let inFlight: boolean = false;

  const form = document.querySelector('[data-mypages-profile-form]') as HTMLFormElement;
  const loader = document.querySelector('[data-mypages-profile-loader]') as HTMLElement;
  const submitedNotice = document.querySelector('[data-mypages-profile-notice]') as HTMLElement;
  const submitButton = document.querySelector('[data-mypages-profile-submit]') as HTMLButtonElement;
  const emailInput = document.querySelector('[data-mypages-profile-field-email]') as HTMLInputElement;
  const phoneInput = document.querySelector('[data-mypages-profile-field-phone]') as HTMLInputElement;

  const loadUserData = async () => {
    user = await getUser();
    setInputValue(emailInput, user.email);
    setInputValue(phoneInput, user.mobilePhone);
    showElement(form);
    hideElement(loader);
  };

  const submit = async () => {
    const body = {
      email: getInputValue(emailInput),
      mobilePhone: getInputValue(phoneInput),
    };

    if (inFlight || JSON.stringify({ email: user.email, mobilePhone: user.mobilePhone }) === JSON.stringify(body)) {
      return;
    }

    inFlight = true;

    try {
      await putUser(body);
      showElement(submitedNotice);
      inFlight = false;
    } catch {
      inFlight = false;
    }
  };

  const configureForm = (element: HTMLFormElement) => {
    element.autocomplete = 'on';
    element.onsubmit = (event) => {
      event.preventDefault();
      submit();
    };
  };

  const configureSubmitButton = (element: HTMLButtonElement) => {
    element.type = 'submit';
  };

  const configureEmailInput = (element: HTMLInputElement) => {
    element.required = true;
    element.pattern = '[^@\\s]+@[^@\\s]+\\.[^@\\s]+';
    element.autocomplete = 'e-mail';
    element.oninvalid = (event) => {
      (<HTMLInputElement>event.target).setCustomValidity(element.getAttribute('data-invalid-message') ?? '');
    };
    element.onblur = (event) => {
      (<HTMLInputElement>event.target).setCustomValidity('');
    };
    element.oninput = () => {
      hideElement(submitedNotice);
    };
  };

  const configurePhoneInput = (element: HTMLInputElement) => {
    element.type = 'text';
    element.required = false;
    element.pattern = '[0-9]+';
    element.oninvalid = (event) => {
      (<HTMLInputElement>event.target).setCustomValidity(element.getAttribute('data-invalid-message') ?? '');
    };
    element.onblur = (event) => {
      (<HTMLInputElement>event.target).setCustomValidity('');
      hideElement(submitedNotice);
    };
    element.oninput = () => {
      hideElement(submitedNotice);
    };
  };

  configureForm(form);
  configureEmailInput(emailInput);
  configurePhoneInput(phoneInput);
  configureSubmitButton(submitButton);

  loadUserData();
};

main();
