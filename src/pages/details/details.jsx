// Details.jsx
import React, {useContext, useState} from 'react';
import './details.css';
import {useNavigate} from "react-router-dom";
import {ShopContext} from "../../context/shop-context"; // Import the stylesheet
import { PRODUCTS } from "../../products";
import {Auth} from 'aws-amplify'
import {withAuthenticator} from "@aws-amplify/ui-react";


export const Details = () => {

    const navigate = useNavigate();



    // Define state variables for form fields
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [isFormSubmitted, setFormSubmitted] = useState(false);


    const { cartItems, getTotalCartAmount , checkout} = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();


    const apiGateway = process.env.REACT_APP_API_GATEWAY;
    const orderUrl = `${apiGateway}/order`


    // const signInWithCognito = async () => {
    //     try {
    //         await Auth.federatedSignIn({ provider: 'CognitoHostedUI' });
    //         // The user is now signed in, you can redirect or perform other actions
    //         navigate('/checkout');
    //     } catch (error) {
    //         console.error('Error signing in:', error);
    //     }
    // };

    async function postData(url = "", data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers as needed
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        // Parse and return the response JSON if the request was successful
        if (response.ok) {
            return response.json();
        }

        // If the request was not successful, throw an error with the status text
        throw new Error(`POST request failed: ${response.statusText}`);
    }



    // Handle form submission
    const handleSubmit = (e) => {
        //e.preventDefault();
        // Perform form submission logic here (e.g., send data to server)
        // For simplicity, just log the form data to the console
        //console.log('Email:', email);
        //console.log('Address:', address);
        setFormSubmitted(true);

        // create json to save in DynamoDB
        let products = PRODUCTS.map((product) => {
            if (cartItems[product.id] !== 0) {
                return {
                    name: product.productName,
                    price: product.price,
                    quantity: cartItems[product.id] };
            }
            return null;
        }).filter(item => item !== null);

        let order_data = {
            "email": email,
            "shipping_address": address,
            "products": products,
            "total_price": totalAmount,
        };
        console.log(order_data);



        postData(orderUrl, order_data)
            .then(data => {
                console.log('POST request successful:', data);
                // Handle the response data as needed
            })
            .catch(error => {
                console.error('Error:', error.message);
                // Handle the error
            });
/*        if (!Auth.user) {
            signInWithCognito();
        } else {
            // User is already authenticated, continue with your logic
            checkout();
        }*/
        checkout();

    };

    return (
        <div>
            <h2>Details Form</h2>
            {isFormSubmitted && <p>Form submitted successfully!</p>}
            <form onSubmit={handleSubmit}>
                {/* Email input */}
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                {/* Address input */}
                <label htmlFor="address">Address:</label>
                <textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />

                {/* Submit button */}
                <button type="submit"
                onClick={() =>{
                    handleSubmit()
                    navigate("/checkout")

                }}>Submit</button>
            </form>

            {/* Amplify Authenticator component */}

        </div>
    );
};

