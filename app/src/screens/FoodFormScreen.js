import React, { Component } from 'react';
import FoodForm from '../ui/FoodForm';
import * as firebase from 'firebase';


export default class FoodFormScreen extends Component {

  static navigationOptopns = ({ navigation }) => {
    return {
      title: navigation.getParam('food') ? 'Edit food' : 'New food'
    }
  };


  state = {
    food: {
      name: null,
      category: null,
      notes: null,
      subIngredients: [],
    },
      currentSubIngredient: null,
  }

  componentDidMount () {
    const currentFood = this.props.navigation.getParam('food');

    if (currentFood) {
      this.setState(prevState => ({ food: prevState.food = currentFood}))
    }
  }

  onFoodUpdated = (food) => {
    this.props.navigation.popToTop( )
  }

  setCurrentSubIngredient = (text) => {
    this.setState(prevState => ({
      currentSubIngredient: prevState.currentSubIngredient = text
    }));
  }

  submitSubIngredients = () => {
    let ingredient = this.state.currentSubIngredient;

    if (ingredient && ingredient.length > 2) {
      this.setState(prevState => ({
        food : {...prevState.food, subIngredients: [...prevState.food.subIngredients, ingredient]},
      }))
    }
  }

  render() {
    return (
      <FoodForm
        setSubIngredients={this.setCurrentSubIngredient}
        submitSubIngredients={this.submitSubIngredients}
        food={this.state.food}
        onFoodAdded={this.props.navigation.getParam('foodAddedCallback')}
        onFoodUpdated={this.onFoodUpdated}
      />
    );
  }
}



