import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer'

import FoodListScreen from './app/src/screens/FoodListScreen';
import LoginScreen from './app/src/screens/LoginScreen';
import FoodFormScreen from './app/src/screens/FoodFormScreen';
import FoodDetailScreen from './app/src/screens/FoodDetailScreen';
import Profile from './app/src/screens/Profile'


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


    const AppDrawerNavigator = createDrawerNavigator({
      MyProfile: Profile
    },
    {
      contentComponent: (props) => <Sidebar />
    }
    )


    const AppContainer = createAppContainer(createSwitchNavigator(
      {
        App: AppStack,
        Auth: AuthNavigator,
        Drawer: AppDrawerNavigator 

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





