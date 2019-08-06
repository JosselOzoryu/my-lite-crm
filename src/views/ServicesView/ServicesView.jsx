//Core imports
import React from "react";
import firestore from "service/firestore";

//Components imports
import ServiceCard from "components/ServiceCard";
import SideBar from "components/SideBar";

import Card from "@material-ui/core/Card";
import Modal from "@material-ui/core/Modal";
import AddServiceForm from "components/AddServicesForm";
import Fab from "@material-ui/core/Fab";
import { Add as AddIcon } from "@material-ui/icons";

//Style imports
import "./ServicesView.scss";

class ServicesView extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [] };
    this.originalData = [];
  }

  renderServices = () => {
    return this.state.data.map(service => {
      return (
        <div className="services-view__services-grid__item" key={service.id}>
          <ServiceCard user={service} />
        </div>
      );
    });
  };

  filterServices = searchTerm => {
    if (searchTerm === "") {
      this.setState({ data: this.originalData });
    } else {
      const result = this.originalData.filter(service => {
        return (
          service.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      this.setState({ data: result });
    }
  };

  orderService = (property, order) => {
    const services = [...this.state.data];
    services.sort((a, b) => {
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
    this.setState({ data: services });
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

  getServices = () => {
    firestore
      .getServices()
      .then(services => {
        this.setState({ data: services });
        this.originalData = services;
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentDidMount = () => {
    this.getServices();
  };

  render() {
    const { modalIsOpen } = this.state;
    return (
      <React.Fragment>
        <section id="services-view">
          <div className="services-view__side-bar">
            <SideBar
              onSearch={this.filterUsers}
              title={
                <h1 className="services-view__side-bar__title">Servicios</h1>
              }
            >
              <div className="services-view__side-bar__filter-and-order">
                <h2>Ordenar por:</h2>
                <span
                  className="services-view__side-bar__filter-and-order__filter"
                  onClick={() => {
                    this.orderservices("name", "asc");
                  }}
                >
                  Nombre - asc
                </span>
                <span
                  className="services-view__side-bar__filter-and-order__filter"
                  onClick={() => {
                    this.orderservices("name", "desc");
                  }}
                >
                  Nombre - desc
                </span>
              </div>
            </SideBar>
          </div>
          <div className="services-view__services-container">
            <div className="services-view__services-grid">
              {this.renderServices()}
            </div>
          </div>
          <Fab
            className="services-view__add-service-fab"
            color="primary"
            aria-label="Add"
            onClick={this.openModal}
          >
            <AddIcon />
          </Fab>
        </section>
        <Modal
          className="services-view__add-service-modal"
          aria-labelledby="modal-agregar-servicio"
          aria-describedby="Formulario para agregar servicio"
          open={modalIsOpen}
          disableAutoFocus={true}
          onClose={() => {
            this.closeModal();
          }}
        >
          <AddServiceForm
            onClose={() => {
              this.closeModal();
              this.getServices();
            }}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

export default ServicesView;
