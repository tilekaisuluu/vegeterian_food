import React, { Component } from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Ionicons'
import Welcome from './app/components/Welcome';
import Home from './app/components/Home';
import Search from './app/components/Search';
import Create from './app/components/Create';
import Profile from './app/components/Profile';
import SignUp from './app/components/SignUp';





class App extends Component {
  render() {
    return <AppContainer />
  }
}
export default App;

const DashboardTabNavigator = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'HOME',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-home" color=
        {tintColor} size={24} />
        
      )
    }
  },
  Search: {
    screen: Search,
    navigationOptions: {
      tabBarLabel: 'SEARCH',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-search" color=
        {tintColor} size={24} />
      )
    }
  },
  Create: {
    screen: Create,
    navigationOptions: {
      tabBarLabel: 'CREATE',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-add-circle" color=
        {tintColor} size={24} />
      )
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'PROFILE',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-person" color=
        {tintColor} size={24} />
      )
    }
  }
})


const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: Welcome },
  Dashboard: { screen: DashboardTabNavigator },
  SignUp: { screen: SignUp }
});



const AppContainer = createAppContainer(AppSwitchNavigator);