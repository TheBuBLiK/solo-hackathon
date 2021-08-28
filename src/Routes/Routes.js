import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "../components/Header/Header";
import Home from "../components/Home/Home";
import ItemContextProvider from "../contexts/ItemContext";
import AddItem from "../components/AddItem/AddItem";
import ItemDetails from "../components/ItemDetails/ItemDetails";
import ItemContext from "../contexts/ItemContext";
import Footer from "../components/Footer/Footer";
import ItemsList from "../components/ItemsList/ItemsList";
import LogIn from "../components/Auth/LogIn";
import AuthContextProvider from "../contexts/AuthContext";
import SignUp from "../components/Auth/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import { CardTravel } from "@material-ui/icons";
import Cart from "../components/Cart/Cart";
import Purchase from "../components/Purchase/Purchase";

import AboutUs from "../components/Information/AboutUs";
import Contacts from "../components/Information/Contacts";
import Inventory from "../components/Inventory/Inventory";

import Favourites from "../components/Favourites/Favourites";

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <ItemContextProvider>
            <Header />
            <Switch>
              <Route exact path="/aboutus" component={AboutUs} />
              <Route exact path="/contacts" component={Contacts} />
              <ProtectedRoute exact path="/inventory" component={Inventory} />
              <ProtectedRoute exact path="/favourites" component={Favourites} />
              <ProtectedRoute exact path="/purchase" component={Purchase} />
              <ProtectedRoute exact path="/cart" component={Cart} />
              <Route exact path="/login" component={LogIn} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/" component={Home} />
              <Route exact path="/itemdetails/:id" component={ItemDetails} />
              <ProtectedRoute exact path="/additem" component={AddItem} />
            </Switch>
            <Footer />
          </ItemContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
