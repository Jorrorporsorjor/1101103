import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { firebase } from '../config/firebase';

const EbookScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const ebookCollection = firebase.firestore().collection('ebook');

  useEffect(() => {
    const unsubscribe = ebookCollection.onSnapshot(
      (querySnapshot) => {
        const usersList = [];
        querySnapshot.forEach((doc) => {
          const { name, Author,description } = doc.data();
          usersList.push({
            id: doc.id,
            name,
            Author,
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
  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.section1}>
        <Text style={[styles.text, { textAlign: 'center' }]}>E-BOOK</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {users.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Text>Movie Name: {item.name}</Text>
            <Text>Author's Name: {item.Author}</Text>
            <Text>description: {item.description}</Text>
          </View>
        ))}
      </ScrollView>
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
  });
  

export default EbookScreen;
