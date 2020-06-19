import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    Dimensions
} from 'react-native';
import { signout, getUserDetails } from '../api/FoodApi';
import 'firebase/firestore';


export default class Profile extends Component {
    state = {
        userDetails: []
    }

    onUserReceived = (userDetails) => {
        this.setState({ userDetails })
    }


    componentDidMount() {
        getUserDetails(this.onUserReceived)
    }


    onSignedOut = () => {
        navigation.navigate('Auth');
    }

    render() {
        const { userDetails } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.header}></View>
                <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
                <Text style={styles.name}>{userDetails.name}</Text>


                <Button
                    title='log out'
                    onPress={() => signout(this.onSignedOut)} />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
    },
    header: {
        backgroundColor: "#000000",
        height: 240,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 100
    },
    name: {
        marginTop: 10,
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: '200',
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    name: {
        fontSize: 28,
        color: "#696969",
        fontWeight: "600"
    },
    info: {
        fontSize: 16,
        color: "#00BFFF",
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00BFFF",
    },
});
