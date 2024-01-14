import React from "react";
import "./checkout.css";
import orderImg from "../../assets/products/order.jpg";
import curtains from "../../assets/products/curtains_hand.png";



export const Checkout = () => {

    const apiGateway = process.env.REACT_APP_API_GATEWAY;
    const redirectUrl = `${apiGateway}/jolly`;

  return (
    <div className="checkout">
      <div className="checkoutImage">
        <img src={orderImg} />
      </div>

      <div className="checkoutDescription">
        <h2>Thank you for placing your trust in Cotton Candy GmbH! </h2>
        <h2> Your order is being freshly produced in our factory. 
            Please be patient, it will be shipped shortly. </h2>
        <h2>While you are waiting you can also sneak peek a lot behind the curtains:<br /><br />&nbsp;&nbsp;&nbsp; </h2> 
        
        <div className="container">
            <div className="checkoutCurtain">
            <img src={curtains} />
            </div>

            <div className="checkoutText">
            <h2><a href={redirectUrl} target="_blank" rel="noopener noreferrer">
            Click me
            </a></h2>
            </div> 

            <div className="checkoutCurtain2">
            <img src={curtains} />
            </div>
        </div>    
        
    
      </div>


    </div>
  );
};
