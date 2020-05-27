import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import Profile from './app/components/profile';

const WIDTH = Dimensions.get('window').width;

const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: Profile
    }
})

export default createAppContainer(DrawerNavigator);