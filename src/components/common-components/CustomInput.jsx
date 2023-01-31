const CustomInput = (props) => {
  const { type, label, i_id, i_class, id } = props;

  return (
    <div className="form-floating mb-3">
      <input
        type={type}
        className={`form-control ${i_class}`}
        id={i_id || id}
        name={i_id || id}
        placeholder={label}
      />
      <label htmlFor={i_id || id} className="form-label">
        {label}
      </label>
    </div>
  );
};
export default CustomInput;
