import React from "react";
import "./LogIn.css";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { auth } from "./firebase";

function LogIn() {
  const history = useHistory(); //enables us to change the url
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = e => {
    e.preventDefault(); //prevents the page from refreshing

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push('/')
      })
      .catch(error => alert(error.message));
  }

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        //it successfully created a new user with email and password
        //and than if everything is good it comes back with an auth object of the user
        //console.log(auth);
        if (auth) {
          history.push("/"); //this is the history of the browser, we actually force it to re-direct
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="logIn">
      <Link to="./">
        <img
          className="logIn__logo"
          src="https://logos-download.com/wp-content/uploads/2016/03/Amazon_Logo_2000.png"
        />
      </Link>
      <div className="logIn__container">
        <h1>Sign in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            onClick={signIn}
            className="logIn__signInButton"
          >
            Sign in
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZOM **FAKE** CLONE conditions of use
          & sale. Please see our privacy notice and our Cookies notice.
        </p>
        <button className="logIn__registerButton" onClick={register}>
          Create Account
        </button>
      </div>
    </div>
  );
}

export default LogIn;
