import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { reject } from 'q';

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

firebase.initializeApp(configMyClothing);

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
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items} = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
    
  }, {})
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;