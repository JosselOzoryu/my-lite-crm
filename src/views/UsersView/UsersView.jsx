//Core imports
import React from "react";
import firestore from 'service/firestore';

import UserCard from "components/UserCard";
import SideBar from "components/SideBar";

import "./UsersView.scss";

class UsersView extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [] };
    this.originalData = [];
  }
  renderUsers = () => {
    return this.state.data.map(user => {
      return (
        <div className="users-view__users-grid__item" key={user.id}>
          <UserCard user={user} />
        </div>
      );
    });
  };

  filterUsers = searchTerm => {
    if (searchTerm === "") {
      this.setState({ data: this.originalData });
    } else {
      const result = this.originalData.filter(user => {
        return (
          user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.role.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      this.setState({ data: result });
    }
  };

  orderUsers = (property, order) => {
    const users = [...this.state.data];
    users.sort((a, b) => {
      if (a[property] < b[property]) {
        if (order === "asc") {
          return -1;
        } else {
          return 1;
        }
      }
      if (a[property] > b[property]) {
        if (order === "asc") {
          return 1;
        } else {
          return -1;
        }
      }
      return 0;
    });
    this.setState({ data: users });
  };

  clearOrder = () => {
    this.setState({ data: this.originalData });
  };

  componentDidMount = () => {
    firestore.getUsers().then((users) => {
      this.setState({ data: users });
      this.originalData = users;
    }).catch((error) => {
      console.error(error);
    })
  }

  render() {
    return (
      <section id="users-view">
        <div className="users-view__side-bar">
          <SideBar
            onSearch={this.filterUsers}
            title={<h1 className="users-view__side-bar__title">Usuarios</h1>}
          >
            <div className="users-view__side-bar__filter-and-order">
              <h2>Ordenar por:</h2>
              <span
                className="users-view__side-bar__filter-and-order__filter"
                onClick={() => {
                  this.orderUsers("name", "asc");
                }}
              >
                Nombre - asc
              </span>
              <span
                className="users-view__side-bar__filter-and-order__filter"
                onClick={() => {
                  this.orderUsers("name", "desc");
                }}
              >
                Nombre - desc
              </span>
            </div>
          </SideBar>
        </div>
        <div className="users-view__users-container">
          <div className="users-view__users-grid">{this.renderUsers()}</div>
        </div>
      </section>
    );
  }
}

export default UsersView;
