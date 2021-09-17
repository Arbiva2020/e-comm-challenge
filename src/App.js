import React, { useEffect } from "react";
import "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import LogIn from "./LogIn";
import Payment from "./Payment";
import Orders from "./Orders"
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js"; //payment dependencies
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51JSD0ZEcD8EAcJ73KUpxmiczWzFp6y3oaIVqpZwHqn0DfQs8cQ7M4GH5jMBSUdqtReIbOfUtTpymV189knNcnkfh00l9B78W1t"
);

function App() {
  const [{}, dispatch] = useStateValue();
  // in order to keep track on who is signing in,
  //we create a listener using useEffect.
  //**it will only run once when the app component loads(because the
  //square brackrst are empty)**
  //if there is something in the square brackets,
  //whenever what is in the square brackets changes, the code will re-fire.
  useEffect(() => {
    //a listener that gives us the authenticated user
    //if anything changes
    auth.onAuthStateChanged((authUser) => {
      console.log("The user is >>>", authUser);
      if (authUser) {
        //the user is/were logged in:
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out:
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
        <Route path="/orders">
        <Header />
            <Orders />
          </Route>
          <Route path="/logIn">
            <LogIn />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

//homepage route - always at the bottom
// header outside the switch - always gets renderd
//"payments" is inside a higher order function - "elements"
