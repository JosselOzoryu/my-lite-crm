//Core imports
import React from "react";

//Components

//Styling imports
import "./UserCard.scss";

class UserCard extends React.Component {
    render() {
        return (
            <div className="user-card">
                <div className="user-card__row">
                    <img className="user-card__avatar">

                    </img>
                </div>
                <div className="user-card__row">
                    <div className="user-card__detail-row">
                        <div className="user-card__detail-container">
                            <span>
                                ID
                            </span>
                            <span>
                                NOMBRE:
                            </span>
                        </div>
                        <div className="user-card__detail-container">

                        </div>
                    </div>
                    <div className="user-card__detail-row">

                    </div>
                </div>
            </div>
        )
    }
}

export default UserCard;