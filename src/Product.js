import React from "react";
import "./Product.css";
import StarIcon from "@material-ui/icons/Star";
import { useStateValue } from './StateProvider';
import { ToysOutlined } from "@material-ui/icons";

function Product({ id, title, image, price, rating }) {
  /*{} breake apart the object we pass in. could have had "props"*/
  const [{basket}, dispatch] = useStateValue();
  
  //dispatch the item into the data layer
  const addToBasket= ()=>{
dispatch({
  type: 'ADD_TO_BASKET',
  item: {
    id: id,
    title: title,
    image: image,
    price: price,
    rating: rating
  },
});
  };
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">    
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>
                <StarIcon style={{ color: "yellow" }} />
              </p>
            ))}
        </div>
      </div>
      <img
        src={image}
        alt=""
      />
      <button onClick={addToBasket}>Add to basket</button>
    </div>
  );
}

export default Product;

//The fill() method changes all elements in an array to a 
//static value, from a start index (default 0) to an 
//end index (default array.length). It returns the modified 
//array