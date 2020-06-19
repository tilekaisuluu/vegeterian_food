import * as firebase from 'firebase';
import 'firebase/firestore';
import ApiKeys from './ApiKeys';
import { decode, encode } from 'base-64'
import { v4 as uuidv4 } from 'uuid';
import { uploadImage } from './helper';



window.addEventListener = (x) => x;

if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }


if (!global.btoa) { global.btoa = encode }

if (!global.atob) { global.atob = decode }

export function login({ email, password }) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((value) => console.log(value))
}

export function signup({ email, password, displayName }) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(cred => {
    return firebase.firestore().collection('users').doc(cred.user.uid).set({
      email: email,
      name: displayName,
    });
  })
}

export function subscribeToAuthChanges(authStateChanged) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) { userId = user.uid };
    authStateChanged(user);
  })
}


export function signout(onSignedOut) {
  firebase.auth().signOut()
    .then(() => {
      onSignedOut();
    })
}




export function updateFood(food, updateComplete) {
  food.updatedAt = firebase.firestore.FieldValue.serverTimestamp();

  firebase.firestore()
    .collection('Foods')
    .doc(food.id).set(food)
    .then(() => updateComplete(food))
    .catch((error) => console.error(error));
}


export function deleteFood(food, deleteComplete) {
  console.log(food);

  firebase.firestore()
    .collection('Foods')
    .doc(food.id).delete()
    .then(() => deleteComplete())
    .catch((error) => console.log(error));
}


export async function getFoods(foodsRetrieved) {
  await firebase.firestore()
    .collection('Foods')
    .orderBy('createdAt')
    .onSnapshot((snapshot) => {
      const foodList = [];

      snapshot.forEach((doc) => {
        const foodItem = doc.data();
        foodItem.id = doc.id;
        foodList.push(foodItem)
      });

      foodsRetrieved(foodList);
    })
}

export async function getUserDetails(userRetrieved) {
  let user = firebase.auth().currentUser
  await firebase.firestore()
    .collection('users')
    .doc(user.uid)
    .onSnapshot((doc) => {
      const userDetails = doc.data()
      userRetrieved(userDetails)
    })
}


export function uploadFood(food, onFoodUploaded, { updating }) {
  if (food.imageUri) {
    const fileExtension = food.imageUri.split('.').pop();
    var uuid = uuidv4();
    const fileName = `${uuid}.${fileExtension}`;

    uploadImage(firebase, food.imageUri, `foods/images/${fileName}`).then(downloadUrl => {
      food.imageUri = downloadUrl

      if (updating) {
        console.log("Updating....");
        updateFood(food, onFoodUploaded);
      } else {
        console.log("adding...");
        addFood(food, onFoodUploaded);
      }
    })

    // if there are no new image for food
  } else {
    console.log("Skipping image upload");

    delete food.imageUri;

    if (updating) {
      console.log("Updating....");
      updateFood(food, onFoodUploaded);
    } else {
      console.log("adding...");
      addFood(food, onFoodUploaded);
    }
  }
}

export function addFood(food, addComplete) {
  food.createdAt = firebase.firestore.FieldValue.serverTimestamp();
  food.createdBy = firebase.auth().currentUser.uid;

  firebase.firestore()
    .collection('Foods')
    .add(food)
    .then((snapshot) => {
      // we need id to update or delete food
      food.id = snapshot.id;
      snapshot.set(food);
    }).then(() => addComplete(food))
    .catch((error) => console.log(error));
}