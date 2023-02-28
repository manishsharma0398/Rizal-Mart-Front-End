import { MdClose } from "react-icons/md";

const AuthFeedback = ({ type, msg }) => {
  return (
    <div className={`feedback feedback-${type}`}>
      <span className="">{msg}</span>
      <span className="close">
        <MdClose />
      </span>
    </div>
  );
};
export default AuthFeedback;
