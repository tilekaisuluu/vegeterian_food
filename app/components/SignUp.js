import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native'

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '', 
      password: '', 
      email: ''
    }
  }


  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
          <Text style={styles.header}>vegeterian food</Text>
          <Text style={styles.text}>Let's start the registration</Text>
        <TextInput
          style={styles.input}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={username => this.setState({username})}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={password => this.setState({password})}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={email => this.setState({email})}
        />
        

        <TouchableOpacity 
            style={styles.buttonContainer}
            onPress={() => navigate('Home')}

            >
                <Text style={styles.buttonText}>Sign Up</Text>
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
    color: '#000000',
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