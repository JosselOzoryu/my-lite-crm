import firebase from "firebase";
import * as firebaseApp from "firebase/app";
import fireConfig from "../fire";
import moment from 'moment';

class firebaseService {
  constructor() {
    firebaseApp.initializeApp(fireConfig);
    this.db = firebase.firestore();
    this.storage = firebaseApp.storage();
    this.auth = firebaseApp.auth();
  }

  isUserLoggedIn = () => {
    const user = this.auth.currentUser;
    return ({
      isLoggedIn: user ? true : false,
      user
    });
  }

  addUser = ({ avatar, birthday, email, last_name, name, role }) => {
    return new Promise((resolve, reject) => {
      const user = { avatar, birthday: moment(birthday).unix(), email, last_name, name, role, active: true, };
      this.db.collection("users").add(user).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  addAuthUser = (email, password) => {
    return new Promise((resolve, reject) => {
      this.auth.createUserWithEmailAndPassword(email, password).then(() => {
        resolve();
      }).catch((error) => {
        switch (error) {
          case 'auth/email-already-in-use':
            reject({ error, message: "Email no disponible" });
            break;
          case 'auth/invalid-email':
            reject({ error, message: "Email no válido" });
            break;
          case 'auth/weak-password':
            reject({ error, message: "Contraseña débil, usa una distinta" });
            break;
          default:
            reject(error);
            break;
        }
      });
    })
  }

  updateUser = ({ avatar, birthday, email, last_name, name, role, id }) => {
    return new Promise((resolve, reject) => {
      this.db.collection("users").doc(id).update({
        avatar,
        birthday,
        email,
        last_name,
        name,
        role,
      }).then(response => {
        resolve(response);
      }).catch((error) => {
        console.error(error);
        reject(error);
      })
    });
  }

  deleteUser = (id) => {
    return new Promise((resolve, reject) => {
      this.db.collection("users").doc(id).update({
        active: false,
      }).then(response => {
        resolve(response);
      }).catch((error) => {
        console.error(error);
        reject(error);
      })
    });
  }

  deleteAuthUser = (email) => {
    return new Promise((resolve, reject) => {
      this.auth.getUserByEmail(email).then(response => {
        const user = JSON.parse(response);
        this.auth.updateUser(user.email, {
          disabled: true
        }).then(response => {
          resolve();
        }).catch(e => {
          reject(e);
          alert(e);
        })
      }).catch(error => {
        reject(error);
        alert(error)
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
            querySnapshot.forEach(function (doc) {
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
      firebaseApp
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
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
            querySnapshot.forEach(function (doc) {
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
          vendor,
          active: true,
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  updateProduct = ({ description, image, name, price, vendor, id }) => {
    return new Promise((resolve, reject) => {
      this.db.collection("products").doc(id).update({
        description,
        image,
        name,
        price,
        vendor,
      }).then(response => {
        resolve(response);
      }).catch((error) => {
        console.error(error);
        reject(error);
      })
    });
  }

  deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
      this.db.collection("products").doc(id).update({
        active: false,
      }).then(response => {
        resolve(response);
      }).catch((error) => {
        console.error(error);
        reject(error);
      })
    });
  }

  // Clients

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
          creationDate,
          active: true,
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  updateClient = ({ name, last_name, address, email, phone, creationDate, id }) => {
    return new Promise((resolve, reject) => {
      this.db.collection("products").doc(id).update({
        name,
        last_name,
        address,
        email,
        phone,
        creationDate,
      }).then(response => {
        resolve(response);
      }).catch((error) => {
        console.error(error);
        reject(error);
      })
    });
  }

  deleteClient = (id) => {
    return new Promise((resolve, reject) => {
      this.db.collection("products").doc(id).update({
        active: false,
      }).then(response => {
        resolve(response);
      }).catch((error) => {
        console.error(error);
        reject(error);
      })
    });
  }

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
