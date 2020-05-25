import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import MainTabNavigator from '../navigation/MainTabNavigator';
import Welcome from '../app/components/Welcome';
import SignUp from '../app/components/SignUp';
import ForgotPassword from '../app/components/ForgotPassword';
import FoodFormScreen from '../app/src/screens/FoodFormScreen';
import FoodDetailScreen from '../app/src/screens/FoodDetailScreen';
import Home from '../app/components/Home';


  const AppStack = createStackNavigator({
    Home: { screen: Home },
    FoodForm : { screen: FoodFormScreen },
    FoodDetail: { screen: FoodDetailScreen },
  },
  {
    headerMode: 'none',
  }
  );

  
  const AuthNavigator = createSwitchNavigator({
    Login: { screen: Welcome },
    SignUp: { screen: SignUp },
    ForgotPassword: { screen: ForgotPassword },
  },
  {
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthNavigator
  },
  {
    initialRouteName: 'Auth',
  }
  ));

  export default class App extends Component {
    render() {
      return (
        <AppContainer/>

      )
    }
  }

