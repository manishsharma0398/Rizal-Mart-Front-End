import { Link } from "react-router-dom";
import CustomInput from "../components/common-components/CustomInput";

const Login = () => {
  return (
    <div className="py-5 min-vh-100" style={{ background: "#ffdd33" }}>
      <div
        style={{ maxWidth: "400px" }}
        className="my-5 bg-white rounded-3 mx-auto p-3 container"
      >
        <h3 className="text-center">Login</h3>
        <p className="text-center">Login To Your account to continue</p>
        <CustomInput type="email" label="Email Address" id="email" />
        <CustomInput type="password" label="Password" id="password" />

        <div className="text-end">
          <Link className="pb-2 d-inline-block" to="/forgot-password">
            Forgot Password ?
          </Link>
        </div>

        {/* <button
          className="border-0 px-3 py-2 w-100 fw-bold"
          type="submit"
          style={{ background: "#ffd333" }}
        >
          Login
        </button> */}
        <Link
          to="/admin"
          className="border-0 px-3 py-2 w-100 fw-bold text-center text-decoration-none text-black"
          type="submit"
          style={{ background: "#ffd333" }}
        >
          Login
        </Link>
      </div>
    </div>
  );
};
export default Login;
