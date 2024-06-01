import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, Alert, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getAuth, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { StripeProvider } from '@stripe/stripe-react-native';

const ProfileScreen = ({ navigation }) => {
  const [image, setImage] = useState('https://img.icons8.com/ios-filled/100/000000/user-male-circle.png');
  const [name, setName] = useState('');
  const [newName, setNewName] = useState('');
  const auth = getAuth();
  const storage = getStorage();
  const db = getFirestore();
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setName(user.displayName || 'Anonymous');
        setImage(user.photoURL || 'https://img.icons8.com/ios-filled/100/000000/user-male-circle.png');

        // Check if user has a profile picture in Firestore
        const docRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          if (userData.profilePicture) {
            setProfilePicture(userData.profilePicture);
            setImage(userData.profilePicture);
          }
        } else {
          // If user document does not exist, set initial profile picture
          setProfilePicture(user.photoURL || '');
        }
      } else {
        navigation.navigate('Login');
      }
    });

    return unsubscribe; // Unsubscribe on component unmount
  }, [auth, db, navigation]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      handleImagePicked(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      handleImagePicked(result.assets[0].uri);
    }
  };

  const handleImagePicked = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const userId = auth.currentUser.uid;
      const imageName = `${userId}_${new Date().getTime()}`;

      // Upload image to Firebase Storage
      const storageRef = ref(storage, `profilePictures/${userId}/${imageName}`);
      const snapshot = await uploadBytes(storageRef, blob);
      const profilePictureUrl = await getDownloadURL(snapshot.ref);

      // Update profile picture in Firestore
      await setDoc(doc(db, 'users', userId), { profilePicture: profilePictureUrl }, { merge: true });

      // Update profile picture in Firebase Auth
      await updateProfile(auth.currentUser, { photoURL: profilePictureUrl });

      // Update profile picture state
      setProfilePicture(profilePictureUrl);
      setImage(profilePictureUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert('Failed to upload image. Please try again.');
    }
  };

  const handleUpdateUsername = async () => {
    try {
      await updateProfile(auth.currentUser, { displayName: newName });

      // Update username in Firestore
      await setDoc(doc(db, 'users', auth.currentUser.uid), { username: newName }, { merge: true });

      setName(newName);
      setNewName('');
      Alert.alert('Success', 'Username updated successfully');
    } catch (error) {
      console.error("Error updating username:", error);
      Alert.alert('Error', 'Failed to update username. Please try again.');
    }
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.navigate('Login');
    }).catch((error) => {
      console.error("Error signing out:", error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    });
  };

  return (
    <StripeProvider publishableKey="your-stripe-publishable-key">
      <View style={styles.container}>
        <Image source={{ uri: image }} style={styles.icon} />
        <Text style={styles.text}>{name}</Text>
        <TextInput
          style={styles.input}
          placeholder="New Username"
          value={newName}
          onChangeText={setNewName}
        />
        <Button title="Update Username" onPress={handleUpdateUsername} />
        <Button title="Change Profile Picture" onPress={pickImage} />
        <Button title="Take Photo" onPress={takePhoto} />
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dcd9f4'
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
});

export default ProfileScreen;
