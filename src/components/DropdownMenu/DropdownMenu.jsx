import React from "react";
import { Link } from "react";

import "./DropdownMenu.scss";

class DropdownMenu extends React.Component {
  constructor() {
    super();

    this.state = {
      displayMenu: false
    };

    /* this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this); */
  }

  showDropdownMenu = event => {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener("click", this.hideDropdownMenu);
    });
  };

  hideDropdownMenu = () => {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdownMenu);
    });
  };

  render() {
    return (
      <div className="dropdown" style={{ background: "red", width: "200px" }}>
        <div className="button" onClick={this.showDropdownMenu}>
          {" "}
          My Setting{" "}
        </div>

        {this.state.displayMenu ? (
          <ul>
            <li>
              <Link to="/users">1</Link>
            </li>
            <li>
              <Link to="/products">2</Link>
            </li>
            <li>
              <Link to="/products/add">3</Link>
            </li>
            {/*             <li>
              <Link to="/sign-in" component={SigIn} />
            </li> */}
            <li>
              <a href="#Log Out">Log Out</a>
            </li>
          </ul>
        ) : null}
      </div>
    );
  }
}

export default DropdownMenu;
