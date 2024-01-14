import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {Amplify} from "aws-amplify";
import awsmobile from "./aws-exports";

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
