import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, TextInput, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Category from './home/category';



class Home extends Component {
    render() {
        return(
            <SafeAreaView style={{flex: 1}}>
                <View style={{flex:1}}>
                    <View style={styles.container}>
                        <ScrollView scrollEventThrottle={16}>
                            <View style={{ height: 300, marginTop: 20}}>
                                <ScrollView>
                                    <Category imageUri={require('./pizza.jpg')} name="Tomato pizza"/>

                                </ScrollView>
                            </View>

                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>

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




export default Home; 
