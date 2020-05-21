import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button
} from 'react-native';
import FoodForm from './FoodForm';

export default class FoodFormScreen extends Component {
    
    state = {
        foodName: null,
        category: null,
        currentSubIngredient: null,
        subIngredients: []
    }

    setFoodName = (text) => {
        this.setState(prevState => ({
            foodName: prevState.foodName = text
        }))
    }

    setCategory = (text) => {
        this.setState(prevState => ({
            category: prevState.category = text
        }))
    }

    setCurrentSubIngredient = (text) => {
        this.setState( prevState => ({
            currentSubIngredient: prevState.currentSubIngredient = text
        }));
    }
    submitSubIngredients = () => {
        let ingredient = this.state.currentSubIngredient;

        if (ingredient && ingredient.length > 2) {
            this.setState( prevState => ({
                subIngredients: [...prevState.subIngredients, ingredient],
            }))
        }
    }
render() {
    console.log(this.state);
    return(
    <FoodForm
    setFoodName={this.setFoodName}
    setCategory={this.setCategory}
    setSubIngredients={this.setCurrentSubIngredient}
    submitSubIngredients={this.submitSubIngredients}
    ingredientArray={this.state.subIngredients}
    onFoodAdded={this.props.navigation.state.params}

    
    />
    );
}

}


const styles = StyleSheet.create({
    row: {
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32
    },
    container: {
        width: 300,
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 32
    },
    
  })
