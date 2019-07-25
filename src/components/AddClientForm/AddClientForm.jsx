import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import moment from "moment";

import "./AddClientForm.scss";

export default class AddClientForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      iduser: 0,
      name: "",
      lastname: "",
      email: "",
      address: "",
      phone: "",
      creationDate: ""
    };
  }

  handleInputs = event => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const {
      iduser,
      name,
      lastname,
      email,
      address,
      phone,
      creationDate
    } = this.state;
    let currentClients = JSON.parse(localStorage.getItem("clients"));

    currentClients.push({
      iduser,
      name,
      lastname,
      email,
      address,
      phone,
      creationDate
    });
    console.log(currentClients);
    localStorage.setItem("clients", JSON.stringify(currentClients));
    this.setState({
      iduser: 0, // cambiar con el id del usuario que lo está creando.
      name: "",
      lastname: "",
      email: "",
      address: "",
      phone: "",
      creationDate: moment().format("DD/MM/YYYY")
    });
  };

  render() {
    const {
      iduser,
      name,
      lastname,
      email,
      address,
      phone,
      creationDate
    } = this.state;
    return (
      <form onSubmit={this.onSubmit} class="mla-add-client-form">
        <Card className="mla-add-client-form">
          <TextField
            id="standard-name"
            label="Nombre"
            value={name}
            name="name"
            onChange={this.handleInputs}
            margin="normal"
          />
          <TextField
            id="standard-name"
            label="Apellido"
            value={lastname}
            name="lastname"
            onChange={this.handleInputs}
            margin="normal"
          />
          <TextField
            id="standard-name"
            label="Correo electrónico"
            value={email}
            name="email"
            onChange={this.handleInputs}
            margin="normal"
          />
          <TextField
            id="standard-name"
            label="Dirrección"
            value={address}
            name="address"
            onChange={this.handleInputs}
            margin="normal"
          />
          <TextField
            id="standard-name"
            label="Teléfono"
            value={phone}
            name="phone"
            onChange={this.handleInputs}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            <span onClick={this.onSubmit}> Agregar</span>
          </Button>
        </Card>
      </form>
    );
  }
}
