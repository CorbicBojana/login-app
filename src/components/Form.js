import React, { useState } from "react";
import { Formik } from "formik";

function Form() {
  const [isLogin, setIsLogin] = useState(false);

  const handleClick = () => {
    setIsLogin(false);
  };

  return (
    <>
      {isLogin ? (
        <div className="welcome">
          <h2>Welcome</h2>
          <div className="login-button">
            <button onClick={handleClick} className="button">
              Logout
            </button>
          </div>
        </div>
      ) : (
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = <h4 className="error">Required email</h4>;
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = <h4 className="error">Invalid email address</h4>;
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            var oldInput = JSON.parse(localStorage.getItem("input")) || [];

            var newInput = {
              ...values
            };

            oldInput.push(newInput);

            localStorage.setItem("input", JSON.stringify(oldInput));
            setIsLogin(true);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit} className="form">
              <span className="login">Login</span>
              <div className="login-text">
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="login-input"
                />
                <span>Email</span>
              </div>
              {errors.email && touched.email && errors.email}
              <div className="login-password">
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className="login-input"
                />
                <span>Password</span>
              </div>
              {errors.password && touched.password && errors.password}
              <div className="login-button">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </Formik>
      )}
    </>
  );
}

export default Form;
