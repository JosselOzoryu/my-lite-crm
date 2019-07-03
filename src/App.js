import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import firebase from "firebase/app";
import "firebase/auth";
import config from "./fire";

import UserView from "views/UsersView";
import ProductsView from "views/ProductsView";
import ProductRegistryView from "views/ProductRegistryView";
import SigIn from "./components/SignIn";

import "./App.scss";
import "./styles/reset.scss";
import "./styles/grid.scss";
import "./reset.scss";
import DropdownMenu from "./components/DropdownMenu";

function App() {
  return (
    <Router>
      <FirebaseAuthProvider firebase={firebase} {...config}>
        <div className="App">
          <nav className="app-navbar">
            <div className="app-navbar__logo">My Lite CRM</div>
            <div className="app-bar__nav-items">
              <DropdownMenu />
              {/* <Link className="app-navbar__nav-items__nav-item" to="/users">
                Usuarios
              </Link>
              <Link className="app-navbar__nav-items__nav-item" to="/products">
                Productos
              </Link>
              <Link className='app-navbar__nav-items__nav-item' to='/products/add'>
                AgregarProductos
              </Link>
              <Link className="app-navbar__nav-items__nav-item" to="/sign-in">
                Sign In
              </Link> */}
            </div>
          </nav>
          <Route exact path="/" component={UserView} />
          <Route exact path="/users" component={UserView} />
          <Route exact path="/products" component={ProductsView} />
          <Route exact path="/products/add" component={ProductRegistryView} />
          <Route exact path="/sign-in" component={SigIn} />
        </div>
      </FirebaseAuthProvider>
    </Router>
  );
}

export default App;
