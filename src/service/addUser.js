import firestore from 'service/firestore';

function addUser({ avatar, birthday, email, last_name, name, role, password }) {
  return new Promise((resolve, reject) => {
    firestore.addAuthUser(email, password).then(() => {
      firestore.uploadImage(avatar).then((avatar) => {
        const user = { avatar, birthday, email, last_name, name, role };
        firestore.addUser(user).then(() => resolve()).catch(er => reject(er));
      })
        .catch(error => reject(error))
    }).catch(e => reject(e));
  })
}

export default addUser;
