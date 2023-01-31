import CustomInput from "../components/common-components/CustomInput";

const ForgotPassword = () => {
  return (
    <div className="py-5 min-vh-100" style={{ background: "#ffdd33" }}>
      <div
        style={{ maxWidth: "400px" }}
        className="my-5 bg-white rounded-3 mx-auto p-3 container"
      >
        <h3 className="text-center">Forgot Password</h3>
        <p className="text-center">
          Please enter your registered email to get reset password email
        </p>
        <CustomInput type="email" label="Email Address" id="email" />

        <button
          className="border-0 px-3 py-2 w-100 fw-bold"
          type="submit"
          style={{ background: "#ffd333" }}
        >
          Send Link
        </button>
      </div>
    </div>
  );
};
export default ForgotPassword;
