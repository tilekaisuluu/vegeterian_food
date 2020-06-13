import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import FoodListScreen from './app/src/screens/FoodListScreen';
import LoginScreen from './app/src/screens/LoginScreen';
import FoodFormScreen from './app/src/screens/FoodFormScreen';
import FoodDetailScreen from './app/src/screens/FoodDetailScreen';
import LoadingScreen from './app/src/screens/LoadingScreen';





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

    const AppContainer = createAppContainer(createSwitchNavigator(
      {
        Loading: LoadingScreen,
        App: AppStack,
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





