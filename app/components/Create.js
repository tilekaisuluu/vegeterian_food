import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Keyboard
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';




export default class Create extends React.Component {
    constructor(props){
        super(props) 
            this.state={
                image: null,
                isLoaded: false,
                dish: '',
                ingredients: '',
                steps: '',
                notes: ''
            }
        }
    
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
          



getValue = async () => {

    let myArray = await AsyncStorage.getItem('myArray');
    let d = JSON.parse(myArray);
    //alert(d.dish + ' ' + d.ingredients + ' ' + d.steps + ' ' + d.notes);
    //alert(d)
    return d;
    console.log(d.dish)
    }; 

createRecipe = () => {
    try{
    const { dish, ingredients, steps, notes} = this.state;

    let myArray={
        dish: dish,
        ingredients: ingredients,
        steps: steps,
        notes: notes
    }

    AsyncStorage.setItem('myArray',
    JSON.stringify(myArray));
    Keyboard.dismiss();
    alert("data saved successfully")
}catch(error) {
    console.log("Error retrieving data" + error);
}
}

removeEverything = async () => {
    try {
      await AsyncStorage.clear()
      alert('Storage successfully cleared!')
    } catch (e) {
      alert('Failed to clear the async storage.')
    }
  }

    

  render() {
    let { image } = this.state;
    const { dish, ingredients, steps, notes } = this.state


    return (
      <View style={styles.container}>
      
        <ScrollView scrollEventThrottle={16}>

          <View style={styles.imageContainer}>
          <Button style={styles.imageButton} title="Upload photo" onPress={this._pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>
        <TextInput
          style={styles.input}
          placeholder='Dish name'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={value => this.setState({ dish: value})}
        />
        <TextInput
          style={styles.input}
          placeholder='Ingredients'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={value => this.setState({ ingredients: value})}

        />
        <TextInput
          style={styles.input}
          placeholder='Steps'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={value => this.setState({ steps: value})}
        />
        <TextInput
          style={styles.input}
          placeholder='Notes'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={value => this.setState({ notes: value})}
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
        <TouchableOpacity onPress={this.removeEverything} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Clear Storage</Text>
        </TouchableOpacity>
    <Text style={styles.displayText}>{dish}</Text>
    <Text style={styles.displayText}>{ingredients}</Text>

    <Text style={styles.displayText}>{steps}</Text>

    <Text style={styles.displayText}>{notes}</Text>

    </ScrollView>


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