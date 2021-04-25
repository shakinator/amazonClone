const functions = require("firebase-functions");
const express = require("express");
const cors =require("cors");
const { request, response } = require("express");
const stripe  = require("stripe")('sk_test_51IhXSwSB0ppcvPV3VXD1sjKakDMiJTmcBrQB1olDhQ8Ukzt50q0vLGvbc7sy8YDZb0LPbu29boRkEQ8l6HCicayN00Ojowiync');

// for setting an API we need to follow these steps 
// App config 
// Middlewares
//API routes 
// Listen Commands 
// App config 

const app = express();


// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);


//This is the example command point  
//http://localhost:5001/clone-81a7e/us-central1/api
