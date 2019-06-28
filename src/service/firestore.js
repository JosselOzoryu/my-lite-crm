import firebase from "firebase";
import * as firebaseApp from "firebase/app";
import fireConfig from "../fire";

class firebaseService {
  constructor() {
    firebaseApp.initializeApp(fireConfig);
    this.db = firebase.firestore();
  };

  addUserToDb = (user) => {
    this.db.collection("users").add(user);
  }

  getUserFromDb = (email) => {
    return new Promise((resolve, reject) => {
      try {
        const usersRef = this.db.collection("users");
        var query = usersRef.where("email", "==", email.toString());
        resolve(query.get());
      } catch (error) {
        reject(error);
      }
    })

  }

  userSignIn = (email, password) => {
    return new Promise((resolve, reject) => {
      firebaseApp.auth().signInWithEmailAndPassword(email, password).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      })
    });
  }

  userSignOut = () => {
    return new Promise((resolve, reject) => {
      firebaseApp.auth().signOut().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      })
    })

  }

}

const fireBaseSingleton = Object.freeze(new firebaseService());
export default fireBaseSingleton;