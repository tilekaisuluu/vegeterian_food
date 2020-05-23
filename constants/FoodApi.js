import * as firebase from 'firebase';
import 'firebase/firestore';
import ApiKeys from './ApiKeys';
import {decode, encode} from 'base-64'





window.addEventListener = (x) => x;

if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }
   

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }


export function addFood(food, addComplete){
    food.createdAt = firebase.firestore.FieldValue.serverTimestamp();


    firebase.firestore()
    .collection('Foods')
    .add({food}).then((snapshot) => snapshot.get()
    ).then((foodData) => addComplete(foodData.data()))
    .catch((error) => console.log(error));
}

export async function getFoods(foodsRetrieved){


    var foodList = [];


    var snapshot = await firebase.firestore()
    .collection('Foods')
    .orderBy('createdAt')
    .get()


    snapshot.forEach((doc) => {
        foodList.push(doc.data());
    });

    console.log(foodList)
    foodsRetrieved(foodList);
}