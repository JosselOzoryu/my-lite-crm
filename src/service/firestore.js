import firebase from "firebase";
import * as firebaseApp from "firebase/app";
import fireConfig from "../fire";
import moment from 'moment';

class firebaseService {
  constructor() {
    firebaseApp.initializeApp(fireConfig);
    this.db = firebase.firestore();
    this.storage = firebaseApp.storage();
  }

  addUser = ({ avatar, birthday, email, last_name, name, role }) => {
    return new Promise((resolve, reject) => {
      const user = { avatar, birthday: moment(birthday).format('X'), email, last_name, name, role };
      this.db.collection("users").add(user).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

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

  // Productos

  getProducts = () => {
    return new Promise((resolve, reject) => {
      try {
        const products = [];
        this.db
          .collection("products")
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(function(doc) {
              products.push({ id: doc.id, ...doc.data() });
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

  addProduct = ({ description, image, name, price, vendor }) => {
    return new Promise((resolve, reject) => {
      this.db
        .collection("products")
        .doc(generateUID())
        .set({
          description,
          image,
          name,
          price,
          vendor
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  addClient = ({ name, last_name, address, email, phone, creationDate }) => {
    return new Promise((resolve, reject) => {
      this.db
        .collection("clients")
        .doc(generateUID())
        .set({
          name,
          last_name,
          address,
          email,
          phone,
          creationDate
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  // Images 
  uploadImage = (image) => {
    return new Promise((resolve, reject) => {
      let storageRef = this.storage.ref(image.name);
      storageRef
        .put(image)
        .then(snapshot => {
          resolve(snapshot.ref.getDownloadURL());
        })
        .catch(error => {
          reject(error);
        });
    });
  };
}

function generateUID() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let autoId = "";
  for (let i = 0; i < 20; i++) {
    autoId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return autoId;
}

const fireBaseSingleton = Object.freeze(new firebaseService());
export default fireBaseSingleton;
