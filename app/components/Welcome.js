import React from 'react';
import { StyleSheet, View, Button, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { render } from 'react-dom';

export default class Welcome extends React.Component {
    state = {
        email: '',
        password: '',
        errorMessage: null
    }

    handleLogin = () => {
        const { email, password } = this.state;

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => this.setState({ errorMessage: error.message}));
    }

    
    
    static navigationOption = {
        header: null,
    }


render() {
    const { navigate } = this.props.navigation;


    return(
        
        <ImageBackground source={require('./frukty.jpg')}
        style={styles.container}
        >
            <View style={styles.container}>
            <Text style={styles.header}>vegeterian food</Text>
            <Text style={styles.text}>Healthy & Easy</Text>
            <View>
    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
            </View>

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
            onPress={this.handleLogin}

            >
                <Text style={styles.buttonText}>login</Text>
            </TouchableOpacity>
            <Text style={styles.text1}>Don't have an account?</Text>
            <Text 
            onPress={() => navigate('SignUp')}
            style={styles.text1}
            >Sign up</Text>
            </View>
        </ImageBackground>
    )
}
}



const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
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
