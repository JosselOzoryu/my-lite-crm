import firebase from "firebase";
import * as firebaseApp from "firebase/app";
import fireConfig from "../fire";

class firebaseService {
  constructor() {
    firebaseApp.initializeApp(fireConfig);
    this.db = firebase.firestore();
  }

  addUserToDb = user => {
    this.db.collection("users").add(user);
  };

  getUsers = () => {
    return new Promise((resolve, reject) => {
      try {
        const users = [];
        this.db
          .collection("users")
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(function(doc) {
              users.push({ id: doc.id, ...doc.data() });
            });
            resolve(users);
          })
          .catch(queryError => {
            console.log("Error getting documents: ", queryError);
            reject({ error: `Error getting documents:  ${queryError}` });
          });
      } catch (error) {
        reject(error);
      }
    });
  };

  getUserFromDb = email => {
    return new Promise((resolve, reject) => {
      try {
        const userList = [];
        const usersRef = this.db.collection("users");
        var query = usersRef.where("email", "==", email.toString());
        query.get().forEach(user => {
          userList.push(user);
        });
        resolve(userList);
      } catch (error) {
        reject(error);
      }
    });
  };

  addProductToDB = product => {
    this.db.collection("products").add(product);
    this.db = firebase.firestore();
  };

  /*   getProductsFromDB = () => {
    return new Promise((resolve, reject) => {
      try {
        const productList = [];
        const productsRef = this.db.collection("products");
        var  productsRef.where.apply("name", "==", .toString());
        get().forEach(product => {
          productList.push(product);
        });
        resolve(productList);
      } catch (error) {
        reject(error);
      }
    });
  }; */

  getProductsFromDB = () => {
    return new Promise((resolve, reject) => {
      try {
        const products = [];
        this.db
          .collection("products")
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(function(doc) {
              const productData = doc.data();
              products.push({
                id: doc.id,
                ...productData
              });
            });
            resolve(products);
          })
          .catch(queryError => {
            console.log("Error getting documents: ", queryError);
            reject({ error: `Error getting documents:  ${queryError}` });
          });
      } catch (error) {
        reject(error);
      }
    });
  };

  userSignIn = (email, password) => {
    return new Promise((resolve, reject) => {
      const userList = this.getUserFromDb(email)
        .then(userList => userList)
        .catch(userError => {
          reject(userError);
        });

      if (userList.length !== 0) {
        firebaseApp
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      } else {
        reject({ code: 404, error: "User not in DB" });
      }
    });
  };

  userSignOut = () => {
    return new Promise((resolve, reject) => {
      firebaseApp
        .auth()
        .signOut()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
}

const fireBaseSingleton = Object.freeze(new firebaseService());
export default fireBaseSingleton;
