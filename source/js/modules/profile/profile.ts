import { getUser, putUser } from '../../api';
import { getInputValue, hideElement, setInputValue, showElement } from '../../utils/dom';

enum DomSelectors {
  FORM = '[data-mypages-profile-form]',
  LOADER = '[data-mypages-profile-loader]',
  SUBMIT_BUTTON = '[data-mypages-profile-submit]',
  SUBMITED_NOTICE = '[data-mypages-profile-notice]',
  EMAIL_INPUT = '[data-mypages-profile-field-email]',
  PHONE_INPUT = '[data-mypages-profile-field-phone]',
}

export const domElements = (dom: Document) => {
  const form = dom.querySelector(DomSelectors.FORM) as HTMLFormElement;
  const loader = dom.querySelector(DomSelectors.LOADER) as HTMLElement;
  const submitedNotice = dom.querySelector(DomSelectors.SUBMITED_NOTICE) as HTMLElement;
  const submitButton = dom.querySelector(DomSelectors.SUBMIT_BUTTON) as HTMLButtonElement;
  const emailInput = dom.querySelector(DomSelectors.EMAIL_INPUT) as HTMLInputElement;
  const phoneInput = dom.querySelector(DomSelectors.PHONE_INPUT) as HTMLInputElement;

  return { form, loader, submitedNotice, submitButton, emailInput, phoneInput };
};

export const main = async (dom: Document) => {
  let user: Record<string, string>;
  let inFlight: boolean = false;

  const { form, loader, submitedNotice, submitButton, emailInput, phoneInput } = domElements(dom);

  const loadUserData = async () => {
    user = await getUser();

    setInputValue(emailInput, user.email);
    setInputValue(phoneInput, user.mobilePhone);
    showElement(form);
    hideElement(loader);
  };

  const submit = async (event: Event) => {
    event.preventDefault();

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
      user = Object.assign(user, body);
      inFlight = false;
    } catch {
      inFlight = false;
    }
  };

  const configureForm = (element: HTMLFormElement) => {
    element.autocomplete = 'on';

    element.addEventListener('submit', submit);
    element.addEventListener('input', () => {
      hideElement(submitedNotice);
    });
  };

  const configureSubmitButton = (element: HTMLButtonElement) => {
    element.type = 'submit';
  };

  const configureEmailInput = (element: HTMLInputElement) => {
    element.required = true;
    element.pattern = '[^@\\s]+@[^@\\s]+\\.[^@\\s]+';
    element.autocomplete = 'e-mail';

    element.addEventListener('invalid', (event) => {
      (<HTMLInputElement>event.target).setCustomValidity(element.getAttribute('data-invalid-message') ?? '');
    });
    element.addEventListener('blur', (event) => {
      (<HTMLInputElement>event.target).setCustomValidity('');
    });
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
  };

  configureForm(form);
  configureEmailInput(emailInput);
  configurePhoneInput(phoneInput);
  configureSubmitButton(submitButton);

  await loadUserData();
};
