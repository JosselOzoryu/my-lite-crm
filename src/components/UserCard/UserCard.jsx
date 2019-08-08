//Core imports
import React from "react";
import moment from "moment";
import firestore from "service/firestore";

//Components
import Card from "@material-ui/core/Card";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import { Edit as EditIcon } from "@material-ui/icons";
import { Clear as ClearIcon } from "@material-ui/icons";
import { Undo as UndoIcon } from "@material-ui/icons";
import { Save as SaveIcon } from "@material-ui/icons";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

//Styling imports
import "./UserCard.scss";

class UserCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      dialogOpen: false,
      dialogContent: <React.Fragment />,
      name: "",
      lastName: "",
      role: "",
      birthday: new Date(),
      email: ""
    };
  }

  changeToEditMode = () => {
    this.setState({ editMode: true });
  };

  closeEditMode = () => {
    this.setState({ editMode: false });
  };

  handleInputs = event => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  openDialog = content => {
    this.setState({ dialogOpen: true, dialogContent: content });
  };

  closeDialog = () => {
    this.setState({ dialogOpen: false, dialogContent: <React.Fragment /> });
  };

  onDeleteUser = () => {
    this.openDialog(
      <React.Fragment>
        <DialogTitle id="alert-dialog-title">
          {"Seguro que quieres eliminar el usuario?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={this.closeDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={this.deleteUser} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  };

  onUpdateUser = () => {
    this.openDialog(
      <React.Fragment>
        <DialogTitle id="alert-dialog-title">
          {"Seguro que quieres editar el usuario?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={this.closeDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={this.updateUser} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  };

  deleteUser = () => {
    firestore
      .deleteUser(this.props.user.id)
      .then(() => {
        alert("Eliminado con exito");
        this.closeDialog();
        this.props.onUpdate();
      })
      .catch(e => alert(e));
  };

  updateUser = () => {
    const { name, lastName, role, birthday, email, password } = this.state;
    const { id, image } = this.props.user;
    firestore
      .updateUser({
        avatar: image,
        birthday,
        email,
        last_name: lastName,
        name,
        role,
        id
      })
      .then(() => {
        alert("Editado con exito");
        this.closeDialog();
        this.closeEditMode();
        this.props.onUpdate();
      })
      .catch(e => alert(e));
  };

  componentDidMount = () => {
    const { name, last_name, role, birthday, email } = this.props.user;
    this.setState({
      name,
      lastName: last_name,
      role,
      birthday,
      email
    });
  };

  render() {
    const {
      avatar,
      id,
      name,
      last_name,
      birthday,
      email,
      role
    } = this.props.user;
    const bdate =
      typeof birthday === "string"
        ? moment(birthday).format("DD/MM/YYYY")
        : moment(birthday.seconds).format("DD/MM/YYYY");
    return (
      <Card className="user-card">
        <div className="user-card__row justify-center align-middle">
          <img className="user-card__avatar" src={avatar} alt="user avatar" />
        </div>
        <div className="user-card__row">
          <div className="user-card__detail-row space-between">
            <div className="user-card__detail-container">
              <span className="user-card__detail-container--label">ID: </span>
              <span className="user-card__detail-container--value">{id}</span>
            </div>
          </div>
        </div>
        <div className="user-card__row">
          <div className="user-card__detail-row space-between">
            <div className="user-card__detail-container">
              {this.state.editMode ? (
                <React.Fragment>
                  <TextField
                    className=""
                    label="Nombre"
                    value={name}
                    name="name"
                    onChange={this.handleInputs}
                    margin="normal"
                  />
                  <TextField
                    className=""
                    label="Apellidos"
                    value={last_name}
                    name="last_Name"
                    onChange={this.handleInputs}
                    margin="normal"
                  />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <span className="user-card__detail-container--label">
                    Nombre:{" "}
                  </span>
                  <span>{`${name} ${last_name}`}</span>
                </React.Fragment>
              )}
            </div>
            <div className="user-card__detail-container">
              {this.state.editMode ? (
                <React.Fragment>
                  <span className="user-card__detail-container--label">
                    Rol:{" "}
                  </span>
                  <Select
                    className="mla-add-user-form__role-select"
                    value={role}
                    onChange={this.handleInputs}
                    name="role"
                  >
                    <MenuItem value={"user"}>Usuario</MenuItem>
                    <MenuItem value={"admin"}>Admin</MenuItem>
                  </Select>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <span className="user-card__detail-container--label">
                    Rol:{" "}
                  </span>
                  <span>{role}</span>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
        <div className="user-card__row wrap-content space-between">
          <div className="user-card__detail-container">
            <span className="user-card__detail-container--label">
              Fecha de nacimiento:{"  "}
            </span>
            <span>{bdate}</span>
          </div>
          <div className="user-card__detail-container">
            <span className="user-card__detail-container--label">
              Usuario:{" "}
            </span>
            <span>{email}</span>
          </div>
        </div>
        {this.state.editMode ? (
          <div>
            <Fab aria-label="edit" onClick={this.changeToEditMode}>
              <UndoIcon />
            </Fab>
            <Fab color="primary" aria-label="edit" onClick={this.onUpdateUser}>
              <SaveIcon />
            </Fab>
            <Fab
              color="secondary"
              aria-label="edit"
              onClick={this.onDeleteUser}
            >
              <ClearIcon />
            </Fab>
          </div>
        ) : (
          <Fab
            color="primary"
            aria-label="edit"
            onClick={this.changeToEditMode}
          >
            <EditIcon />
          </Fab>
        )}
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.closeDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {this.state.dialogContent}
        </Dialog>
      </Card>
    );
  }
}

export default UserCard;
