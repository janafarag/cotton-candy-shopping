import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Contact } from "./pages/contact/contact";
import { Cart } from "./pages/cart/cart";
import { Checkout } from "./pages/checkout/checkout";
import { ShopContextProvider } from "./context/shop-context";
import {Details} from "./pages/details/details";

import {Amplify} from "aws-amplify";
import '@aws-amplify/ui-react/styles.css';
import awsmobile from "./aws-exports";
import { withAuthenticator } from '@aws-amplify/ui-react';


Amplify.configure(awsmobile);

function App() {



  return (

      <div className="App">
        <ShopContextProvider>
          <Router>
            <Navbar/>
            <Routes>
              <Route path="/" element={<Shop/>}/>
              <Route path="/contact" element={<Contact/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/checkout" element={<Checkout/>}/>
              <Route path="/details" element={<Details/>}/>
            </Routes>
          </Router>
        </ShopContextProvider>
      </div>
  );
}

export default withAuthenticator(App)



