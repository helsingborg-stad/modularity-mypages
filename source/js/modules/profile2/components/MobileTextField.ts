import { TextField } from '../../../common/components/TextField';

export const MobileTextField = (value: string) =>
  TextField({
    id: 'mypages-profile-phone',
    label: 'Phone',
    attrs: [
      { value },
      { 'data-invalid-message': 'You need to add a valid number' },
      { required: 'true' },
      { pattern: '[0-9]+' },
      { type: 'text' },
    ],
  });
