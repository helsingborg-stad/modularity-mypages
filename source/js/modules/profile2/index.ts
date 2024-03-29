import { flyg } from 'flyg';
import { Form } from '../../common/components/Form';
import { Notice } from '../../common/components/Notice';
import { renderElement } from '../../utils/dom';
import { EmailTextField } from './components/EmailTextField';
import { MobileTextField } from './components/MobileTextField';
import { SubmitButton } from './components/SubmitButton';
import { getUser, putUser } from '../../services/api';
import { User } from '../../services/api/types';
import { APPROOT_PROFILE_2 } from '../../constants';

const ProfileForm = (data: User) => {
  let inFlight = false;

  const successNotice = Notice({ text: 'Account setting saved.' });
  const emailTextField = EmailTextField(data.email);
  const phoneTextField = MobileTextField(data.mobilePhone);
  const submitButton = SubmitButton();

  const content = flyg<HTMLElement>`
    <div>
      ${successNotice}
      <div class="o-grid">
        <div class="o-grid-12">
          ${emailTextField.component}
        </div>
        <div class="o-grid-12">
          ${phoneTextField.component}
        </div>
        <div class="o-grid-12">
          ${submitButton}
        </div>
      </div>
    <div>`;

  const onSubmit = async () => {
    const body = {
      email: emailTextField.actions.getValue(),
      mobilePhone: phoneTextField.actions.getValue(),
    };

    if (inFlight || JSON.stringify({ email: data.email, mobilePhone: data.mobilePhone }) === JSON.stringify(body)) {
      return;
    }

    inFlight = true;

    try {
      await putUser(body);
      successNotice.classList.remove('u-display--none');
      data = Object.assign(data, body);
      inFlight = false;
    } catch {
      inFlight = false;
    }
  };

  const component = Form({
    content,
    onInput: () => {
      successNotice.classList.add('u-display--none');
    },
    onSubmit,
  });

  successNotice.classList.add('u-display--none');

  return component;
};

export const main = () => {
  const ghost = flyg<HTMLElement>`
    <div>
      <div class="o-grid">
        <div class="o-grid-12">
          <div class="ghost textfield"></div>
        </div>
        <div class="o-grid-12">
          <div class="ghost textfield"></div>
        </div>
        <div class="o-grid-12">
          <div class="ghost button"></div>
        </div>
      </div>
    <div>
  `;
  const component = flyg<HTMLElement>`
    <div class="c-paper c-paper--padding-3">${ghost}</div>
  `;

  getUser().then((data) => {
    component.replaceChild(ProfileForm(data), ghost);
  });

  return component;
};

(() => {
  renderElement(main(), APPROOT_PROFILE_2);
})();
