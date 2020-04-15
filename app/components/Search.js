import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, TextInput, Platform, StatusBar} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'



class Search extends Component {


    render() {
        return(
            <SafeAreaView style={{flex: 1}}>
                <View style={{flex:1}}>
                    <View style={styles.container}>
                        <View style={styles.overlay}>
                            <Icon name="ios-search" size={20}/>
                            <TextInput 
                            underlineColorAndroid="transparent"
                            placeholder="explore new recipes"
                            placeholderTextColor="grey"
                            style={styles.textInput}
                            />
                        </View>
                    </View>
                    
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: "#dddddd"
    },
    overlay: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
        marginHorizontal: 20,
        shadowOffset: {width: 0, height: 0},
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 1,
        marginTop: Platform.OS == 'android' ? 30: null
    },
    textInput: {
        flex:1,
        fontWeight: '700',
        backgroundColor: 'white'
    }
})

export default Search; 
