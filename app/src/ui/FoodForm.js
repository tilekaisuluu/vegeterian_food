import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import GridList from './GridList';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { addFood, updateFood, uploadFood } from '../api/FoodApi';
import FoodImagePicker from './ImagePicker'


// if we pick a new food  imageUri will be set, if not the imageUri will be null
const FoodForm = (props) => {
  setFoodImage = (image) => {
    props.setFieldValue('imageUri', image.uri);
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

        <ScrollView>

          <View style={styles.container}>


            <FoodImagePicker image={props.food.imageUri} onImagePicked={setFoodImage} />
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
              multiline
              value={props.values.notes}
              style={styles.notes}
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
              <TouchableOpacity
                style={styles.button}
                onPress={() => { props.submitSubIngredients() }}>
                <Text>Add</Text>
              </TouchableOpacity>
            </View>
            <GridList
              items={props.food.subIngredients} />
            <TouchableOpacity

              style={styles.button}
              onPress={() => props.handleSubmit()}

            >
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const screenWidth = Math.round(Dimensions.get('window').width);


<Button
  title='Add'
  onPress={() => { props.submitSubIngredients() }} />



const styles = StyleSheet.create({
  row: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    width: screenWidth,
    marginStart: 16,
    marginEnd: 16
  },
  container: {
    width: screenWidth,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 8
  },
  formInput: {
    borderColor: '#B5B4BC',
    borderWidth: 1,
    padding: 8,
    height: 50,
    color: 'black',
    width: '60%',
    marginBottom: 30,
  },
  validationText: {
    color: 'red'
  },
  longFormInput: {
    width: '90%',
    height: 50,
    color: 'black',
    borderColor: '#B5B4BC',
    borderWidth: 1,
    padding: 8,
    margin: 16
  },
  notes: {
    width: '90%',
    color: 'black',
    borderColor: '#B5B4BC',
    borderWidth: 1,
    padding: 8,
    margin: 16
  },
  button: {
    margin: 16,
    color: 'black',
    backgroundColor: '#DDDDDD',
    padding: 10,
    alignItems: 'center',
    



  }
});

export default withFormik({
  mapPropsToValues: ({ food }) => ({
    name: food.name,
    category: food.category,
    notes: food.notes,
    imageUri: food.imageUri
  }),
  enableReinitialize: true,
  validationSchema: (props) => yup.object().shape({
    name: yup.string().max(30).required(),
    category: yup.string().max(15).required()
  }),
  handleSubmit: (values, { props }) => {
    values.subIngredients = props.food.subIngredients;

    // if props.food.id  then update the food,
    if (props.food.id) {
      values.id = props.food.id;
      values.createdAt = props.food.createdAt;
      uploadFood(values, props.onFoodUpdated, { updating: true });
      // if not add new food
    } else {
      uploadFood(values, props.onFoodAdded, { updating: false });
    }
  },
})(FoodForm);