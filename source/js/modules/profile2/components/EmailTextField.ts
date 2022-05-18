import { TextField } from '../../../common/components/TextField';

export const EmailTextField = (value: string) =>
  TextField({
    id: 'mypages-profile-email',
    label: 'Email',
    attrs: [
      { value },
      { 'data-invalid-message': 'You need to add a valid E-mail' },
      { placeholder: 'email@email.com' },
      { required: 'true' },
      { pattern: '[^@\\s]+@[^@\\s]+\\.[^@\\s]+' },
      { autocomplete: 'e-mail' },
    ],
  });
