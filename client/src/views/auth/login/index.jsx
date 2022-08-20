/*@author: Peace Cyebukayire
 * created: 18th Aug 2022*/

import { useFormik } from "formik";
import "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../styles/common.css";
import * as Yup from "yup";
import { login } from "../../../services/auth";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
const Login = () => {
  const [requestError, setRequestError] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const schema = Yup.object().shape({
    username: Yup.string().required("username is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
  });

  const { handleChange, values, errors, touched, getFieldProps, isValid } =
    formik;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRequestError(false);
    const response = await login(values);
    if (response.data == "password or username is wrong") {
      setRequestError(response.data);
      // toast.error(response.data)
      navigate("/");
    } else {
      const usertype = response.data.toLowerCase();
      localStorage.setItem("usertype", usertype);
      toast.success(response.data);
      navigate("/data");
    }
  };
  const errorInputStyle = {
    border: "1px solid red",
  };

  return (
    <div className="container">
      <Toaster />
      <div className="form-container">
        <form>
          {requestError && <div className="error-message">{requestError}</div>}
          <h1>Responsive Login Form</h1>
          <div className="input-box">
            <iconify-icon className="icon" icon="bxs:user"></iconify-icon>
            <input
              name="username"
              type="text"
              placeholder="Username"
              {...getFieldProps("username")}
              style={errors.username && touched.username ? errorInputStyle : {}}
            />
          </div>
          {touched.username && errors.username && (
            <label>{errors.username}</label>
          )}
          <div className="input-box">
            <iconify-icon className="icon" icon="bxs:user"></iconify-icon>
            <input
              name="password"
              type="password"
              placeholder="Password"
              {...getFieldProps("password")}
              style={errors.password && touched.password ? errorInputStyle : {}}
            />
          </div>
          {touched.password && errors.password && (
            <label>{errors.password}</label>
          )}

          <button type="submit" onClick={handleSubmit}>
            LOGIN
          </button>
        </form>

        <Link to="/signup">
          <p style={{ marginTop: "2em" }}>
            Have no account ? <span>Register</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
