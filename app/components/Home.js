import React, { Component } from 'react';
import { StyleSheet, FlatList, SafeAreaView, View, Button } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { ListItem , Divider } from 'react-native-elements';
import { addFood, getFoods } from '../../constants/FoodApi';
import ActionButton from 'react-native-action-button';


class Home extends Component {

 
state = { 
    foodList: [],
    currentFoodItem: null,
}


onFoodAdded = (food) => {
    this.setState(prevState => ({
        foodList: [...prevState.foodList, food]
    }));
}

onFoodsRecieved = (foodList) => {
    console.log(foodList);
    this.setState(prevState => ({
        foodList: prevState.foodList = foodList
    }));
}

componentDidMount() {
    getFoods(this.onFoodsRecieved);
}


    render() {  
        return(
            <SafeAreaView style={styles.container}>

                        <FlatList
                        data={this.state.foodList}
                        ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'black' }}/>}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => {
                            console.log(item)
                            return (
                                <ListItem
                                title={item.name}
                                subtitle={item.category}
                                onPress={() => {}}
                                />
                            );
                        }}
                        />
                         <ActionButton 
                        buttonColor='blue'
                        onPress={() => this.props.navigation.navigate('FoodForm', this.onFoodAdded)}
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