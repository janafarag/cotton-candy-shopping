// Details.jsx
import React, {useContext, useState} from 'react';
import './details.css';
import {useNavigate} from "react-router-dom";
import {ShopContext} from "../../context/shop-context"; // Import the stylesheet
import { PRODUCTS } from "../../products";
export const Details = () => {

    const navigate = useNavigate();



    // Define state variables for form fields
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [isFormSubmitted, setFormSubmitted] = useState(false);


    const { cartItems, getTotalCartAmount , checkout} = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();

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
            "shipping address": address,
            "products": products,
            "total price": totalAmount,
        };
        console.log(order_data);
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
        </div>
    );
};

