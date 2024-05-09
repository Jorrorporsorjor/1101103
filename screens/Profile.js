import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { updateDoc, doc } from "firebase/firestore";
import { firestore } from '../config/firebase';

const ProfileScreen = () => {
    const [name, setName] = useState(null);
    const [dob, setDob] = useState(null);
    

  const handleSaveChanges = async () => {
    try {
      const userDocRef = doc(firestore, "user", "CbO6BHDSqIsI5kE08o4A"); // เปลี่ยน USER_ID_HERE เป็น ID ของผู้ใช้
      await updateDoc(userDocRef, {
        name: name,
        dob: dob
      });
      Alert.alert('Changes Saved', 'Your profile has been updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again later.');
    }
  };

  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date of Birth:</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={dob}
          onChangeText={setDob}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
        <Text style={styles.buttonText}>Save Changes</Text>
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
});

export default ProfileScreen;
