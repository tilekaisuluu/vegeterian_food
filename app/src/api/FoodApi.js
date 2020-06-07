import * as firebase from 'firebase';
import 'firebase/firestore';
import ApiKeys from './ApiKeys';
import {decode, encode} from 'base-64'
import { v4 as uuidv4 } from 'uuid';




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


// addfood function is going if uploadFood will successful

//food is object, onFoodUploaded is callback, updating is boolean to update food later
export function uploadFood(food, onFoodUploaded, { updating }) {

  // if  food imageUri field set for food object, 
  if (food.imageUri) {
    // creating the file name for food image and split it  and pop the last part of the array, after i have only extencion jpg
    const fileExtension = food.imageUri.split('.').pop();
    console.log("EXT: " + fileExtension);
// creating a unique id for image 
    var uuid = uuidv4();
// creating unique file name for each of image and storage database
    const fileName = `${uuid}.${fileExtension}`;

    console.log(fileName);

// creating reference to a location in storage bucket on firebase to store file
    var storageRef = firebase.storage().ref(`foods/images/${fileName}`);
// put the file 'food.imageUri' 
// taking the uri that i have which is the path to the file on the local machine and put that into storage ref 
    storageRef.putFile(food.imageUri)
    // on is listen for the change in the event
      .on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          console.log("snapshot: " + snapshot.state);
          console.log("progress: " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100);

          if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            console.log("Success");
          }
        },
        error => {
          unsubscribe();
          console.log("image upload error: " + error.toString());
        },

        // getDownloadURL function fetches the url from storageRef
        () => {
          storageRef.getDownloadURL()
            .then((downloadUrl) => {
              console.log("File available at: " + downloadUrl);

              delete food.imageUri;

              // 
              if (updating) {
                console.log("Updating....");
                updateFood(food, onFoodUploaded);
              } else {
                console.log("adding...");
                addFood(food, onFoodUploaded);
              }
            })
        }
      )

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