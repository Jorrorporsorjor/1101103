import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,Image } from 'react-native';
import { updateDoc, doc } from "firebase/firestore";
import { firestore } from '../config/firebase';
import * as ImagePicker from 'expo-image-picker';
import { auth, db } from '../config/firebase';
import { signOut } from 'firebase/auth';

const ProfileScreen = ({ navigation }) => {
    const [name, setName] = useState(null);
    const [dob, setDob] = useState(null);
    const [image, setImage] = useState('');

    
  const handleLogOut = async () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to log out?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          await signOut(auth);
          navigation.navigate('Login');
          console.log('LOG OUT');
        },
      },
    ]);
  };

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };

  

  return (
 
    <View style={styles.container}>
       <Image style={styles.profileImage}
      source={{ uri: image ? image : 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}  ></Image>
      
      
      <Text style={styles.title}>User Profile</Text>

      <View style={styles.inputContainer}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Change Profile Picture</Text>
          </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogOut}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 10,
  },
  button: {
    width: 300,
    height: 40,
    backgroundColor: '#9932CC',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'skyblue',
  },
});

export default ProfileScreen;
