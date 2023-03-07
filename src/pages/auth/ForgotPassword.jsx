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

import Feedback from "../../components/feedback/Feedback";
import CustomInput from "../../components/custom-input/CustomInput";

import "./Auth.scss";

const Register = () => {
  const dispatch = useDispatch();
  const loadingRef = useRef(null);

  const notifyLoading = () => (loadingRef.current = toast.loading("Loging In"));

  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  const schema = yup.object({
    email: yup.string().email("Invalid email address").required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
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
      <form onSubmit={formik.handleSubmit} className="auth-form register">
        <div className="form-heading">
          <span className="title">Forgot Password</span>
          <span className="desc">
            Please enter your registered email to get reset password email
          </span>
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
        </div>

        <button type="submit" disabled={status === "loading"}>
          Send Link
        </button>

        <Link className="small" to="/login">
          Login to your account
        </Link>
      </form>
    </div>
  );
};
export default Register;
