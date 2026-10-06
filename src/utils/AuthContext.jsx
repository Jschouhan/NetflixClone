import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
const AuthContext = createContext();
export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  async function signUp(email, password) {
    if (!auth || !db) {
      return Promise.reject(new Error('Firebase is not configured.'));
    }
    await createUserWithEmailAndPassword(auth, email, password);
    return setDoc(doc(db, 'users', email), {
      savedShows: [],
    });
  }
  function logIn(email, password) {
    if (!auth) {
      return Promise.reject(new Error('Firebase is not configured.'));
    }
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    if (!auth) {
      return Promise.reject(new Error('Firebase is not configured.'));
    }
    return signOut(auth);
  }
  useEffect(() => {
    if (!auth) {
      return undefined;
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}
export function UserAuth() {
  return useContext(AuthContext);
}
