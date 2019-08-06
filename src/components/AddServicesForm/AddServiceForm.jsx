import React, { Component } from "react";
import firestore from "service/firestore";

import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import "moment/locale/es";
import "./AddServiceForm.scss";

export default class AddServiceForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serviceid: "",
      name: "",
      price: "",
      description: "",
      snackBar: {
        open: false,
        variant: "",
        message: ""
      }
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

  onAddService = () => {
      const service = { name, price, description } = this.state;
      firestore
        .addService(service)
        .then(response => {
          this.props.onClose();
          this.openSnackBar("success", "Servicio agregado con éxito");
        })
        .catch(error => {
          console.error(error);
          this.openSnackBar("error", error.toString());
        });
    };
  };

  render() {
    const {
     name,
     price,
     description
    } = this.state;
    return (
      <Card className="mla-add-user-form">
        <TextField
          className="col-sm-12 col-gl-4"
          label="Nombre"
          value={name}
          name="name"
          onChange={this.handleInputs}
          margin="normal"
        />
        <TextField
          className="col-sm-12 col-gl-4"
          label="Descripción"
          value={description}
          name="description"
          onChange={this.handleInputs}
          margin="normal"
        />
        <TextField
          className="col-sm-12 col-gl-4"
          label="Precio"
          value={price}
          name="price"
          onChange={this.handleInputs}
          margin="normal"
          type="text"
        />
        <Button variant="contained" color="primary" onClick={this.onAddService}>
          Registrar
        </Button>
        <Snackbar
          open={snackbarIsOpen}
          autoHideDuration={6000}
          onClose={this.closeSnackBar}
        >
          <SnackbarContent>{snackBar.message}</SnackbarContent>
        </Snackbar>
      </Card>
    );
  }
}
