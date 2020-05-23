import React, { Component } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem , Divider } from 'react-native-elements';
import { addFood, getFoods } from '../../constants/FoodApi';
import ActionButton from 'react-native-action-button';


class Home extends Component {

state = { 
    foodList: [],
    currentFoodItem: null,
}


onFoodAdded = (food) => {
    console.log(food);
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
                            console.log(item);
                            return (
                                <ListItem
                                title={item.name}
                                subtitle={item.category}
                                onPress={() => this.props.navigation.navigate('FoodDetail', {food: item })}
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default Home; 
