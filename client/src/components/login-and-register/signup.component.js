import React, { useState, useEffect } from "react";
import "./login-and-signup.styles.css";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

export default function Signup() {
  const history = useHistory();
  const [signupdata, setSignUpdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let users = localStorage.getItem("users");
    if (users) {
      users = JSON.parse(users);
      users.push(signupdata);
      localStorage.setItem("users", JSON.stringify(users));
    } else {
      let userData = [];
      userData.push(signupdata);
      localStorage.setItem("users", JSON.stringify(userData));
    }
    toast("Welcome!");
    history.push("/login");
  };

  useEffect(() => {
    handleValidation();
  }, [signupdata]);

  const handleValidation = async () => {
    let { firstName, lastName, email, password, confirmPassword } = signupdata;
    let valError = {};
    let formIsvalid = true;
    if (!firstName) {
      formIsvalid = false;
      valError["firstName"] = "Firstname cannot be empty";
    }
    if (!lastName) {
      formIsvalid = false;
      valError["lastName"] = "Lastname cannot be empty";
    }
    if (!email) {
      formIsvalid = false;
      valError["email"] = "Email cannot be empty";
    }
    if (!password) {
      formIsvalid = false;
      valError["password"] = "Password cannot be empty";
    }
    if (!confirmPassword) {
      formIsvalid = false;
      valError["confirmPassword"] = "Confirm password cannot be empty";
    }
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        formIsvalid = false;
        valError["password"] = "Passwords doesn't match";
      }
    }
    await setErrors(valError);
    await setIsFormValid(formIsvalid);
    return formIsvalid;
  };

  const handleChange = (e) => {
    setSignUpdata({
      ...signupdata,
      [e.target.id]: e.target.value,
    });
  };

  const handleBlur = async (e) => {
    if (touched[e.target.id] !== true) {
      touched[e.target.id] = true;
      setTouched(touched);
      handleValidation();
    }
  };

  return (
    <div className="signin">
      <div className="signin__message_content">
        <h1>Signup</h1>
        <span>We do not share your personal details with anyone.</span>
      </div>
      <div className="signin__form">
        <form onSubmit={handleSubmit} autoComplete="off">
          <FormInput
            type="text"
            name="firstName"
            id="firstName"
            label="First Name"
            value={signupdata.firstName}
            handleChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <span className="input_error">
            {touched.firstName && errors.firstName}
          </span>
          <FormInput
            type="text"
            name="lastName"
            id="lastName"
            label="Last Name"
            value={signupdata.lastName}
            handleChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <span className="input_error">
            {touched.lastName && errors.lastName}
          </span>
          <FormInput
            type="email"
            name="email"
            id="email"
            label="Email"
            value={signupdata.email}
            handleChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <span className="input_error">{touched.email && errors.email}</span>
          <FormInput
            type="password"
            name="password"
            id="password"
            label="Password"
            value={signupdata.password}
            handleChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <span className="input_error">
            {touched.password && errors.password}
          </span>
          <FormInput
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            label="Confirm Password"
            value={signupdata.confirmPassword}
            handleChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <span className="input_error">
            {touched.confirmPassword && errors.confirmPassword}
          </span>
          <div className="form-btn">
            <CustomButton type="submit" disabled={!isFormValid}>
              Signup
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
}
