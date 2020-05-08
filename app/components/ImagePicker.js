import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, TextInput, View, Alert, Button, Text, TouchableOpacity } from 'react-native';

class FormData extends Component {
 constructor(props){
   super(props)
   this.state = {
    // myKey: '',
      key: '',
      text1: '',
      text2: '',
      getValue: '',
      infoValue:''
   };
 }
 savefunction = () => {

   let storedObject = {};
       storedObject.textval1 = text1;
       storedObject.textval2 = text2;
       try {
           AsyncStorage.setItem('allTextValue', JSON.stringify(storedObject));
       } catch (error) {
       }
 }
 getfunction = () => {
   try {
               AsyncStorage.getItem('allTextValue').then((infoValue) => {
               let resObject = JSON.parse(infoValue);
              let textval1 = resObject.text1
              let textval2 = resObject.text2
             }).done();
            } catch (error) {
            }
 }
render (){
   return(
     <View style={styles.MainContainer}>
        <Text style= {styles.TextComponentStyle}>User Form</Text>

        <TextInput
          placeholder="Enter User Email"
          onChangeText={(value) => this.setState({ text1: value})}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
        />

        <TextInput
          placeholder="Enter User Password"
           onChangeText={(value) => this.setState({ text2: value})}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
        />

        <Button    onPress={this.savefunction}
              title="Save key" color="#2196F3" />

        <Button  onPress={this.getfunction}
                    title="Get key" color="#2196F3" />
        <Text style={styles.text}> {this.state.getValue} </Text>
</View>
    );
  }
}

export default FormData;
const styles = StyleSheet.create({

MainContainer :{

justifyContent: 'center',
flex:1,
margin: 10,
},

TextInputStyleClass: {

textAlign: 'center',
marginBottom: 7,
height: 40,
borderWidth: 1,
// Set border Hex Color Code Here.
 borderColor: '#2196F3',

 // Set border Radius.
 borderRadius: 5 ,

},
text: {
  fontSize: 20,
  textAlign: 'center',
},

 TextComponentStyle: {
   fontSize: 20,
  color: "#000",
  textAlign: 'center',
  marginBottom: 15
 }
});





export default class AddScreen extends Component {


constructor(props) {
  super(props);
  this.state = {
   myKey: '',
   text1: '',
   text2: ''
  }
}

 getKey = async () => {
        try {
            const key = await AsyncStorage.getItem('@MySuperStore:key');
            const key1 = await AsyncStorage.getItem('@MySuperStore:key1');
            const key2 = await AsyncStorage.getItem('@MySuperStore:key2');

            this.setState({ myKey: value });
        } catch (error) {
            console.log("Error retrieving data" + error);
        }
    }
 async saveKey(text1, text2) {
    key = text1+text2;
    try {
        await AsyncStorage.setItem('@MySuperStore:key1', text1);
        await AsyncStorage.setItem('@MySuperStore:key2', text2);

        // OR

        await AsyncStorage.setItem('@MySuperStore:key', key);
    } catch (error) {
        console.log("Error saving data" + error);
    }
}

 <TextInput
   placeholder="CostType_input"
   value={this.state.mykey}
   onChangeText={(value) => this.setState({ text1: value})}
  />
<TextInput
   placeholder="Some_input"
   value={this.state.mykey}
   onChangeText={(value) => this.setState({ text2: value})}
  />
 <Button
   onPress={() => this.saveKey(this.state.text1, this.state.text2)}
   title="Save key"
  />













  import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


export default class Create extends React.Component {
    constructor() {
        super();
        this.state ={
            image: null,
            isLoaded: false,
            dish: '',
            ingredients: '',
            steps: '',
            notes: '',
            getValue: ''
        }
    }
getValue = async () => {
        AsyncStorage.getItem('input').then(value => 
            this.setState({ getValue: value })
            );
    };

    createRecipe =() => {
        if(this.state.dish){
            AsyncStorage.setItem('input', this.state.dish);
            this.setState({ dish: ''})
            alert('Data saved');

        }else{
            alert('Please fill the form');
        }
    };
    

      componentDidMount() {
        this.getPermissionAsync();
      }
    
      getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      };
    
      _pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            this.setState({ image: result.uri });
          }
    
          console.log(result);
        } catch (E) {
          console.log(E);
        }
        AsyncStorage.getItem("image").then(response => {
            this.setState({
              isLoaded: true,
              imageUri: response
            });
          })
      };
      

      
    

  render() {
    let { image } = this.state;

    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
          <View style={styles.imageContainer}>
          <Button style={styles.imageButton} title="Upload photo" onPress={this._pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>
        <TextInput
          style={styles.input}
          placeholder='Dish name'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={dish => this.setState({ dish: dish})}
          value={this.state.textInputData}
        />
        <TextInput
          style={styles.input}
          placeholder='Ingredients'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          value={this.state.textInputData}
        />
        <TextInput
          style={styles.input}
          placeholder='Steps'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={email => this.setState({email})}
        />
        <TextInput
          style={styles.input}
          placeholder='Notes'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={email => this.setState({email})}
        />
        
        

        <TouchableOpacity 
            style={styles.buttonContainer}
            onPress={this.createRecipe}>
        <Text style={styles.buttonText}>Create Recipe</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={styles.buttonContainer}
            onPress={this.getValue}>
        <Text style={styles.buttonText}>Display info</Text>
        </TouchableOpacity>

        <Text style={styles.displayText}> {this.state.getValue} </Text>
      </View>
    )
  }


  

}



const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 40,
    backgroundColor: '#000000',
    margin: 5,
    padding: 8,
    color: 'white',
    fontSize: 14,
    fontWeight: '500'
  },
  header: {
    fontFamily: "Cochin",
    fontSize: 32,
    color: '#000000',
    marginBottom: 80,
    fontWeight: 'bold',
    textAlign: "center",
},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  text: {
      fontSize: 12,
      marginBottom: 10,
      marginTop: 10,
      textAlign: 'center',
      color: 'white'
  },
  buttonContainer:{
    width: 300,
    backgroundColor: '#000000',
    paddingVertical: 15,
    margin: 10,
},
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
},
imageContainer: {
    borderWidth: 1,
    borderColor: "black",
    width: '80%',
    height: 150,
},
imageButton: {
    color: '#000000',
    textAlign: "center"
},
displayText: {
    fontSize: 20,
    textAlign: 'center',
    color: "#000000"
}
})