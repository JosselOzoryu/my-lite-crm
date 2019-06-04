import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import UserCard from "components/UserCard";
import UserView from "views/UsersView";

import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="app-navbar">
          <div className="app-navbar__logo">
              My Lite CRM
          </div>
          <div className="app-bar__nav-items">
            <Link className="app-navbar__nav-items__nav-item" to="/users">Usuarios</Link>
          </div>
        </nav>
        <Route exact path="/" component={UserView} />
        <Route exact path="/users" component={UserView} />
      </div>
    </Router>
  );
}

export default App;
