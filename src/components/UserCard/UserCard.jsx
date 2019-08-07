//Core imports
import React from "react";
import moment from "moment";

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

//Styling imports
import "./UserCard.scss";

class UserCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      name: "",
      lastName: "",
      role: "",
      birthday: "",
      email: ""
    };
  }

  changeToEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
  };
  // canselEditMode = () => {
  //   this.setState({ editMode: !this.state.editMode });
  // };

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
            <Fab
              color="primary"
              aria-label="edit"
              onClick={this.changeToEditMode}
            >
              <SaveIcon />
            </Fab>
            <Fab
              color="secondary"
              aria-label="edit"
              onClick={this.changeToEditMode}
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
      </Card>
    );
  }
}

export default UserCard;
