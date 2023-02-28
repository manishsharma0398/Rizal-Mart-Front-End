import CustomInput from "../../components/custom-input/CustomInput";

const ResetPassword = () => {
  return (
    <div
      style={{ maxWidth: "400px" }}
      className="my-5 bg-white rounded-3 mx-auto p-3 container"
    >
      <h3 className="text-center">Reset Password</h3>
      <p className="text-center">
        Please enter your registered email to get reset password email
      </p>
      <CustomInput type="password" label="Password" id="password" />
      <CustomInput
        type="password"
        label="Confirm Password"
        id="confirmPassword"
      />

      <button
        className="border-0 px-3 py-2 w-100 fw-bold"
        type="submit"
        style={{ background: "#ffd333" }}
      >
        Reset Password
      </button>
    </div>
  );
};
export default ResetPassword;
