import React from "react";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import firebaseService from "service/firestore";

import Logo from 'components/common/Logo';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import "./SignIn.scss";

class SignIn extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    }
  }

  authenticateUser = () => {
    const { email, password } = this.state;
    firebaseService.userSignIn(email, password).then((response) => {

    }).catch((error) => {
      console.error(error);
    });
  }

  registerUser = () => { }

  handleInputs = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  }

  logOut = () => {
    firebaseService.userSignOut().then((response) => {
      console.log(response);
      alert('bye');
    }).catch((error) => {
      console.error(error);
    })
  }

  render() {
    const { email, password } = this.state;
    return (
      <FirebaseAuthConsumer>
        {(authState) => {
          if (authState.isSignedIn) {
            return (
              <div>
                {`Bienvenido ${authState.user.displayName}`}
                <button onClick={this.logOut}>Log out</button>
              </div>
            );
          } else {
            return (
              <div className="mlc-login">
                <Logo className="mlc-login__logo" width="65px" height="35px" />
                <p className="mlc-login__welcome-message">
                  Inicia sesión con tu cuenta.
                </p>
                <form className="mlc-login__form" action="">
                  <TextField
                    required
                    id="standard-name"
                    label="Email"
                    value={email}
                    onChange={this.handleInputs}
                    margin="normal"
                    variant="outlined"
                    name="email"
                  />
                  <TextField
                    required
                    id="standard-name"
                    label="Password"
                    value={password}
                    onChange={this.handleInputs}
                    margin="normal"
                    variant="outlined"
                    name="password"
                    type="password"
                  />
                  <Button variant="contained" onClick={this.authenticateUser}>
                    Sign In
                  </Button>
                  {/* <Button
                    className="mlc-login__button"
                    label="Sign In"
                    action={}
                  /> */}
                </form>
              </div>
            );
          }
        }}
      </FirebaseAuthConsumer>
    )
  }
}

export default SignIn;
