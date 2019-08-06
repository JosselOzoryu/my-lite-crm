//Core imports
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import firebase from "firebase/app";
import "firebase/auth";
import config from "./fire";

//Views import
import UserView from "views/UsersView";
import ClientView from "views/ClientsView";
import AddClientView from "views/AddClientView";
import ProductsView from "views/ProductsView";
import AddProductView from "views/AddProductView";
import ServicesView from "views/ServicesView";
//import ServiceCard from "components/ServiceCard";

//Components import
import SignIn from "./components/SignIn";
import AppNav from "components/AppNav";

//Style imports
import "./App.scss";
import "./styles/reset.scss";
import "./styles/grid.scss";

function App() {
  return (
    <Router>
      <FirebaseAuthProvider firebase={firebase} {...config}>
        <div className="App">
          <AppNav />
          <div className="mla-app__content">
            <Route exact path="/" component={UserView} />
            <Route exact path="/users" component={UserView} />
            <Route exact path="/clients" component={ClientView} />
            <Route exact path="/clients/add" component={AddClientView} />
            <Route exact path="/products" component={ProductsView} />
            <Route exact path="/products/add" component={AddProductView} />
            <Route exact path="/sign-in" component={SignIn} />
            <Route exact path="/services" component={ServicesView} />
          </div>
        </div>
      </FirebaseAuthProvider>
    </Router>
  );
}

export default App;
