import "./CustomInput.scss";

const CustomInput = ({
  id,
  type,
  label,
  value,
  error,
  touched,
  helpText,
  onChange,
  className,
  errorOnTop,
}) => {
  return (
    <div>
      {errorOnTop && touched && error ? (
        <div className="text-danger">{error}</div>
      ) : null}

      <div className="form-floating">
        <input
          id={id}
          name={id}
          value={value}
          placeholder={label}
          onChange={onChange}
          type={!type ? "text" : type}
          aria-describedby={`${id}-help`}
          className={`form-control ${className}`}
        />
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      </div>

      {helpText && (
        <div id={`${id}-help`} className="form-text">
          {helpText}
        </div>
      )}

      {!errorOnTop && touched && error ? (
        <div className="text-danger">{error}</div>
      ) : null}
    </div>
  );
};
export default CustomInput;
