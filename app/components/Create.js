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


const STORAGE_KEY = '@save_name'


export default class Create extends React.Component {
    state ={
        text: '',
        dish: '',
        ingredients: '',
        steps: '',
        notes: '',
        }

componentDidMount() {
    this.retrieveData()
}

retrieveData = async () => {
    try{
        const dish = await AsyncStorage.getItem(STORAGE_KEY)

            this.setState({dish, ingredients})
        
    }catch (e) {
        alert('failed to load data')
    }
}

save = async dish => {
    try{
        await AsyncStorage.setItem(STORAGE_KEY, dish)
        alert('Data successfully saved!')
        this.setState({dish})
    }catch (e) {
        alert('failed to save data')
    }
}

removeEverything = async () =>{
    try {
        await AsyncStorage.clear()
        alert('Storage successfully cleared')
    }catch (e) {
        alert('failed to clear')
    }
}
onChangeText = text => this.setState({ text })

onSubmitEditing = () => {
    const onSave = this.save
    const { text } = this.state

    if (!text) return 

    onSave(text)
    this.setState({ text: '' })
}


  render() {
    let { image } = this.state;
    const { text, dish } = this.state


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
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitEditing}
          value={text}
        />
        <TextInput
          style={styles.input}
          placeholder='Ingredients'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={value => this.setState({ dish: value})}

          value={this.state.textInputData}
        />
        <TextInput
          style={styles.input}
          placeholder='Steps'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={value => this.setState({ dish: value})}
        />
        <TextInput
          style={styles.input}
          placeholder='Notes'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={value => this.setState({ dish: value})}
        />
        
        

        <TouchableOpacity 
            style={styles.buttonContainer}
            onPress={this.saveKey}>
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

        <Text style={styles.displayText}> {dish} </Text>
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