//Core imports
import React from "react";

// Material components
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import clsx from "clsx";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import Fab from "@material-ui/core/Fab";
import { Add as AddIcon } from "@material-ui/icons";

import firestore from "service/firestore";
import moment from "moment";

// Local Components
import AddClientForm from "components/AddClientForm";
import SideBar from "components/SideBar";
import "./ClientsView.scss";

var clientsData = [];

function createClient(
  id: number,
  iduser: number,
  name: string,
  lastname: string,
  address: string,
  email: string,
  phone: number,
  creationDate: date
) {
  return { name, lastname, address, email, phone, creationDate };
}

// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
// }

// if (JSON.parse(localStorage.getItem("clients")) === null) {
//   let data = [];
//   for (var i = 0; i < 5; i++) {
//     data.push(
//       createClient(
//         i,
//         0,
//         i + "Client",
//         "Dummie",
//         "Client Street" + i,
//         "client@react.com",
//         getRandomInt(9000000000, 9999999999),
//         moment().format("DD/MM/YYYY")
//       )
//     );
//     if (i === 4) {
//       if (JSON.parse(localStorage.getItem("clients")) === null) {
//         localStorage.setItem("clients", JSON.stringify(data));
//       }
//     }
//   }
//   clientsData = data;
// } else {
//   clientsData = JSON.parse(localStorage.getItem("clients"));
// }
class ClientsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [] };
    this.originalData = [];
  }

  filterClients = searchTerm => {
    if (searchTerm === "") {
      this.setState({ data: clientsData });
    } else {
      const result = clientsData.filter(client => {
        return (
          client.iduser.includes(searchTerm) ||
          client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.phone.includes(searchTerm) ||
          client.creationDate.includes(searchTerm)
        );
      });
      this.setState({ data: result });
    }
  };

  orderClients = (property, order) => {
    const clients = [...this.state.data];
    clients.sort((a, b) => {
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
    this.setState({ data: clients });
  };

  clearOrder = () => {
    this.setState({ data: this.originalData });
  };

  // componentDidMount = () => {
  //   firestore.getUsers().then((users) => {
  //     this.setState({ data: users });
  //     this.originalData = users;
  //   }).catch((error) => {
  //     console.error(error);
  //   })
  // }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const { modalIsOpen } = this.state;
    return (
      <React.Fragment>
        <section id="users-view">
          <div className="users-view__side-bar">
            <SideBar
              onSearch={this.filterClients}
              //* Button to add clients on the sidebar
              //* It got replaced by a Fab button (Material-UI)
              // title={
              //   <h1 className="users-view__side-bar__title">
              //     <Link className="mla-app-bar__menu-item" to="/clients/add">
              //       <Button color="primary">Agregar cliente</Button>
              //     </Link>
              //   </h1>
              // }
            >
              <div className="users-view__side-bar__filter-and-order">
                <h2>Ordenar por:</h2>
                <span
                  className="users-view__side-bar__filter-and-order__filter"
                  onClick={() => {
                    this.orderClients("name", "asc");
                  }}
                >
                  Nombre - asc
                </span>
                <span
                  className="users-view__side-bar__filter-and-order__filter"
                  onClick={() => {
                    this.orderClients("name", "desc");
                  }}
                >
                  Nombre - desc
                </span>
              </div>
            </SideBar>
          </div>
          <div className="users-view__users-container">
            {/*<div className="users-view__users-grid">{this.renderUsers()}</div>*/}
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ID Usuario</TableCell>
                    <TableCell align="center">Nombre</TableCell>
                    <TableCell align="center">Apellido</TableCell>
                    <TableCell align="center">Dirección</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Teléfono</TableCell>
                    <TableCell align="center">Fecha de registro</TableCell>
                    <TableCell align="center ">Opciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clientsData.map(row => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.iduser}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.lastname}</TableCell>
                      <TableCell align="center">{row.address}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.phone}</TableCell>
                      <TableCell align="center">{row.creationDate}</TableCell>
                      <TableCell>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Grid
                              container
                              spacing={1}
                              direction="column"
                              alignItems="center"
                            >
                              <Grid item>
                                <ButtonGroup
                                  variant="contained"
                                  size="small"
                                  aria-label="Small contained button group"
                                >
                                  <Button color="primary">
                                    <Icon className={clsx("fa fa-pen")} />
                                  </Button>
                                  <Button>
                                    <Icon className={clsx("fa fa-trash")} />
                                  </Button>
                                </ButtonGroup>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </div>
          <Fab
            className="products-view__add-product-fab"
            color="primary"
            aria-label="Add"
            onClick={this.openModal}
          >
            <AddIcon />
          </Fab>
        </section>
        <Modal
          className="client-view__add-product-modal"
          aria-labelledby="modal-agregar-cliente"
          aria-describedby="Formulario para agregar cliente"
          open={modalIsOpen}
          disableAutoFocus={true}
          onClose={this.closeModal}
        >
          <AddClientForm />
        </Modal>
      </React.Fragment>
    );
  }
}

export default ClientsView;
