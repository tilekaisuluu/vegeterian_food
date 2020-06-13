import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ImageBackground
} from 'react-native';
import { Button, Text } from 'react-native-elements'
import { withFormik } from 'formik';
import * as yup from 'yup';

const AuthForm = (props) => {

  displayNameInput = (
    <View>
      <TextInput
        style={styles.formInput}
        onChangeText={text => props.setFieldValue('displayName', text)}
        placeholder='Display Name'
        placeholderTextColor = "#fff"
      />
      <Text style={styles.validationText}>{props.errors.displayName}</Text>
    </View>
  );

  return (
    <ImageBackground source={require('./frukty.jpg')}
    style={styles.container}
    >

    <View style={styles.container}>
      <Text h2 style={styles.header}>Good Food</Text>
      {props.authMode === 'signup' ? displayNameInput : null}
      <View style={styles.container1}>
      <TextInput
        style={styles.formInput}
        onChangeText={text => props.setFieldValue('email', text)}
        placeholder='email'
        placeholderTextColor = "#fff"
      />
      <Text style={styles.validationText}> {props.errors.email}</Text>
      <TextInput
        style={styles.formInput}
        secureTextEntry={true}
        onChangeText={text => props.setFieldValue('password', text)}
        placeholder='password'
        placeholderTextColor = "#fff"
      />
      <Text style={styles.validationText}> {props.errors.password}</Text>
      
      <Button
        onPress={() => props.handleSubmit()}
        buttonStyle={styles.buttonContainer}
        title={props.authMode === 'login' ? 'Login' : 'Sign Up'} />
      <Button
        backgroundColor='transparent'
        color='black'
        buttonStyle={styles.buttonContainer}
        onPress={() => props.switchAuthMode()}
        title={props.authMode === 'login' ? 'Create an account' : 'Login'} />
        
        </View>
    </View>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  header: {
    fontFamily: "Cochin",
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: "center",
    marginTop: 64
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  validationText: {
    marginTop: 4,
    marginBottom: 4,
    color: 'red',
    alignSelf: 'center'
  },
  formInput: {
    width: 300,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 10,
    height: 50,
    borderRadius: 10,
    color: '#000000',
  },
  loginButton: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
  },
  buttonContainer:{
    width: 300,
    backgroundColor: '#000000',
    paddingVertical: 15,
    margin: 10,
    borderRadius: 10
},
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
},
  switchButton: {
    width: 200,
    backgroundColor: '#3f51b5'
  },
  container1: {
    marginBottom: 16    
  }
});

export default withFormik({
  mapPropsToValues: () => ({ email: '', password: '', displayName: '' }),
  validationSchema: (props) => yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(10).required(),
    displayName: props.authMode === 'signup' ?
      yup.string().min(5).required() : null
  }),
  handleSubmit: (values, { props }) => {
    props.authMode === 'login' ? props.login(values) : props.signup(values)
  },
})(AuthForm);