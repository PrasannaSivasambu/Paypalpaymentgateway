import express from "express";
import "dotenv/config";
import path from "path";
import * as paypal from "./paypal-api.js";
import cors from "cors"
import braintree from "braintree";
import bodyParser from "body-parser";
  

const app = express();
const {MERCHANT_ID,PUBLIC_KEY,PRIVATE_KEY}=process.env
const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: MERCHANT_ID,
    publicKey: PUBLIC_KEY,
    privateKey: PRIVATE_KEY,
  });
const {  PORT = 8888 } = process.env;
 app.use(cors()) 
// host static files
app.use(express.static("client"));
  
// parse post params sent in body in json format
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/client_token', async (req, res) => {
  try {
    const response = await gateway.clientToken.generate({});
    console.log('respi',response.clientToken)
    res.send(response.clientToken);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating client token');
  }
});

app.post('/checkout', async (req, res) => {
  const { amount, paymentMethodNonce } = req.body;

  try {
    const result = await gateway.transaction.sale({
      amount,
      paymentMethodNonce,
        
      options: 
      {
        submitForSettlement: true
      } 
    });

    if (result.success) {
      res.send('Payment successful!');
    } else {
      res.status(500).send('Payment failed');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing payment');
  }
});
app.post("/my-server/create-paypal-order", async (req, res) => {
    try {
      // use the cart information passed from the front-end to calculate the order amount detals
      const { cart } = req.body;
      const { jsonResponse, httpStatusCode } = await paypal.createOrder(cart);
      res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
      console.error("Failed to create order:", error);
      res.status(500).json({ error: "Failed to create order." });
    }
  });
app.post("/my-server/capture-paypal-order", async (req, res) => {
    try {
      const { orderID } = req.params;
      const { jsonResponse, httpStatusCode } = await paypal.captureOrder(orderID);
      res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
      console.error("Failed to create order:", error);
      res.status(500).json({ error: "Failed to capture order." });
    }
  });
    
  // serve index.html
  app.get("/", (req, res) => {
    res.sendFile(path.resolve("./client/checkout.html"));
  });
    
  app.listen(PORT, () => {
    console.log(`Node server listening at http://localhost:${PORT}/`);
  });