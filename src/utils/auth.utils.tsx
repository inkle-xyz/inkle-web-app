import firebase from 'firebase';
import { auth, db, googleAuthProvider } from '../firebase.config';

const userCollection = db.collection('users');

const createUserInDb = (
  email: string,
  displayName?: string | null, photoUrl?: string | null,
): Promise<any> => new Promise((resolve) => {
  userCollection
    .doc(email)
    .set({
      email,
      displayName,
      photoUrl,
      createdAt: Date.now().toLocaleString(),
    }).then(() => {
      db.collection('users')
        .doc(email)
        .get()
        .then((user) => resolve(user));
    });
});

const authenticateUser = (): Promise<any> => new Promise(((resolve, reject) => {
  auth.signInWithPopup(googleAuthProvider).then((result) => {
    if (result.user) {
      const userFromAuth: firebase.User = result.user;

      if (userFromAuth?.email === null) {
        reject(Error('No Email!'));
      } else {
        const { email, photoURL, displayName } = userFromAuth;
        userCollection.doc(email).get().then((doc) => {
          if (doc.exists) {
            resolve(doc.data());
          }
          createUserInDb(email, displayName, photoURL).then((user) => resolve(user));
        });
      }
    } else {
      reject(Error('No User!'));
    }
  }).catch((error) => {
    reject(error.message);
  });
}));

export {
  createUserInDb,
  authenticateUser,
};
