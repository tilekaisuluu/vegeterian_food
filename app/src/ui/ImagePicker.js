import React, { useState, useEffect } from 'react'
import {
  View,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';


const FoodImagePicker = ({ image, onImagePicked }) => {

  const [selectedImage, setSelectedImage] = useState();

// to listen changes in state
  useEffect(() => {
    if (image) {
      setSelectedImage({ uri: image });
    }
  }, [image])

  

  const pickImageHandler = async () => {
      let response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!response.cancelled) {
        setSelectedImage({ uri: response.uri });
        onImagePicked({ uri: response.uri });
      }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={selectedImage} style={styles.previewImage} />
      </View>
      <View styels={styles.button}>
        <TouchableOpacity
        onPress={pickImageHandler}
        >
          <Text>Pick image</Text>
        </TouchableOpacity>
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
    borderWidth: 0.5,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '100%',
    height: 300
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