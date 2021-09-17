import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <Link to="/">
        {" "}
        <img
          className="header__logo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav"></div>
      {/* //if  there was no user, only then do we push into the log in page, not just in any case:*/}
      <Link to={!user && "/logIn"}>
        <div onClick={handleAuthentication} className="header__option">
          <span className="optionLineOne">
            Hello, {!user ? "Guest" : user.email}
          </span>
          <span className="optionLineTwo">{user ? "Sign out" : "Sign in"}</span>
        </div>
      </Link>
      <Link to="/orders">
        <div className="header__option">
          <span className="optionLineOne">Returns</span>
          <span className="optionLineTwo">& Orders</span>
        </div>
      </Link>

      <div className="header__option">
        <span className="optionLineOne">Your</span>
        <span className="optionLineTwo">Prime</span>
      </div>

      <Link to="/checkout">
        <div className="header__optionBasket">
          <ShoppingBasketIcon />
          <span
            className="header__optionLineTwo 
header__basketCount"
          >
            {basket?.length}
          </span>
        </div>
      </Link>
    </div>
  );
}

export default Header;
