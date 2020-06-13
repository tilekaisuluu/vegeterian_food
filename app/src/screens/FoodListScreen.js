import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  View,
  Button,
  VirtualizedList
} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { ListItem, Divider } from 'react-native-elements';
import { addFood, getFoods, signout } from '../api/FoodApi';

import ActionButton from 'react-native-action-button';


class Home extends Component {

  static navigationOptions = ({ navigation }) => {

    onSignedOut = () => {
      navigation.navigate('Auth');
    }

    return {
      title: 'Food List',
      headerRight: () =>
        <Button
          title='log out'
          onPress={() => signout(onSignedOut)} />

    }
  };


  state = {
    foodList: [],
    selectedIndex: 0
  }


  onFoodAdded = (food) => {
    this.setState(prevState => ({
      foodList: [...prevState.foodList, food]
    }));
  }

  onFoodDeleted = () => {
    var newFoodList = [...this.state.foodList]
    newFoodList.splice(this.state.selectedIndex, 1);

    this.setState(prevState => ({
      foodList: prevState.foodList = newFoodList
    }));

    this.props.navigation.popToTop();
  }


  onFoodsRecieved = (foodList) => {
    this.setState({ foodList });
  }

  componentDidMount() {
    getFoods(this.onFoodsRecieved);
  }
  componentWillUnmount() {
    getFoods(this.onFoodsRecieved);
  }


  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.foodList}
          ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'black' }} />}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <ListItem
                title={item.name}
                subtitle={item.category}
                leftAvatar={{
                  size: 'large',
                  rounded: false,
                  source: item.imageUri && { uri: item.imageUri }
                }}
                onPress={() => {
                  this.setState(prevState => ({ selectedIndex: prevState.selectedIndex = index }))
                  this.props.navigation.navigate('FoodDetail', { food: item, foodDeletedCallback: this.onFoodDeleted })

                }}
              />
            );
          }}
        />
        <ActionButton
          buttonColor='blue'
          onPress={() => this.props.navigation.navigate('FoodForm', { foodAddedCallback: this.onFoodAdded })}
        />
      </SafeAreaView>

    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listItem: {
    marginTop: 8,
    marginBottom: 8
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 30
  },
  subtitleStyle: {
    fontSize: 18
  },
  emptyTitle: {
    fontSize: 32,
    marginBottom: 16
  },
  emptySubtitle: {
    fontSize: 18,
    fontStyle: 'italic'
  }
});

export default Home; 