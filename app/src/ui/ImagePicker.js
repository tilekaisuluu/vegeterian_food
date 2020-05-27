import React, { useState, useEffect } from 'react'
import {
  View,
  Button,
  Image,
  StyleSheet
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';


const FoodImagePicker = ({ image, onImagePicked }) => {

  const [selectedImage, setSelectedImage] = useState();

  useEffect(() => {
    if (image) {
      console.log("useEffect: " + image);
      setSelectedImage({ uri: image });
    }
  }, [image])

  

  pickImageHandler = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setSelectedImage({ uri: response.uri });
        onImagePicked({ uri: response.uri });

      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={selectedImage} style={styles.previewImage} />
      </View>
      <View styels={styles.button}>
        <Button title="Pick Image" onPress={this.pickImageHandler} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 150
  },
  button: {
    margin: 8
  },
  previewImage: {
    width: '100%',
    height: '100%'
  }
})

export default FoodImagePicker;