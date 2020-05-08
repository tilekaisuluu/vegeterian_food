import React from 'react';
import { createAppContainer } from 'react-navigation';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Ionicons'
import Home from '../app/components/Home';
import Search from '../app/components/Search';
import Create from '../app/components/Create';
import Profile from '../app/components/Profile';



const MainTabNavigator = createBottomTabNavigator({
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
      },



  })
  const TabContainer = createAppContainer(MainTabNavigator);

  export default TabContainer;

