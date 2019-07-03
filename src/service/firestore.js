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
        const userList = [];
        const usersRef = this.db.collection("users");
        var query = usersRef.where("email", "==", email.toString());
        query.get().forEach((user) => {
          userList.push(user);
        })
        resolve(userList);
      } catch (error) {
        reject(error);
      }
    })

  }

  userSignIn = (email, password) => {
    return new Promise((resolve, reject) => {
      const userList = this.getUserFromDb(email).then((userList) => userList).catch((userError) => {
        reject(userError);
      })

      if (userList.length !== 0) {
        firebaseApp.auth().signInWithEmailAndPassword(email, password).then((response) => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        })
      } else {
        reject({ code: 404, error: "User not in DB" });
      }
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