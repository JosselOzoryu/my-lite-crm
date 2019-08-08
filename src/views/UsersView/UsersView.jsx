//Core imports
import React from "react";
import firestore from "service/firestore";

import Modal from "@material-ui/core/Modal";
import AddUserForm from "components/AddUserForm";
import UserCard from "components/UserCard";
import SideBar from "components/SideBar";
import Fab from "@material-ui/core/Fab";
import { Add as AddIcon } from "@material-ui/icons";

import "./UsersView.scss";

class UsersView extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [], modalIsOpen: false };
    this.originalData = [];
  }
  renderUsers = () => {
    return this.state.data
      .filter(user => user.active === true)
      .map(user => {
        return (
          <div className="users-view__users-grid__item" key={user.id}>
            <UserCard user={user} onUpdate={this.getUsers} />
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

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  getUsers = () => {
    firestore
      .getUsers()
      .then(users => {
        this.setState({ data: users });
        this.originalData = users;
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentDidMount = () => {
    this.getUsers();
  };

  render() {
    const { modalIsOpen } = this.state;
    return (
      <React.Fragment>
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
          <Fab
            className="users-view__add-product-fab"
            color="primary"
            aria-label="Add"
            onClick={this.openModal}
          >
            <AddIcon />
          </Fab>
        </section>
        <Modal
          className="users-view__add-product-modal"
          aria-labelledby="modal-agregar-producto"
          aria-describedby="Formulario para agregar producto"
          open={modalIsOpen}
          disableAutoFocus={true}
          onClose={() => {
            this.closeModal();
          }}
        >
          <AddUserForm
            onClose={() => {
              this.closeModal();
              this.getUsers();
            }}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

export default UsersView;
