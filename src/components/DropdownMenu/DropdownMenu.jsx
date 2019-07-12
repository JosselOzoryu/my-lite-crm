import React from "react";
import { Link } from "react-router-dom";

import "./DropdownMenu.scss";

class DropdownMenu extends React.Component {
  constructor() {
    super();

    this.state = {
      displayMenu: false
    };
  }

  handleMenuState = event => {
    console.log(event);
    this.setState({ displayMenu: !this.state.displayMenu });
  };

  render() {
    return (
      <div className="dropdown">
        <div className="button" onClick={this.handleMenuState}>
          {" Menu "}
        </div>

        {this.state.displayMenu ? (
          <ul>
            <li>
              <Link className="dropdown__link" to="/users">
               Usuarios
              </Link>
            </li>
            <li>
              <Link className="dropdown__link" to="/products">
               Productos
              </Link>
            </li>
            <li>
              <Link className="dropdown__link" to="/products/add">
               Agregar Productos
              </Link>
            </li>
            <li>
              <Link className="dropdown__link" to="/sign-in">
               Log In
              </Link>
            </li>
            <li>
              <a href="#Log Out">Log Out</a>
            </li>
          </ul>
        ) : (
          <React.Fragment />
        )}
      </div>
    );
  }
}

export default DropdownMenu;
