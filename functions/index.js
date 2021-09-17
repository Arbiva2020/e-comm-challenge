const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51JSD0ZEcD8EAcJ7301zJnDY91phGbn75jOaUaRAcLqscGd98qC4qtGgcQWJVCrNZBOAIbVvIz1C3cytmWRqOZYWZ00a1OcgVtS"
);

//to set up an API:
//API

//App config
const app = express();
//middlewares
app.use(cors({ origin: true }));
app.use(express.json()); //sending information in a json format
//API routs
app.get("/", (request, response) => response.status(200).send("Hello world")); // a dummy route

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request recieved for: ==> ", total);
  const paymentIntent = await stripe.paymentIntent.create({
    currency: "usd",
  });

  //OK - created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
}); //we use payments/create inside payments.js

//Listen command
exports.api = functions.https.onRequest(app);

//an example end point from the vsc terminal:
//http://localhost:5001/e-comm-challenge/us-central1/api
