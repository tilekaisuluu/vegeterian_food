import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Button
} from 'react-native';
import { signout } from '../api/FoodApi';
import * as firebase from 'firebase';
import 'firebase/firestore';


export default class Profile extends Component {

    state = {
        userDetails: []
    }

    fetchUserDetails = (userDetails) => {
        this.setState({ userDetails })
    }


    componentDidMount() {
        this.fetchUserDetails()
    }


    onSignedOut = () => {
        navigation.navigate('Auth');
    }

    render() {
        const { userDetails } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.name}>{userDetails.name}</Text>

                <Button
                    title='log out'
                    onPress={() => signout(onSignedOut)} />
            </View>

        );
    }
}

const styles = StyleSheet.create({

})