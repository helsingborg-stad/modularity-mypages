import './style.scss';

export const Details = ({
  name,
  personalNumber,
  address,
}: {
  name: string;
  personalNumber: string;
  address: string;
}) => {
  return (
    <div className="c-paper c-paper--padding-3 details">
      <div className="details__icon">
        <i className="c-icon material-icons" translate="no" role="img">
          person
        </i>
      </div>
      <div>
        <h3 className="details__name">{name}</h3>
        <p className="details__item">{personalNumber}</p>
        <p className="details__item">{address}</p>
      </div>
    </div>
  );
};
