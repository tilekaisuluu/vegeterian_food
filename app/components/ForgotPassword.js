import React from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';

export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    }
  }

onResetPasswordPress = () => {
  firebase.auth().sendPasswordResetEmail(this.state.email)
  .then(() => {
    Alert.alert("Password reset email has been sent.");
  }, (error) => {
    Alert.alert(error.message);
  });
    
}


  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
          <TextInput style={styles.input}
          value={this.state.email}
          placeholder='type your email'

          onChangeText={(text) => { this.setState({email: text}) }}/>
          

        <TouchableOpacity 
        style={styles.buttonContainer}
        onPress={this.onResetPasswordPress}>
        <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.buttonContainer}
        onPress={() => navigate('Welcome')}>
        <Text style={styles.buttonText}>Back to Login</Text>
        </TouchableOpacity>

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
}
})
