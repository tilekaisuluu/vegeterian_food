import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  SafeAreaView,
  ScrollView
} from 'react-native';
import GridList from './GridList';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { addFood, updateFood } from '../api/FoodApi';
import FoodImagePicker from './ImagePicker'



const FoodForm = (props) => {
  setFoodImage = (image) => {
    props.setFieldValue('imageUri', image.uri);
  }

  console.log(props);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
    <View style={styles.container}>

      <FoodImagePicker image={props.food.image} onImagePicked={setFoodImage}/>
      <TextInput
        value={props.values.name}
        style={styles.longFormInput}
        placeholder='Name'
        onChangeText={text => { props.setFieldValue('name', text) }}
      />
      <Text style={styles.validationText}> {props.errors.name}</Text>
      <TextInput
        value={props.values.category}
        style={styles.longFormInput}
        placeholder='Category'
        onChangeText={text => { props.setFieldValue('category', text) }}
      />
       <TextInput
        value={props.values.notes}
        style={styles.longFormInput}
        placeholder='Notes'
        onChangeText={text => { props.setFieldValue('notes', text) }}
      />
      <Text style={styles.validationText}> {props.errors.category}</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.formInput}
          onChangeText={text => { props.setSubIngredients(text) }}
          placeholder='Sub-ingredient'
        />
        <Button
          style={styles.button}
          title='Add'
          onPress={() => { props.submitSubIngredients() }} />
      </View>
      <GridList
        items={props.food.subIngredients} />
      <Button
        title='Submit'
        onPress={() => props.handleSubmit()}
      />
    </View>
    </ScrollView>
    </SafeAreaView>
  );
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
    marginTop: 32,
  },
  formInput: {
    borderColor: '#B5B4BC',
    borderWidth: 1,
    padding: 8,
    height: 50,
    color: 'black',
    width: '75%',
    marginBottom: 16,
    marginTop: 16
  },
  validationText: {
    color: 'red'
  },
  longFormInput: {
    width: '100%',
    height: 50,
    color: 'black',
    borderColor: '#B5B4BC',
    borderWidth: 1,
    padding: 8,
    margin: 16
  },
});

export default withFormik({
  mapPropsToValues: ({ food }) => ({
     name: food.name,
     category: food.category,
     notes: food.notes,
     imageUri: null
     }),
  enableReinitialize: true,
  validationSchema: (props) => yup.object().shape({
    name: yup.string().max(30).required(),
    category: yup.string().max(15).required()
  }),
  handleSubmit: (values, { props }) => {
    console.log(props);

    values.subIngredients = props.food.subIngredients;
    console.log(values);

    if (props.food.id) {
      values.id = props.food.id;
      values.createdAt = props.food.createdAt;
      updateFood(values, props.onFoodUpdated);
    } else {
      addFood(values, props.omFoodAdded)
    }


  

  },
})(FoodForm);