import React, { useState } from 'react'
import { BraintreePayPalButtons, PayPalButtons ,PayPalScriptProvider} from '@paypal/react-paypal-js';
import { useAppcontext } from '../Context/Appcontext';
import { json } from 'react-router-dom';

export default function PayPalPayment() {
    const {orderdata,setOrderData,approvaldata,setApprovalData,serverurl,selectedcurrency,}=useAppcontext()
    const initialOptions = {
        clientId: "AVBVb382mUfEbnGPFZR_2_N5fioBDcwNJWQHHRKNW7NC8-MB5YPYJxpINlep1HJziZ2mLAExwmgbMOEM",
        currency: selectedcurrency,
        intent: "capture",
    };
    
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
        .then((order) => {
          setOrderData(order.id)
          return order.id
        });
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
          console.log('UTOPIA',response.status)
          if(response.statusText==='success'){
            alert(`${response.statusText}`)
          }
          setApprovalData(
            (prevApprovalData)=>{
            return {...prevApprovalData,data: response.statusText}
           })
             return response.json()
             
        }).catch((e)=>console.log('UGANDAS',e));
      };
  return (
    <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
                createOrder={(data,actions) => createOrder(data, actions)}
                onApprove={(data,actions) => onApprove(data, actions)}
                onError={(err) => console.log('Error:', err)}
              />
              
      </PayPalScriptProvider>
  )
}
