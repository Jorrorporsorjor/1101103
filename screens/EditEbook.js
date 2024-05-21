import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
  Keyboard,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { firebase } from '../config/firebase';

const EditEbookScreen = ({ navigation }) => {
    const EBookCollection = firebase.firestore().collection('ebook');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingUser, setEditingUser] = useState(null); // State สำหรับ user ที่กำลังถูกแก้ไข
    const [newName, setNewName] = useState('');
    const [newAuthor, setNewAuthor] = useState('');
    const [newDescription, setNewDescription] = useState('');
  
    useEffect(() => {
      const unsubscribe = EBookCollection.onSnapshot(
        (querySnapshot) => {
          const usersList = [];
          querySnapshot.forEach((doc) => {
            const { name, author, description } = doc.data();
            usersList.push({
              id: doc.id,
              name,
              author,
              description,
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
      setNewAuthor(user.author);
      setNewDescription(user.description);
    };
  
    const cancelEditing = () => {
      setEditingUser(null);
      setNewName('');
      setNewAuthor('');
      setNewDescription('');
    };
  
    const saveEdit = () => {
      if (editingUser) {
        EBookCollection
          .doc(editingUser)
          .update({
            name: newName,
            author: newAuthor,
            description: newDescription,
          })
          .then(() => {
            console.log('Document successfully updated!');
            setEditingUser(null);
            setNewName('');
            setNewAuthor('');
            setNewDescription('');
          })
          .catch((error) => {
            console.error('Error updating document: ', error);
          });
      }
    };
  
    const deleteUser = (id) => {
      EBookCollection
        .doc(id)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!');
        })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });
    };
  
    const addField = () => {
      if (newName && newName.length > 0 && newAuthor && newAuthor.length > 0 && newDescription && newDescription.length > 0) {
        const data = {
          name: newName,
          author: newAuthor,
          description: newDescription,
        };
        EBookCollection
          .add(data)
          .then(() => {
            setNewName('');
            setNewAuthor('');
            setNewDescription('');
            Keyboard.dismiss();
          })
          .catch((error) => {
            alert(error);
          });
      } else {
        alert('Please fill out all fields.');
      }
    };
  
    if (loading) {
      return <Text>Loading...</Text>;
    }
  
    return (
      <View style={styles.container}>
        <View style={styles.section1}>
          <Text style={[styles.text, { textAlign: 'center' }]}>Book & ANIMATION</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="black" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {users.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              {editingUser === item.id ? (
                <>
                  <TextInput
                    style={styles.input}
                    value={newName}
                    onChangeText={setNewName}
                    placeholder="Book Name"
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
                  <Button title="Save" onPress={saveEdit} />
                  <Button title="Cancel" onPress={cancelEditing} />
                </>
              ) : (
                <>
                  <Text>E-Book Name: {item.name}</Text>
                  <Text>Author: {item.author}</Text>
                  <Text>Description: {item.description}</Text>
                  <Button title="Edit" onPress={() => startEditing(item)} />
                  <Button title="Delete" onPress={() => deleteUser(item.id)} />
                </>
              )}
            </View>
          ))}
        </ScrollView>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add Book Name"
            value={newName}
            onChangeText={setNewName}
          />
          <TextInput
            style={styles.input}
            placeholder="Add Author"
            value={newAuthor}
            onChangeText={setNewAuthor}
          />
          <TextInput
            style={styles.input}
            placeholder="Add Description"
            value={newDescription}
            onChangeText={setNewDescription}
          />
          <TouchableOpacity style={styles.button} onPress={addField}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    section1: {
      height: '17%',
      backgroundColor: '#FFAB7A',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 30,
      color: 'black',
      fontWeight: 'bold',
      lineHeight: 36,
      marginTop: 20,
    },
    scrollViewContainer: {
      flexGrow: 1,
      backgroundColor: '#9379C2',
      alignItems: 'center',
      paddingTop: 20,
    },
    itemContainer: {
      height: 'auto',
      width: '80%',
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      padding: 10,
      marginVertical: 10,
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#ddd',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 30,
      position: 'absolute',
      top: 40,
      left: 10,
    },
    backButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
      marginLeft: 10,
    },
    formContainer: {
      flexDirection: 'row',
      height: 80,
      marginLeft: 10,
      marginRight: 10,
    },
    input: {
      height: 48,
      borderRadius: 5,
      overflow: 'hidden',
      backgroundColor: 'white',
      paddingLeft: 16,
      flex: 1,
      marginRight: 5,
    },
    button: {
      height: 48,
      borderRadius: 5,
      backgroundColor: '#788eec',
      width: 80,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 20,
    },
  });

export default EditEbookScreen;
