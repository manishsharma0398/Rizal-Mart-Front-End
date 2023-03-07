import * as yup from "yup";
import { useRef } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  login,
  selectAuthError,
  selectAuthStatus,
} from "../../features/auth/authSlice";

import CustomInput from "../../components/custom-input/CustomInput";
import Feedback from "../../components/feedback/Feedback";

import "./Auth.scss";

const Login = () => {
  const dispatch = useDispatch();
  const loadingRef = useRef(null);

  const notifyLoading = () => (loadingRef.current = toast.loading("Loging In"));

  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  const schema = yup.object({
    email: yup.string().email("Invalid email address").required("Required"),
    password: yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      notifyLoading();
      await dispatch(login(values));
      toast.dismiss(loadingRef.current);
    },
  });

  return (
    <div className="auth-form-container">
      <form onSubmit={formik.handleSubmit} className="auth-form">
        <div className="form-heading">
          <span className="title">Login</span>
          <span className="desc">Login To Your account</span>
        </div>

        {status === "rejected" && error && (
          <Feedback msg={error} type="error" />
        )}

        <div className="inputs">
          <CustomInput
            id="email"
            type="email"
            label="Email address"
            error={formik.errors.email}
            value={formik.values.email}
            touched={formik.touched.email}
            onChange={formik.handleChange}
          />

          <CustomInput
            id="password"
            type="password"
            label="Password"
            error={formik.errors.password}
            value={formik.values.password}
            touched={formik.touched.password}
            onChange={formik.handleChange}
          />
        </div>

        <Link className="forgot-password small" to="/forgot-password">
          Forgot Password
        </Link>

        <button type="submit" disabled={status === "loading"}>
          Login
        </button>

        <Link className="small" to="/register">
          Don't have an account? Register
        </Link>
      </form>
    </div>
  );
};
export default Login;
