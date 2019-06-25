import React from "react";
import { FirebaseAuthConsumer } from "@react-firebase/auth";

import "./SignIn.scss";
import googleLogo from "assets/googleLogo";

function SignIn(props) {
  return (
    <FirebaseAuthConsumer>
      {({ isSignedIn, user, providerId }) => {
        if (isSignedIn) {
          return "Welcome";
        } else {
          return (
            <div className="mlc-login">
              <span className="mlc-login__logo">My Lite CRM</span>
              <p>
                Inicia sesión con tu cuenta Google, da click en el bóton para
                autorizar el login
              </p>
              <button type="button" class="google-button">
                <span class="google-button__icon">{googleLogo}</span>
                <span class="google-button__text">Sign in with Google</span>
              </button>
            </div>
          );
        }
      }}
    </FirebaseAuthConsumer>
  );
}

export default SignIn;
