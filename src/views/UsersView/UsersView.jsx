//Core imports
import React from "react";

import UserCard from "components/UserCard";
import SideBar from "components/SideBar";

import "./UsersView.scss";

import users from "users";

class UsersView extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: users };
  }
  renderUsers = () => {
    return this.state.data.map(user => {
      return <UserCard user={user} />;
    });
  };

  filterUsers = searchTerm => {
    if (searchTerm === "") {
      this.setState({ data: users });
    } else {
      const result = users.filter(user => {
        return user.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      this.setState({ data: result });
    }
  };

  render() {
    return (
      <section id="users-view">
        <div>
          <div className="users-view__side-bar">
            <SideBar onSearch={this.filterUsers}>
              esta vista es una pistola
            </SideBar>
          </div>
          <div className="users-view__users-grid">{this.renderUsers()}</div>
        </div>
      </section>
    );
  }
}

export default UsersView;
