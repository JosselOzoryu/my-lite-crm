import React from "react";

import UserCard from "components/UserCard";

import "./UsersView.scss";

import users from "users";

class UsersView extends React.Component {
  renderUsers = () => {
    return users.map(user => {
      return <UserCard user={user} />;
    });
  };

  render() {
    return (
      <section id="users-view">
        <div className="users-view__users-grid">{this.renderUsers()}</div>
      </section>
    );
  }
}

export default UsersView;
