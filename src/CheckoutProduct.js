import React from "react";
import "./CheckoutProduct.css";
import StarIcon from "@material-ui/icons/Star";
import { useStateValue } from "./StateProvider";

//this component states for the card of each product at the checkout page:

function CheckoutProduct({id, image, title, price, rating, hideButton}) {
  const [{ basket }, dispatch] = useStateValue();
  const removeFromBasket = () => {
    //remove item from the basket
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };
  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map(() => (
              <p>
                <StarIcon style={{ color: "yellow" }} />
              </p>
            ))}
        </div>
        {!hideButton && (
        <button className="" onClick={removeFromBasket}>
          Remove from basket
        </button> //only render this button if it is not hidden (because it is hidden in the order component)
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
