import React from 'react'
import { BraintreePayPalButtons, PayPalButtons ,PayPalScriptProvider} from '@paypal/react-paypal-js';

export default function PayPalPayment() {
    const initialOptions = {
        clientId: "AVBVb382mUfEbnGPFZR_2_N5fioBDcwNJWQHHRKNW7NC8-MB5YPYJxpINlep1HJziZ2mLAExwmgbMOEM",
        currency: "USD",
        intent: "capture",
    };
    const serverurl='http://localhost:8888'
    const createOrder = (data) => {
        // Order is created on the server and the order id is returned
        return fetch(`${serverurl}/my-server/create-paypal-order`, {
          method: "POST",
           headers: {
            "Content-Type": "application/json",
          },
          // use the "body" param to optionally pass additional order information
          // like product skus and quantities
          body: JSON.stringify({
            cart: [
              {
                sku: "YOUR_PRODUCT_STOCK_KEEPING_UNIT",
                quantity: "YOUR_PRODUCT_QUANTITY",
              },
            ],
          }),
        })
        .then((response) => response.json())
        .then((order) => order.id);
      };
      const onApprove = (data) => {
         // Order is captured on the server and the response is returned to the browser
         console.log('ORDERID',data.orderID)
         return fetch(`${serverurl}/my-server/capture-paypal-order`, {
          method: "POST",
           headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderID: data.orderID
          })
        })
        .then((response) =>{
             response.json()
             console.log(response)
        }).catch((e)=>console.log(e));
      };
  return (
    <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
                createOrder={(data,actions) => createOrder(data, actions)}
                onApprove={(data,actions) => onApprove(data, actions)}
              />
              
      </PayPalScriptProvider>
  )
}
