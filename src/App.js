import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import UserView from "views/UsersView";
import ProductsView from "views/ProductsView";

import "./App.scss";
import "./reset.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="app-navbar">
          <div className="app-navbar__logo">My Lite CRM</div>
          <div className="app-bar__nav-items">
            <Link className="app-navbar__nav-items__nav-item" to="/users">
              Usuarios
            </Link>
            <Link className="app-navbar__nav-items__nav-item" to="/products">
              Productos
            </Link>
          </div>
        </nav>
        <Route exact path="/" component={UserView} />
        <Route exact path="/users" component={UserView} />
        <Route exact path="/products" component={ProductsView} />
      </div>
    </Router>
  );
}

export default App;
