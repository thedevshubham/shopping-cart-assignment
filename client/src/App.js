import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";
import Home from "./components/home/home.component";
import Header from "./components/header/header.component";
import NotFound from "./components/404/404.component";
import Footer from "./components/footer/footer.component";
import Login from "./components/login-and-register/login.component";
import Signup from "./components/login-and-register/signup.component";
import Products from "./components/products/products.component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App(props) {
  let currentUser = localStorage.getItem("active_user");
  currentUser = currentUser && JSON.parse(currentUser);
  const [currentUserState, setcurrentUserState] = useState(currentUser);

  const setUser = (authUser) => {
    setcurrentUserState(authUser);
  };

  const signOut = () => {
    localStorage.removeItem("active_user");
    setcurrentUserState(null);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Header currentUser={currentUserState} signOut={() => signOut()} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/login"
            render={() => {
              return !currentUser ? (
                <Login
                  isLoggedIn={(user) => setUser(user)}
                  currentUser={currentUser}
                />
              ) : (
                <Redirect to="/products" />
              );
            }}
          />
          <Route
            path="/signup"
            render={() => {
              return !currentUser ? <Signup /> : <Redirect to="/products" />;
            }}
          />
          <Route path="/products" component={Products} />
          <Route exact path="*" component={NotFound} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
