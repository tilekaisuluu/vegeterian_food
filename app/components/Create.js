import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';



class Create extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text>Create</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Create; 
