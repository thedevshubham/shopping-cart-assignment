import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.styles.css";
import { useHistory } from "react-router-dom";

export default function Header({ currentUser, signOut }) {
  return (
    <header>
      <div className="header__left">
        <div className="header__left_img">
          <img
            src={`/static/images/logo.png`}
            alt="logo"
            width="70%"
            height="100%"
          />
        </div>
        <nav className="header__left_nav">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
        </nav>
      </div>
      <div className="header__avatar">
        {currentUser && `Hello, ` + currentUser.firstName.toUpperCase()}
      </div>
      <div className="header__right">
        <div className="header__right_nav">
          {currentUser ? (
            <nav>
              <Link to="/" onClick={signOut}>
                Signout
              </Link>
            </nav>
          ) : (
            <nav>
              <Link to="/login">Signin</Link>
              <Link to="/signup">Register</Link>
            </nav>
          )}
          <div className="header__right_cart">
            <img
              src={`/static/images/cart.svg`}
              alt="cart logo"
              height="20px"
              width="20px"
            />
            10 items
          </div>
        </div>
      </div>
    </header>
  );
}
