import firebase from 'firebase';
import { auth, db, googleAuthProvider } from '../firebase.config';
import { User } from '../interfaces/user.interface';

const userCollection = db.collection('users');

const createUserInDb = (
  id: string,
  email: string,
  displayName?: string | null, photoUrl?: string | null,
): Promise<User> => new Promise((resolve) => {
  userCollection
    .doc(id)
    .set({
      email,
      displayName,
      photoUrl,
      createdAt: new Date().toLocaleDateString(),
    }).then(() => {
      db.collection('users')
        .doc(id)
        .get()
        .then((user) => resolve(user));
    });
});

const authenticateUser = (): Promise<User> => new Promise(((resolve, reject) => {
  auth.signInWithPopup(googleAuthProvider).then((result) => {
    if (result.user) {
      const userFromAuth: firebase.User = result.user;

      if (userFromAuth?.email === null) {
        reject(Error('No Email!'));
      } else {
        const {
          email, photoURL, displayName, uid,
        } = userFromAuth;
        userCollection.doc(uid).get().then((doc) => {
          if (doc.exists) {
            resolve(doc.data());
          }
          createUserInDb(uid, email, displayName, photoURL).then((user) => resolve(user));
        });
      }
    } else {
      reject(Error('No User!'));
    }
  }).catch((error) => {
    reject(error.message);
  });
}));

const getCurrentUser = (): Promise<User> => new Promise((resolve) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      userCollection.doc(user.uid).get().then((u) => resolve({ ...u.data(), id: user.uid } as User));
    }
  });
});

export {
  createUserInDb,
  authenticateUser,
  getCurrentUser,
};
