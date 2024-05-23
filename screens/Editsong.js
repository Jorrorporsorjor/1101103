import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Button, Keyboard, Image, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { firebase, storage } from '../config/firebase'; // Adjust according to your configuration file
import * as ImagePicker from 'expo-image-picker';

const EditsongScreen = ({ navigation, image, userId }) => {
  const songCollection = firebase.firestore().collection('song');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null); // State for the user being edited
  const [newName, setNewName] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [profilePicture, setProfilePicture] = useState(image || ''); // Initialize as an empty string
  const [imageUrl, setImageUrl] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = songCollection.onSnapshot(
      (querySnapshot) => {
        const usersList = [];
        querySnapshot.forEach((doc) => {
          const { name, Author, description, image } = doc.data();
          usersList.push({
            id: doc.id,
            name,
            Author,
            description,
            image
          });
        });
        setUsers(usersList);
        setLoading(false);
      },
      (error) => {
        console.error(error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const startEditing = (user) => {
    setEditingUser(user.id);
    setNewName(user.name);
    setNewAuthor(user.Author);
    setNewDescription(user.description);
    setProfilePicture(user.image);
  };

  const cancelEditing = () => {
    setEditingUser(null);
    setNewName('');
    setNewAuthor('');
    setNewDescription('');
    setProfilePicture('');
  };

  const saveEdit = async (profilePictureUrl) => {
    if (editingUser) {
      try {
        await songCollection.doc(editingUser).update({
          name: newName,
          Author: newAuthor,
          description: newDescription,
          image: profilePictureUrl || profilePicture,
        });
        console.log('Document successfully updated!');
        cancelEditing();
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    }
  };

  const addField = async (profilePictureUrl) => {
    if (newName && newAuthor && newDescription && profilePictureUrl) {
      const data = {
        name: newName,
        Author: newAuthor,
        description: newDescription,
        image: profilePictureUrl,
        userId: `m${users.length + 1 < 10 ? '0' + (users.length + 1) : users.length + 1}`,
      };
      try {
        await songCollection.add(data);
        cancelEditing();
      } catch (error) {
        alert(error);
      }
    } else {
      alert('Please fill out all fields.');
    }
  };

  useEffect(() => {
    setProfilePicture(image);
  }, [image]);

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

    if (!result.canceled) {
      try {
        const uri = result.assets[0].uri;
        const response = await fetch(uri);
        const blob = await response.blob();

        const imageName = `${userId}_${new Date().getTime()}`;

        const ref = firebase.storage().ref().child(`Esongpicture/${imageName}`);
        const snapshot = await ref.put(blob);
        const profilePictureUrl = await snapshot.ref.getDownloadURL();

        setProfilePicture(profilePictureUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert('Failed to upload image. Please try again.');
      }
    }
  };

  const handleImageUrlChange = async () => {
    if (imageUrl) {
      setProfilePicture(imageUrl);
      if (editingUser) {
        try {
          await firebase.firestore().collection('song').doc(editingUser).update({ image: imageUrl });
          setImageUrl('');
        } catch (error) {
          console.error("Error updating image URL:", error);
          alert('Failed to update image URL. Please try again.');
        }
      }
    }
  };

  const handleConfirm = async () => {
    if (editingUser) {
      await saveEdit(profilePicture);
    } else {
      await addField(profilePicture);
    }
    setModalVisible(false);
  };

  const deleteUser = async (id) => {
    try {
      await songCollection.doc(id).delete();
      console.log('Document successfully deleted!');
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.section1}>
        <Text style={[styles.text, { textAlign: 'center' }]}>SONG</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {users.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.profileImage} />
            {editingUser === item.id ? (
              <>
                <TextInput
                  style={styles.input}
                  value={newName}
                  onChangeText={setNewName}
                  placeholder="Song Name"
                />
                <TextInput
                  style={styles.input}
                  value={newAuthor}
                  onChangeText={setNewAuthor}
                  placeholder="Author"
                />
                <TextInput
                  style={styles.input}
                  value={newDescription}
                  onChangeText={setNewDescription}
                  placeholder="Description"
                />
                <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                  <Text style={styles.buttonText}>Edit Image</Text>
                </TouchableOpacity>
                <Button title="Save" onPress={handleConfirm} />
                <Button title="Cancel" onPress={cancelEditing} />
              </>
            ) : (
              <>
                <Text>Song Name: {item.name}</Text>
                <Text>Author: {item.Author}</Text>
                <Text>Description: {item.description}</Text>
                <TouchableOpacity style={styles.button} onPress={() => startEditing(item)}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <Button title="Delete" onPress={() => deleteUser(item.id)} />
              </>
            )}
          </View>
        ))}
      </ScrollView>
      <View style={styles.formContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalView}>
          <Image source={{ uri: profilePicture }} style={styles.modalImage} />
          <Button title="Upload from Gallery" onPress={pickImage} />
          <Text style={styles.modalText}>or</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter image URL"
            value={imageUrl}
            onChangeText={setImageUrl}
          />
          <Button title="Use URL" onPress={handleImageUrlChange} />
          <TextInput
            style={styles.input}
            value={newName}
            onChangeText={setNewName}
            placeholder="Song Name"
          />
          <TextInput
            style={styles.input}
            value={newAuthor}
            onChangeText={setNewAuthor}
            placeholder="Author"
          />
          <TextInput
            style={styles.input}
            value={newDescription}
            onChangeText={setNewDescription}
            placeholder="Description"
          />
          <Button title="Confirm" onPress={handleConfirm} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  section1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
  },
  backButtonText: {
    marginLeft: 5,
  },
  scrollViewContainer: {
    paddingBottom: 100,
  },
  itemContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
  },
  formContainer: {
    marginVertical: 20,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  modalText: {
    marginBottom: 20,
  },
});

export default EditsongScreen;
