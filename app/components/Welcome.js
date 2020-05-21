import React from 'react';
import { StyleSheet, View, Button, Text, TextInput, TouchableOpacity, ImageBackground, Alert, KeyboardAvoidingView, Platform, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { render } from 'react-dom';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';


export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '', 
        };
    }

onLoginPress = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {

        }, (error) => {
            Alert.alert(error.message);
        });

}


    
    static navigationOption = {
        header: null,
    }


render() {
    const { navigate } = this.props.navigation;


    return(
        <KeyboardAvoidingView
        style={styles.container1}
      >
        <ImageBackground source={require('./frukty.jpg')}
        style={styles.container}
        >
            <View style={styles.container}>
            <Text style={styles.header}>vegeterian food</Text>
            <Text style={styles.text}>Healthy & Easy</Text>

            <TextInput 
                    placeholder="email"
                    placeholderTextColor = "#fff"
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={ (email) => this.setState({email})}
                    value={this.state.email}
                    />
                    <TextInput 
                    placeholder="password"
                    placeholderTextColor = "#fff"
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={ (password) => this.setState({password})}
                    value={this.state.password}
                    secureTextEntry
                    />

            <TouchableOpacity 
            style={styles.buttonContainer}
            onPress={this.onLoginPress}>
            <Text style={styles.buttonText}>login</Text>
            </TouchableOpacity>
            <Text style={styles.text1}>Don't have an account?</Text>
            <Text 
            onPress={() => navigate('SignUp')}
            style={styles.text1}>Sign up</Text>
            <Text 
            onPress={() => navigate('ForgotPassword')}
            style={styles.text1}>Forgot Password?</Text>
            </View>
        </ImageBackground>
    </KeyboardAvoidingView>
        
    )
}
}



const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container1: {
        flex: 1
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
       
    },
    header: {
        fontFamily: "Cochin",
        fontSize: 32,
        color: '#fff',
        marginBottom: 80,
        fontWeight: 'bold',
        textAlign: "center",
    },
    text:{
        fontSize: 42,
        color: '#fff',
        marginBottom: 180,
        fontWeight: 'bold',
    },
      input: {
        width: 300,
        padding: 16,
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginHorizontal: 10,
        height: 50,
        color: '#fff',
        

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
    text1: {
        fontSize: 12,
        color: '#fff',
        marginBottom: 10,
        
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    }
});
