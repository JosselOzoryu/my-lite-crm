//Core imports
import React, { Component } from "react";
import firestore from "service/firestore";

//Material UI imports
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import moment from "moment";

//Style imports
import "./AddClientForm.scss";

export default class AddClientForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      iduser: 0,
      name: "",
      lastName: "",
      email: "",
      address: "",
      phone: "",
      creationDate: ""
    };
  }

  openSnackBar = (variant, message) => {
    this.setState({
      snackBar: {
        open: true,
        variant,
        message
      }
    });
  };

  closeSnackBar = () => {
    this.setState({
      snackBar: {
        open: false,
        variant: "",
        message: ""
      }
    });
  };

  handleInputs = event => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  onAddClient = () => {
    const { name, lastName, address, email, phone } = this.state;
    firestore
      .addClient({
        name,
        last_name: lastName,
        address,
        email,
        phone,
        creationDate: Date.now()
      })
      .then(response => {
        this.props.onClose();
        this.openSnackBar("success", "Cliente agregado con éxito");
        console.log(response);
      })
      .catch(error => {
        this.openSnackBar("error", error.toString());
        console.log(error);
      });
  };

  render() {
    const { name, lastName, email, address, phone } = this.state;
    return (
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
          value={lastName}
          name="lastName"
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
          <span onClick={this.onAddClient}> Agregar</span>
        </Button>
      </Card>
    );
  }
}
