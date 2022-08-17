import './styles.scss';

import { UseAddList } from '../../hooks/useAddList';
import { Form } from '../Form/Form';
import { Radiobutton } from '../RadioButton/RadioButton';
import { TextField } from '../TextField/TextField';

import { Contact, ContactType } from '../../../../services/api/types';

export const AddList = ({
  type,
  addList,
  textFieldAttrs,
}: {
  type: ContactType;
  addList: UseAddList;
  textFieldAttrs?: Record<string, string | boolean>;
}) => {
  const onRemove = (item: Contact) => {
    addList.remove(item);
  };

  const AddForm = (
    <Form
      onSubmit={() => {
        addList.add(addList.formData?.value ?? '', type, 'PRIVATE');
      }}>
      <div className="add-list__controls">
        <TextField
          onChange={addList.handleFormDataChange}
          value={addList.formData?.value ?? ''}
          name="value"
          label=""
          type="text"
          {...textFieldAttrs}
        />
        <button className="c-button c-button__filled c-button__filled--primary c-button--md" type="submit">
          <span className="c-button__label">
            <span className="c-button__label-text ">Lägg till</span>
          </span>
        </button>
      </div>
    </Form>
  );

  return (
    <div className="add-list">
      {addList.contact?.map((item, index) => {
        return (
          <div key={index} className="add-list__row">
            <Radiobutton id={item.id} value={item.value} checked={item.primary} onChange={addList.onPrimaryChanged} />
            <button
              onClick={() => onRemove(item)}
              className="c-button c-button__basic c-button__basic--primary c-button--md"
              type="button">
              <span className="c-button__label">
                <span className="c-button__label-icon c-button__label-icon--reverse">
                  <i className="c-icon  material-icons" translate="no" role="img">
                    close
                  </i>
                </span>
              </span>
            </button>
          </div>
        );
      })}
      {addList.addControls ? (
        AddForm
      ) : (
        <button
          className="add-list__toggle-button c-button c-button__basic c-button__basic--primary c-button--md"
          type="button"
          onClick={() => addList.showAddControls(true)}>
          <span className="c-button__label">
            <i className="c-icon c-icon--size-md material-icons" translate="no" role="img">
              add
            </i>
            <span className="c-button__label-text c-button__label-text--reverse">Lägg till</span>
          </span>
        </button>
      )}
    </div>
  );
};
