import axios from "axios";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

import CustomInput from "../components/common-components/CustomInput";

import {
  selectAuthData,
  selectAuthError,
  selectAuthStatus,
  adminLogin,
} from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);
  const userData = useSelector(selectAuthData);

  const navigate = useNavigate();

  useEffect(() => {
    if (status === "success") {
      navigate("/admin");
    }
  }, [status]);

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
      dispatch(adminLogin(values));
      // const d = await instance.post("/auth/login", values);
    },
  });

  return (
    <div className="py-5 min-vh-100" style={{ background: "#ffdd33" }}>
      <div
        style={{ maxWidth: "400px" }}
        className="my-5 bg-white rounded-3 mx-auto p-3 container"
      >
        <h3 className="text-center">Login</h3>
        <p className="text-center">Login To Your account to continue</p>

        {status === "rejected" && error && <div className="error">{error}</div>}

        <CustomInput
          type="email"
          label="Email Address"
          id="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        <div className="error">
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>

        <CustomInput
          type="password"
          label="Password"
          id="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />

        <div className="error">
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </div>

        <div className="text-end">
          <Link className="pb-2 d-inline-block" to="/forgot-password">
            Forgot Password ?
          </Link>
        </div>

        <button
          onClick={formik.handleSubmit}
          className="border-0 px-3 py-2 w-100 fw-bold text-center text-decoration-none text-black"
          type="button"
          style={{ background: "#ffd333" }}
        >
          Login
        </button>
      </div>
    </div>
  );
};
export default Login;
