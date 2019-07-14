//Core imports
import React from 'react';
import moment from 'moment';

//Components
import Card from '@material-ui/core/Card';

//Styling imports
import "./UserCard.scss";

class UserCard extends React.Component {
  render() {
    const { avatar, id, name, last_name, birthday, email, role } = this.props.user;
    return (
      <Card className="user-card">
        <div className="user-card__row justify-center align-middle">
          <img className="user-card__avatar" src={avatar} alt="user avatar" />
        </div>
        <div className="user-card__row">
          <div className="user-card__detail-row space-between">
            <div className="user-card__detail-container">
              <span className="user-card__detail-container--label">ID: </span>
              <span className="user-card__detail-container--value">
                {id}
              </span>
            </div>
          </div>
        </div>
        <div className="user-card__row">
          <div className="user-card__detail-row space-between">
            <div className="user-card__detail-container">
              <span className="user-card__detail-container--label">
                Nombre:{" "}
              </span>
              <span>
                {`${name} ${last_name}`}
              </span>
            </div>
            <div className="user-card__detail-container">
              <span className="user-card__detail-container--label">Rol: </span>
              <span>{role}</span>
            </div>
          </div>
        </div>
        <div className="user-card__row wrap-content space-between">
          <div className="user-card__detail-container">
            <span className="user-card__detail-container--label">
              Fecha de nacimiento:{" "}
            </span>
            <span>{moment(birthday.toDate()).format('DD/MM/YYYY')}</span>
          </div>

          <div className="user-card__detail-container">
            <span className="user-card__detail-container--label">
              Usuario:{" "}
            </span>
            <span>{email}</span>
          </div>
        </div>
      </Card>
    );
  }
}

export default UserCard;
