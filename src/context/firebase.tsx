import React, { createContext, useContext, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBQunwDb9e01Xd5-mGC2hkeSHtmbwsveWI',
  authDomain: 'inkle-xyz.firebaseapp.com',
  databaseURL: 'https://inkle-xyz.firebaseio.com',
  projectId: 'inkle-xyz',
  storageBucket: 'inkle-xyz.appspot.com',
  messagingSenderId: '446531057115',
  appId: '1:446531057115:web:14d723ad330f92f43fe3fe',
  measurementId: 'G-SLW1M3QVYD',
};

firebase.initializeApp(firebaseConfig);

type TrackingProviderProps = {
  children: React.ReactNode;
};

type CollectionType = firebase.firestore.CollectionReference<
  firebase.firestore.DocumentData
>;

type createUserOnFirebaseType = (
  email: string,
  password: string
) => Promise<void>;
type doUserLoginOnFirebaseType = (
  email: string,
  password: string
) => Promise<void>;
type logoutUserFromFirebaseType = () => Promise<void>;

type FirebaseState = {
  user: firebase.User | null;
  isFetchingUser: boolean;

  createUserOnFirebase: createUserOnFirebaseType;
  doUserLoginOnFirebase: doUserLoginOnFirebaseType;
  logoutUserFromFirebase: logoutUserFromFirebaseType;
};

const FirebaseContext = createContext<FirebaseState | undefined>(undefined);

function FirebaseProvider({ children }: TrackingProviderProps) {
  const firestore = firebase.firestore();
  const auth = firebase.auth();

  // AUTHENTICATION
  const [user, setUser] = useState<firebase.User | null>(null);
  const [isFetchingUser, setIsFetchingUser] = useState(true);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }

    setIsFetchingUser(false);
  });

  const createUserOnFirebase: createUserOnFirebaseType = (email, password) => new Promise(async (resolve, reject) => {
    try {
      const firebaseUser = await auth.createUserWithEmailAndPassword(
        email,
        password,
      );

      if (!firebaseUser.user) {
        reject();
        return;
      }

      await usersCollection.doc(firebaseUser.user.uid).set({
        email: firebaseUser.user.email,
      });

      resolve();
    } catch (e) {
      reject(e);
    }
  });

  const doUserLoginOnFirebase: doUserLoginOnFirebaseType = (email, password) => new Promise(async (resolve, reject) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);

      resolve();
    } catch (e) {
      reject(e);
    }
  });

  const logoutUserFromFirebase = async () => await auth.signOut();

  // FIRESTORE
  const usersCollection = firestore.collection('users');

  return (
    <FirebaseContext.Provider
      value={{
        createUserOnFirebase,
        doUserLoginOnFirebase,
        logoutUserFromFirebase,
        user,
        isFetchingUser,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

function useFirebase() {
  const context = useContext(FirebaseContext);

  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }

  return context;
}

export { FirebaseProvider, useFirebase };
