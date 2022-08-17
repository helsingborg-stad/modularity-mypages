interface NoticeProps {
  text: string;
}

export const Notice = ({ text }: NoticeProps) => {
  return (
    <div
      id="mypages-profile-notice"
      className="c-notice u-margin__bottom--3 c-notice--success"
      aria-labelledby="mypages-profile-notic">
      <span className="c-notice__icon">
        <i id="6284bd2fbb9f0" className="c-icon c-icon--size-md material-icons" translate="no" role="img">
          report
        </i>
      </span>
      <span className="c-notice__message">{text}</span>
    </div>
  );
};
