import React, { useState, useEffect } from 'react';
import * as dropin from 'braintree-web-drop-in';
import axios from 'axios';
import { useAppcontext } from '../Context/Appcontext';

const BraintreeComponent = () => {
    const [clientToken, setClientToken] = useState(null);
    const [isBraintreeReady, setBraintreeReady] = useState(false);
    const { serverurl, amount } = useAppcontext()

    useEffect(() => {
        // Fetch client token from your server
        axios.get('http://localhost:8888/client_token')
            .then((response) => {
                // console.log('Erro', response)
                setClientToken(response.data);
                setBraintreeReady(true)
            })
            .catch((e) => console.log('Error fetching client token', e));
    }, []);


    const initializeBraintree = async () => {
        try {
            const instance = await dropin.create({
                authorization: clientToken,
                container: '#dropin-container',
                // paypal: {
                //     flow: 'vault',
                // },
            }).catch(e => console.log('rt', e))

            document.getElementById('submit-button').addEventListener('click', async () => {
                const { nonce } = await instance.requestPaymentMethod();
                // Send the payment nonce to your server for further processing
                axios.post(`${serverurl}/checkout`, { amount: amount, paymentMethodNonce: nonce })
                    .then((response) => {
                        console.log('uyt', response.data)
                        if (response.data === 'Payment successful!') {
                            axios.post(`${serverurl}/approvaldataresult`, { orderdata: nonce, approvaldata: response.data })
                                .then((response) => {
                                    
                                    console.log('respi', response.data)
                                })
                                .catch((error) => {
                                    console.log('erri', error)
                                })
                        }
                        alert(`${response.data}`)
                    }).catch((error) => {
                        alert(`Error : ${error}`);
                    })
                console.log('Payment Nonce:', nonce);
                // setPayNonce(nonce)
            });
        } catch (error) {
            alert(`Error initializing Drop-in: ${error}`);
        }
    };

    useEffect(() => {
        if (isBraintreeReady) {
            initializeBraintree();
        }
    }, [isBraintreeReady]);

    return (
        <div>
            <div id="dropin-container"></div>
            <button id="submit-button">Submit Payment</button>
        </div>
    );
};

export default BraintreeComponent;
