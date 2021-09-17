import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "axios";
import { db } from "./firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  //two powerfull hooks:
  const stripe = useStripe();
  const elements = useElements();
  //two states, one for the disable state and one for the error state:
  const [disabled, setDisabled] = useState(true);
  const [erroe, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    //generates the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        //stripe expects the total in a currencies subunits: dollars=>cents, that is why:*100
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`, //the '?' is for query parameter. this is a url that we create, that includes the total of the customer for us to charge
      });
      setClientSecret(response.data.clientSecret);
    }
    getClientSecret();
  }, [basket]) //whenever the [basket] changes, it will send a request that will update the total

console.log('The secret key is >>>', clientSecret)

  const handleSubmit = async (event) => {
    event.preventDefault(); //no refreshing
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        }
      })
      .then(({ paymentIntent }) => {
        //paymentIntent = payment confirmention

        //we import the db that we defined in the firebase component
db
.collection('users')
.doc(user?.uid)    //the way it appears on firebase
.collection('orders')
.doc(paymentIntent.id)
.set({
    basket: basket, 
    amount: paymentIntent.amount,     //create a document with the paymentIntent.id
    created: paymentIntent.created
})
        setSucceeded(true);
        setError(null);
        setProcessing(false);

//empty the basket after getting to orders
dispatch({
    type:'EMPTY_BASKET'
})
//after empting the basket, we re-direct to "orders" component:

        history.replace("/orders"); //where the customre go after payment
      });
  };

  const handleChange = (event) => {
    //listen for changes in the card element.
    // display the errors as the customer types their card details.
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout(<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        {/*payment section - delivery*/}
        <div classname="payment__section">
          <div className="payment__title">
            <h3>Delivery Adress</h3>
          </div>
          <div className="payment__adress">
            <p>{user?.email}</p>
            <p>123</p>
            <p>456</p>
          </div>
        </div>
        {/*payment section - review items*/}
        <div classname="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        {/*payment section - payment method*/}
        <div classname="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
            <div className="payment__details"></div>
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {/* {error && <div>{error}</div>} */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
