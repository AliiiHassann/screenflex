import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const win = window.sessionStorage;
  const handleSubmit = (e) => {
    e.preventDefault();
    win.clear();
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (win.getItem("email")) {
      setEmail(win.getItem(email));
    }
    if (win.getItem("password")) {
      setEmail(win.getItem(password));
    }
  }, []);
  useEffect(() => {
    win.setItem("email", email);
    win.setItem("password", password);
  }, [email, password]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Required")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid Email Address"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          "Minimum eight characters, at least one letter and one number, Without special character"
        )
        .required("Required"),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <div className='main-wrapper'>
      <div className='wrapper'>
        <form action='' onSubmit={formik.handleSubmit}>
          <h1>Login</h1>
          <div className='input-box'>
            <input
              type='email'
              placeholder='Email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FaUser className='icon' />
            {formik.touched.email && formik.errors.email ? (
              <div className='alert alert-dark text-danger ps-2 pe-2 pt-0 pb-0 w-100 text-center mt-2 mb-0'>
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div className='input-box'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className='icon' />
            {formik.touched.password && formik.errors.password ? (
              <div className='alert alert-dark text-danger ps-2 pe-2 pt-0 pb-0 w-100 text-center mt-2 mb-0'>
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className='remember-forgot'>
            <label>
              <input type='checkbox' />
              Remember me
            </label>
            <a href=''>Forget your password?</a>
          </div>
          <button type='submit' onClick={() => navigate("/")}>
            Login
          </button>
          <div className='register-link'>
            <p>
              Don't have an account? <Link to={"/register"}>Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
