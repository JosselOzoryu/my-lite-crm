//Core imports
import React from "react";

//Styling imports
import "./UserCard.scss";

class UserCard extends React.Component {
    render() {
        return (
        <div className="user-card">
            <div className="row">
                <div className="profile-picture">
                    <img>
                    </img>
                </div>
                <div className="id-name">
                    <div className="id-container">
                        <span className="id-label">ID: </span>
                        <span className="id-value">123</span>
                    </div>
                    <div className="name-container">
                                <span className="name-label">NOMBRE: </span>
                                <span className="name-value">Rosa Meltrozo</span>
                    </div>
                </div>
            </div> 
            <div className="row">
                <div className="birhtdate-container">
                    <span className="birthdate-label"></span>  
                </div>
            </div>
            <div className="row">
            </div>
        </div>
        )
    }

}

export default UserCard;