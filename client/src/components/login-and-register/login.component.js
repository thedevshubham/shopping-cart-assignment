import React, { useState } from "react";
import "./login-and-signup.styles.css";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

export default function Login({ isLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    let users = localStorage.getItem("users");
    if (users) {
      users = JSON.parse(users);
      let authUser = users.find((user) => {
        return user.email === email && user.password === password;
      });
      if (!authUser) {
        toast.error("Invalid user!");
        return;
      }
      localStorage.setItem("active_user", JSON.stringify(authUser));
      toast.success("Login successfully!");
      isLoggedIn(authUser);
      history.push("/products");
    } else {
      toast.error("DB empty!");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="signin">
      <div className="signin__message_content">
        <h1>Login</h1>
        <span>Get access to your Orders, Wishlist and Recommendations</span>
      </div>
      <div className="signin__form">
        <form onSubmit={handleSubmit} autoComplete="off">
          <FormInput
            type="email"
            name="email"
            id="email"
            label="Email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormInput
            type="password"
            name="password"
            id="password"
            label="Password"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="form-btn">
            <CustomButton type="submit">Login</CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
}
