import React, { Component } from 'react';
import moment from 'moment';
import addUser from 'service/addUser';

import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { DropzoneArea } from 'material-ui-dropzone'
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import "moment/locale/es";
import './AddUserForm.scss';

export default class AddUserForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      avatar: null,
      birthday: moment(),
      name: '',
      lastName: '',
      email: '',
      role: '',
      image: null,
      password: '',
      snackBar: {
        open: false,
        variant: '',
        message: ''
      }
    }
  }

  openSnackBar = (variant, message) => {
    this.setState({
      snackBar: {
        open: true,
        variant,
        message,
      }
    });
  }

  closeSnackBar = () => {
    this.setState({
      snackBar: {
        open: false,
        variant: '',
        message: '',
      }
    });
  }

  handleInputs = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  }

  handleDateInput = (date) => {
    this.setState({ birthday: date })
  }

  handleFileUpload = (file) => {
    this.setState({ image: file[0] });
  }

  onAddProduct = () => {
    const { birthday, image, name, email, lastName, role, password } = this.state;
    const userData = { avatar: image, birthday, email, last_name: lastName, name, role, password };
    addUser(userData).then(() => {
      this.props.onClose();
      this.openSnackBar('success', 'Producto agregado con éxito');
    }).catch(e => {
      alert(e);
    })
    // firestore.uploadImage(image).then((avatar) => {
    //   const user = { avatar, birthday, email, last_name: lastName, name, role };
    //   firestore.addUser(user).then((response) => {
    //     this.props.onClose();
    //     this.openSnackBar('success', 'Producto agregado con éxito');
    //   }).catch(error => {
    //     console.error(error);
    //     this.openSnackBar('error', error.toString());
    //   });
    // });
  }

  render() {
    const { name, lastName, email, role, snackbarIsOpen, birthday, snackBar, password } = this.state;
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
          label="Apellidos"
          value={lastName}
          name="lastName"
          onChange={this.handleInputs}
          margin="normal"
        />
        <span className="mla-add-user-form__dropzone-title">Foto:</span>
        <div className="mla-add-user-form__dropzone-container">
          <DropzoneArea
            onChange={this.handleFileUpload}
            acceptedFiles={["image/*"]}
            filesLimit={1}
            maxFileSize={10000000}
            dropzoneClass="mla-add-user-form__dropzone"
            showPreviews={true}
            dropzoneText=""
            showPreviewsInDropzone={false}
          />
        </div>
        <MuiPickersUtilsProvider utils={MomentUtils} locale={'es'}>
          <DatePicker
            margin="normal"
            id="mui-pickers-date"
            label="Fecha de nacimiento"
            value={birthday}
            onChange={this.handleDateInput}
          />
        </MuiPickersUtilsProvider>
        <TextField
          className="col-sm-12 col-gl-4"
          label="Email"
          value={email}
          name="email"
          onChange={this.handleInputs}
          margin="normal"
          type="text"
        />
        <TextField
          className="col-sm-12 col-gl-4"
          label="Password"
          value={password}
          name="password"
          onChange={this.handleInputs}
          margin="normal"
          type="password"
        />
        <Select
          className="mla-add-user-form__role-select"
          value={role}
          onChange={this.handleInputs}
          name="role"
        >
          <MenuItem value={'user'}>Usuario</MenuItem>
          <MenuItem value={'admin'}>Admin</MenuItem>
        </Select>
        <Button variant="contained" color="primary" onClick={this.onAddProduct}>
          Registrar
        </Button>
        <Snackbar
          open={snackbarIsOpen}
          autoHideDuration={6000}
          onClose={this.closeSnackBar}>
          <SnackbarContent>
            {snackBar.message}
          </SnackbarContent>
        </Snackbar>
      </Card >
    )
  }
}
