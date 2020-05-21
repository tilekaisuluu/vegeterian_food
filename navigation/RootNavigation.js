import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainTabNavigator from '../navigation/MainTabNavigator';
import Welcome from '../app/components/Welcome';
import SignUp from '../app/components/SignUp';
import ForgotPassword from '../app/components/ForgotPassword';
import FoodFormScreen from '../app/components/FoodFormScreen';


const RootStackNavigator = createStackNavigator(
  {
    Login: { screen: Welcome },
    SignUp: { screen: SignUp },
    ForgotPassword: { screen: ForgotPassword },
    FoodFormScreen : { screen: FoodFormScreen },


    Main: { screen: () => <MainTabNavigator/> , },
  },
  {
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(RootStackNavigator);
export default AppContainer;
