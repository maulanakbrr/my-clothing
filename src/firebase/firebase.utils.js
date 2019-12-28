import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const configMyClothing ={
  apiKey: "AIzaSyBg2mo-UDGTvcrK3_nK0LwOORQMUn372vk",
  authDomain: "my-clothing-db-am95.firebaseapp.com",
  databaseURL: "https://my-clothing-db-am95.firebaseio.com",
  projectId: "my-clothing-db-am95",
  storageBucket: "my-clothing-db-am95.appspot.com",
  messagingSenderId: "264492541645",
  appId: "1:264492541645:web:2eea863f58999263f06b84",
  measurementId: "G-2HF6413EB9"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return ;
  
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  
  if (!snapShot.exists){
    const { displayName, email } = userAuth;
    const createdAt = new Date();
  
    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error){
      console.log('error creating user', error.message)
    }
  }

  return userRef;
} 

firebase.initializeApp(configMyClothing);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;