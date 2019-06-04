//Core imports
import React from "react";

//Components

//Styling imports
import "./UserCard.scss";

class UserCard extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div className="user-card">
        <div className="user-card__row justify-center align-middle">
          <img className="user-card__avatar" src={user.avatar} />
        </div>
        <div className="user-card__row">
          <div className="user-card__detail-row space-between">
            <div className="user-card__detail-container">
              <span className="user-card__detail-container--label">ID: </span>
              <span className="user-card__detail-container--value">
                {user.id}
              </span>
            </div>
            <div className="user-card__detail-container">
              <span className="user-card__detail-container--label">
                Nombre:{" "}
              </span>
              <span>
                {`${user.name} ${user.middle_name} ${user.last_name}`}
              </span>
            </div>
          </div>
        </div>
        <div className="user-card__row wrap-content space-between">
          <div className="user-card__detail-container">
            <span className="user-card__detail-container--label">
              Fecha de nacimiento:{" "}
            </span>
            <span>{user.birthday}</span>
          </div>

          <div className="user-card__detail-container">
            <span className="user-card__detail-container--label">
              Usuario:{" "}
            </span>
            <span>{user.username}</span>
          </div>

          <div className="user-card__detail-container">
            <span className="user-card__detail-container--label">Rol: </span>
            <span>{user.role}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default UserCard;
