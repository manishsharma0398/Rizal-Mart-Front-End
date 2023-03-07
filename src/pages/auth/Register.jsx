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

const Register = () => {
  const dispatch = useDispatch();
  const loadingRef = useRef(null);

  const notifyLoading = () => (loadingRef.current = toast.loading("Loging In"));

  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  const schema = yup.object({
    email: yup.string().email("Invalid email address").required("Required"),
    password: yup.string().required("Required"),
    name: yup.string().required("Required"),
    confirmPassword: yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
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
          <span className="title">Register</span>
          <span className="desc">Create brand new account</span>
        </div>

        {status === "rejected" && error && (
          <Feedback msg={error} type="error" />
        )}

        <div className="inputs">
          <CustomInput
            id="name"
            label="Full Name"
            error={formik.errors.name}
            value={formik.values.name}
            touched={formik.touched.name}
            onChange={formik.handleChange}
          />

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

          <CustomInput
            id="confpassword"
            type="password"
            label="Confirm Password"
            error={formik.errors.confirmPassword}
            value={formik.values.confirmPassword}
            touched={formik.touched.confirmPassword}
            onChange={formik.handleChange}
          />
        </div>

        <button type="submit" disabled={status === "loading"}>
          Register
        </button>

        <Link className="small" to="/login">
          Already have an account? Login
        </Link>
      </form>
    </div>
  );
};
export default Register;
