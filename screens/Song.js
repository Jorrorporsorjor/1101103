import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { firebase } from '../config/firebase';

const SongScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const songCollection = firebase.firestore().collection('song');

  useEffect(() => {
    const unsubscribe = songCollection.onSnapshot(
      (querySnapshot) => {
        const usersList = [];
        querySnapshot.forEach((doc) => {
          const { name, Author, description, image } = doc.data(); // Add 'image' to retrieve image URL from Firestore
          usersList.push({
            id: doc.id,
            name,
            Author,
            description,
            image,
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

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.section1}>
        <Text style={[styles.text, { textAlign: 'center' }]}>song & ANIMATION</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {users.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            {/* Display the image */}
            <Image source={{ uri: item.image }} style={styles.profileImage} />
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>song Name: {item.name}</Text>
              <Text style={styles.itemText}>Author: {item.Author}</Text>
              <Text style={styles.itemText}>Description: {item.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section1: {
    height: '17%',
    backgroundColor: '#FFAB7A',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Allow positioning of back button
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
    flexDirection: 'row', // Align image and text horizontally
    alignItems: 'flex-start', // Align items at the top vertically
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1, // Allow text to take up remaining space
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
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
});

export default SongScreen;
