import React, { useState } from "react";

function Form() {
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
    id: ""
  });
  const [isLogin, setIsLogin] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    //localStorage.setItem("user", JSON.stringify(formInput));

    if (formInput.email === "" && formInput.password === "") {
      return setIsLogin(false);
    }

    var oldInput = JSON.parse(localStorage.getItem("input")) || [];

    var newInput = {
      ...formInput
    };

    oldInput.push(newInput);

    localStorage.setItem("input", JSON.stringify(oldInput));
    setIsLogin(true);

    function validateEmail(mail) {
      if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formInput.email)
      ) {
        return true;
      }
      alert("You have entered an invalid email address!");
      setIsLogin(false);
      return false;
    }
    validateEmail(formInput.email);
  };

  const handleChange = e => {
    const value = e.target.value;
    setFormInput({
      ...formInput,
      [e.target.name]: value,
      id: Math.random()
    });
  };

  const handleClick = () => {
    setIsLogin(false);
    setFormInput({
      email: "",
      password: "",
      id: ""
    });
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
        <form className="form" onSubmit={handleSubmit}>
          <span className="login">Login</span>
          <div className="login-text">
            <input
              type="text"
              className="login-input"
              name="email"
              onChange={handleChange}
            />
            <span>Email</span>
          </div>
          <div className="login-password">
            <input
              type="password"
              className="login-input"
              name="password"
              onChange={handleChange}
            />
            <span>Password</span>
          </div>
          {localStorage.length < 1 ? (
            <div className="login-button">
              <button type="submit" className="button">
                Register
              </button>
            </div>
          ) : (
            <div className="login-button">
              <button type="submit" className="button">
                Login
              </button>
            </div>
          )}
        </form>
      )}
    </>
  );
}

export default Form;
