import React from "react";
import "./contact.css";
import factoryImg from "../../assets/products/Cotton Candy Factory.jpg";

export const Contact = () => {
  return (
    <div className="contact">
      <div className="contactTitle">
        <h1>~Get in touch~</h1>
      </div>

      <div className="contactImage">
        <img src={factoryImg} />
      </div>

      <div className="contactAddr">
        <h2>Cotton Candy Street 42</h2>
      </div>

      <div className="contactAddr2">
      <h2>12345 Candyland</h2>
      </div>

      <div className="contactNum">
      <h2>+8891730876436</h2>
      </div>

    </div>
  );
};
