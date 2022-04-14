import { domElements, main } from '../profile';
import { getUser, putUser } from '../../../api';

jest.mock('../../../api');

const mockedGetUser = jest.mocked(getUser);
const mockedPutUser = jest.mocked(putUser);

beforeEach(() => {
  jest.resetAllMocks();

  document.body.innerHTML = `
    <div data-mypages-profile-loader></div>
    <div data-mypages-profile-notice class="u-display--none'"></div>
    <form data-mypages-profile-form class="u-display--none">
      <input data-mypages-profile-field-email data-invalid-message="Invalid mail"></input>
      <input data-mypages-profile-field-phone data-invalid-message="Invalid phone"></input>
      <button data-mypages-profile-submit></button>
    </form>
  `;

  mockedGetUser.mockResolvedValue({
    email: 'email@email.com',
    mobilePhone: '123',
  });
  mockedPutUser.mockResolvedValue({});
});

it('configures form attributes', () => {
  const { form } = domElements(document);
  main(document);

  expect(form.autocomplete).toEqual('on');
});

it('configures emailinput attributes', () => {
  const { emailInput } = domElements(document);
  main(document);

  expect(emailInput.required).toEqual(true);
  expect(emailInput.pattern).toEqual('[^@\\s]+@[^@\\s]+\\.[^@\\s]+');
  expect(emailInput.autocomplete).toEqual('e-mail');
});

it('configures phoneinput attributes', () => {
  const { phoneInput } = domElements(document);
  main(document);

  expect(phoneInput.type).toEqual('text');
  expect(phoneInput.required).toEqual(false);
  expect(phoneInput.pattern).toEqual('[0-9]+');
});

it('configures submitbutton attributes', () => {
  const { submitButton } = domElements(document);
  main(document);

  expect(submitButton.type).toEqual('submit');
});

it('displays a loader when fetching user data', () => {
  main(document);

  const { loader, form } = domElements(document);

  expect(form.classList.contains('u-display--none')).toBeTruthy();
  expect(loader.classList.contains('u-display--none')).toBeFalsy();
});

it('displays form when fetching user data is complete', async () => {
  await main(document);

  const { loader, form } = domElements(document);

  expect(form.classList.contains('u-display--none')).toBeFalsy();
  expect(loader.classList.contains('u-display--none')).toBeTruthy();
});

it('calls getUser and populates email & phone fields with data', async () => {
  await main(document);

  const { emailInput, phoneInput } = domElements(document);

  expect(getUser).toHaveBeenCalledWith();
  expect(emailInput.value).toEqual('email@email.com');
  expect(phoneInput.value).toEqual('123');
});

it('calls setCustomValidity when email input is invalid', async () => {
  await main(document);

  const { emailInput } = domElements(document);
  emailInput.setCustomValidity = jest.fn();
  emailInput.dispatchEvent(new Event('invalid'));

  expect(emailInput.setCustomValidity).toHaveBeenCalledWith('Invalid mail');
});

it('resets setCustomValidity when email input is blured', async () => {
  await main(document);

  const { emailInput } = domElements(document);
  emailInput.setCustomValidity = jest.fn();
  emailInput.dispatchEvent(new Event('blur'));

  expect(emailInput.setCustomValidity).toHaveBeenCalledWith('');
});

it('calls setCustomValidity when phone input is invalid', async () => {
  await main(document);

  const { phoneInput } = domElements(document);
  phoneInput.setCustomValidity = jest.fn();
  phoneInput.dispatchEvent(new Event('invalid'));

  expect(phoneInput.setCustomValidity).toHaveBeenCalledWith('Invalid phone');
});

it('resets setCustomValidity when phone input is blured', async () => {
  await main(document);

  const { phoneInput } = domElements(document);
  phoneInput.setCustomValidity = jest.fn();
  phoneInput.dispatchEvent(new Event('blur'));

  expect(phoneInput.setCustomValidity).toHaveBeenCalledWith('');
});

it('calls putUser when form submits with changed data', async () => {
  await main(document);

  const { emailInput, form } = domElements(document);
  emailInput.value = 'new@email.com';
  form.dispatchEvent(new Event('submit'));

  expect(putUser).toHaveBeenCalledWith({
    email: 'new@email.com',
    mobilePhone: '123',
  });
});

it('does not call putUser when form submits with unchanged data', async () => {
  await main(document);

  const { form } = domElements(document);
  form.dispatchEvent(new Event('submit'));

  expect(putUser).not.toHaveBeenCalled();
});

it('shows a confirmation message when submit succedes', async () => {
  await main(document);

  const { submitedNotice, emailInput, form } = domElements(document);

  emailInput.value = 'new@email.com';
  form.dispatchEvent(new Event('submit'));

  expect(submitedNotice.classList.contains('u-display--none')).toBeFalsy();
});

it('hides confirmation message if formdata changes', async () => {
  await main(document);

  const { submitedNotice, emailInput, form } = domElements(document);

  emailInput.value = 'new@email.com';
  form.dispatchEvent(new Event('submit'));
  form.dispatchEvent(new Event('input'));

  expect(submitedNotice.classList.contains('u-display--none')).toBeTruthy();
});
