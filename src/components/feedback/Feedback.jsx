import { MdClose } from "react-icons/md";

const Feedback = ({ type, msg, showClose = true }) => {
  return (
    <div className={`feedback feedback-${type}`}>
      <span className="">{msg}</span>
      {showClose && (
        <span className="close">
          <MdClose />
        </span>
      )}
    </div>
  );
};
export default Feedback;
