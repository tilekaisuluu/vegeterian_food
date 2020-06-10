import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  Image,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import { deleteFood } from '../api/FoodApi'

class FoodDetailScreen extends Component {

  static navigationOptions = () => {
    return {
      title: 'Food Details'
    }
  };

  render() {
    const food = this.props.navigation.getParam('food');

    const onFoodDeleted = this.props.navigation.getParam('foodDeletedCallback');

    console.log(food);
    return (
      <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Image style={styles.image} source={food.imageUri && { uri: food.imageUri}} /> 

        <Text style={styles.headerText}>{food.name}</Text>
        <Text style={styles.categoryText}>{food.category}</Text>
        <Text style={styles.notes}>{food.notes}</Text>


        <Text style={styles.ingredientText}>Ingredients:</Text>
        {
          food.subIngredients === undefined || food.subIngredients.length == 0 ?
            <Text>None</Text> : <FlatList
              data={food.subIngredients}
              contentContainerStyle={styles.listContainer}
              ItemSeparatorComponent={() =>
                <Divider style={{ backgroundColor: 'black' }} />}
              scrollEnabled={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) =>
                <Text style={styles.ingredientItemText}>{item}</Text>
              }
            />
        }
                <View style={styles.row}>
          <Icon
            reverse
            name='ios-create'
            type='ionicon'
            onPress={() =>
              this.props.navigation.navigate('FoodForm', {
                food: food
              })
            }
          />
          <Icon
            reverse
            name='ios-trash'
            type='ionicon'
            color='#CA300E'
            onPress={() =>
              Alert.alert(
                'Delete?',
                'Cannot be undone',
                [
                  { text: 'Cancel' },
                  { text: 'OK', onPress: () => { deleteFood(food, onFoodDeleted) } }
                ],
                { cancelable: false },
              )
            }
          />
        </View>
      </View >
      
      </ScrollView >
      </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold"

    

  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 16
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16
  },
  categoryText: {
    fontSize: 14,
    marginBottom: 32
  },
  notes: {
    fontSize: 14,
    marginBottom: 20,
    alignItems: 'center',
    borderLeftWidth: 15,
    textAlign: "center",

  },
  ingredientText: {
    fontStyle: 'italic',
    fontSize: 18,
    marginBottom: 20,
  },
  ingredientItemText: {
    fontSize: 16,
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 16
  },
  container: {
    flex: 1,
    width: 300,
    alignSelf: 'center',
    alignItems: 'center',
  },
  listContainer: {
    borderWidth: 0.5,
    width: 200,
    borderColor: 'grey'
  }
});

export default FoodDetailScreen;