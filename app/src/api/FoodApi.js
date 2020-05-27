import * as firebase from 'firebase';
import 'firebase/firestore';
import ApiKeys from './ApiKeys';
import {decode, encode} from 'base-64'





window.addEventListener = (x) => x;

if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }
   

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

export function login({ email, password }) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((value) => console.log(value))
  }
  
  export function signup({ email, password, displayName }) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userInfo) => {
        console.log(userInfo)
        userInfo.user.updateProfile({ displayName: displayName.trim() })
          .then(() => { })
      })
  }
  
  export function subscribeToAuthChanges(authStateChanged) {
    firebase.auth().onAuthStateChanged((user) => {
      authStateChanged(user);
    })
  }
  
  
  export function signout(onSignedOut) {
    firebase.auth().signOut()
      .then(() => {
        onSignedOut();
      })
  }


export function addFood(food, addComplete){
    food.createdAt = firebase.firestore.FieldValue.serverTimestamp();


    firebase.firestore()
    .collection('Foods')
    .add(food).then((snapshot) => snapshot.get()
    ).then((foodData) => addComplete(foodData.data()))
    .catch((error) => console.log(error));
}

export function updateFood(food, updateComplete) {
    food.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    console.log(food);

    firebase.firestore()
    .collection('Foods')
    .doc(food.id).set(food)
    .then(() => updateComplete(food))
    .catch((error) => console.log(error));
}


export function deleteFood(food, deleteComplete) {
    console.log(food);

    firebase.firestore()
    .collection('Foods')
    .doc(food.id).delete()
    .then(() => deleteComplete())
    .catch((error) => console.log(error));
}


export async function getFoods(foodsRetrieved){
    var foodList = [];

    var snapshot = await firebase.firestore()
    .collection('Foods')
    .orderBy('createdAt')
    .get()


    snapshot.forEach((doc) => {

        const foodItem = doc.data();
        foodItem.id = doc.id;
        foodList.push(foodItem);
    });

    console.log(foodList)
    foodsRetrieved(foodList);
}