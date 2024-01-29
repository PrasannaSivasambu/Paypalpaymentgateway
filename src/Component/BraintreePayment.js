import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BraintreePayment = () => {
    const [clientToken, setClientToken] = useState('');
    const [nonce, setNonce] = useState(null);

    useEffect(() => {
        // Fetch client token from your server
        axios.get('http://localhost:8888/client_token')
            .then((response) => {
                setClientToken(response.data);
            })
            .catch((e) => console.log('Error fetching client token', e));
    }, []);

    const handlePayment = async () => {
        if (!nonce) {
            console.error('Nonce is missing. Payment cannot be processed.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8888/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ paymentMethodNonce: nonce }),
            });

            if (response.ok) {
                console.log('Payment successful!');
                // Handle success, e.g., show a success message or redirect
            } else {
                console.error('Payment failed', response);
                // Handle failure, e.g., show an error message
            }
        } catch (error) {
            console.error('Error processing payment', error);
        }
    };

    useEffect(() => {
        if (clientToken) {
            // Initialize the Braintree Drop-in UI
            const script = document.createElement('script');
            script.src = 'https://js.braintreegateway.com/web/dropin/1.32.0/js/dropin.min.js';
            script.async = true;
            script.onload = () => {
                // Configure and mount the Drop-in UI
                window.braintree.dropin.create({
                    authorization: clientToken,
                    container: '#dropin-container',
                    paypal: {
                        flow: 'vault',
                    },
                }, (error, instance) => {
                    if (error) {
                        console.error('Error creating Drop-in instance', error);
                        return;
                    }

                    // Set up event listeners for nonce generation
                    instance.on('paymentMethodRequestable', (event) => {
                        setNonce(event.nonce);
                    });
                });
            };
            document.body.appendChild(script);
        }
    }, [clientToken]);

    return (
        <div>
            Payment Section
            <div id="dropin-container"></div>
            <button onClick={handlePayment}>
                Submit
            </button>
        </div>
    );
};

export default BraintreePayment;
