import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Ionicons'


import FoodListScreen from './app/src/screens/FoodListScreen';
import LoginScreen from './app/src/screens/LoginScreen';
import FoodFormScreen from './app/src/screens/FoodFormScreen';
import FoodDetailScreen from './app/src/screens/FoodDetailScreen';
import LoadingScreen from './app/src/screens/LoadingScreen';
import ProfileScreen from './app/src/screens/ProfileScreen'





    const AppStack = createStackNavigator({
      FoodList: FoodListScreen,
      FoodForm: FoodFormScreen,
      FoodDetail: FoodDetailScreen,
    });
    

    const AuthNavigator = createStackNavigator({
      LoginRoute: {
        screen: LoginScreen,
        navigationOptions: () => ({
          headerShown: false
        })
      }
    });

    const AppTabNavigator = createBottomTabNavigator({
        Home: {
          screen: AppStack,
          navigationOptions: {
            tabBarLabel: 'HOME',
            tabBarIcon: ({ tintColor }) => (
              <Icon name="ios-home" color=
              {tintColor} size={24} />
              
            )
          }
        },
        Profile: {
          screen: ProfileScreen,
          navigationOptions: {
            tabBarLabel: 'PROFILE',
            tabBarIcon: ({ tintColor }) => (
              <Icon name="ios-person" color=
              {tintColor} size={24} />
            )
          }
        },  
    })

    const AppContainer = createAppContainer(createSwitchNavigator(
      {
        Loading: LoadingScreen,
        App: AppTabNavigator,
        Auth: AuthNavigator,
      },
      {
        initialRouteName: 'Auth',
      }
    ));
    



    export default class App extends Component {
      render() {
        return (
          <AppContainer
          />
        )
      }
    }





