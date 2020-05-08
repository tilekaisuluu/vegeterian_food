import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView
} from 'react-native'
import * as firebase from 'firebase';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '', 
      passwordConfirm: '',
    }
  }
onSignupPress = () => {
  if (this.state.password !== this.state.passwordConfirm) {
    Alert.alert("Passwords do not match");
    return;
  }
  firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => { }, (error) => {
      Alert.alert(error.message);

    })
}

  render() {
    const { navigate } = this.props.navigation;

    return (
      <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container1}>
      <View style={styles.container}>
          <Text style={styles.header}>vegeterian food</Text>
          <Text style={styles.text}>Let's start the registration</Text>
        <TextInput          
          value={this.state.email}
          style={styles.input}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='white'
          keyboardType="email-address"
          onChangeText={(text) => {this.setState({email: text})}}
        />
        <TextInput
          value={this.state.password}
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={(text) => {this.setState({password: text})}}
        />
        <TextInput
          value={this.state.passwordConfirm}
          style={styles.input}
          placeholder='Password confirm'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={(text) => {this.setState({passwordConfirm: text})}}

        />
        

        <TouchableOpacity 
            style={styles.buttonContainer}
            onPress={this.onSignupPress}>
            <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={styles.buttonContainer}
            onPress={() => navigate('Welcome')}>
            <Text style={styles.buttonText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container1: {
    flex:1
  },
  input: {
    width: 300,
    height: 40,
    backgroundColor: '#000000',
    margin: 5,
    padding: 8,
    color: '#fff',
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
      color: '#000000'
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
}
})