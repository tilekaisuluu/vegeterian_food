import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Divider, Icon } from 'react-native-elements';

class FoodDetailScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        console.log(navigation);
        return{
            title: 'Food Details',
            headerRight: (
                <Button
                onPress={() => {}}
                title='Edit'
                />
            )

        }
    };

    render(){
        const food = this.props.navigation.getParam('food');

        console.log(food);

        return(
            <View style={styles.container}>
                <Text style={styles.headerText}>{food.name}</Text>
                <Text style={styles.categoryText}>Category: {food.category}</Text>
                <Text style={styles.ingredientText}>Ingredients</Text>
                {
                    food.subIngredients === undefined || food.subIngredients.length == 0 ?
                    <Text>None</Text> : <FlatList
                    data={food.sunIngredients}
                    contentContainerStyle={styles.listContainer}
                    ItemSeparatorComponent={() => 
                    <Divider style={{ backgroundColor : 'black'}}/>}
                    scrollEnabled={false}
                    keyExtractor={({item}) => 
                <Text style={ styles.ingredientItemText}>{item}</Text>
            }
                />
            }


            </View>
        )
    }



}
const styles = StyleSheet.create({
    headerText: {
      fontSize: 32,
      marginBottom: 32
    },
    image: {
      width: '100%',
      aspectRatio: 2,
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
      fontSize: 20,
      marginBottom: 32
    },
    ingredientText: {
      fontStyle: 'italic',
      fontSize: 18,
      marginBottom: 32
    },
    ingredientItemText: {
      fontSize: 16,
      alignSelf: 'center',
      marginBottom: 16,
      marginTop: 16
    },
    container: {
      alignItems: 'center'
    },
    listContainer: {
      borderWidth: 0.5,
      width: 200,
      borderColor: 'grey'
    }
  });
  
  export default FoodDetailScreen;
