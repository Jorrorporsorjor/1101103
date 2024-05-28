import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert, Linking } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { firebase } from '../config/firebase';
import { LinearGradient } from 'expo-linear-gradient';

const SongScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const songCollection = firebase.firestore().collection('song');

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
      <LinearGradient
        colors={['#8678c1', '#7164b6']}
        style={styles.section1}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <Text style={[styles.text, { textAlign: 'center' }]}>SONG</Text>
        <Text style={[styles.text2, { textAlign: 'center' }]}>เพลง</Text>
      </LinearGradient>
      <Text style={[styles.text3]}>recommend</Text>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
         {users.slice(0, 4).map((item) => (  
          <View key={item.id} style={styles.itemContainer}>
             <TouchableOpacity onPress={() => Linking.openURL(item.description)}>
            <Image source={{ uri: item.image }} style={styles.profileImage} />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.textMovie}>{item.name}</Text>
              <Text style={styles.textMovie2}> {item.Author}</Text>
              {/* ทำให้ Description คลิกได้ */}
              <TouchableOpacity onPress={() => Linking.openURL(item.description)}>
                <Text style={styles.textMovie3}>{item.description}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      
      <ScrollView >
      <Text style={[styles.text3]}>All songs</Text>
        {users.map((item) => (
          <View key={item.id} style={styles.itemContainer2}>
            <View style={styles.textContainer}>
              <Text style={styles.textMovie}>{item.name}</Text>
                <Text style={styles.textMovie2}>{item.Author}</Text>
                <TouchableOpacity onPress={() => Linking.openURL(item.description)}>
                <Text style={styles.textMovie3}>{item.description}</Text>
              </TouchableOpacity>
              
            </View>
          </View>
        ))}
        <View></View>
        <Text ></Text>
        <Text ></Text>
      </ScrollView>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} color="#e6e6ee" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#dcd9f4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
  },
  section1: {
    height: '15%',
    backgroundColor: '#f4ebdc',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 60,
    borderBottomLeftRadius: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
  },
  text3: {
    fontSize: 15,
    color: '#b7aac9',
    top: 2,
    left: 18,
   
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    lineHeight: 30,
    marginTop: 40,
    marginBottom: 0,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  text2: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    lineHeight: 30,
    marginTop: 0,
    marginBottom: 0,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  scrollViewContainer: {
    height:650,
    flexGrow: 1,
    backgroundColor: '#dcd9f4',
    alignItems: 'center',
    paddingTop: 20,
  },
  itemContainer: {
    height: 340,
    width: 280,
    backgroundColor: '#8678c1',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 20,
    top: -135,
    marginTop: -10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 4,
  },
  itemContainer2: {
    height: 70,
    width: 350,
    backgroundColor: '#8075AD',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 20,
    top: 20,
    left: 8,
    marginTop: -15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 4,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8678c1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    position: 'absolute',
    top: 720,
    left: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 4,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e6e6ee',
    marginLeft: 10,
  },
  profileImage: {
    width: 279.8,
    height: 270,
    marginRight: 10,
    borderRadius: 5,
    left: -10,
    top: -10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
   
  },
  textMovie: {
    width: '80%',
    fontSize: 18,
    color: '#f4ebdc',
    fontWeight: 'bold',
    lineHeight: 20,
    marginTop: 10,
    top: -15,
    left: 0,
  },
  textMovie2: {
    width: '80%',
    fontSize: 12,
    color: '#C8C5D4',
    fontWeight: 'bold',
    lineHeight: 13,
    marginTop: 0,
    top: -15,
    left: 0,
  },
  textMovie3: {
    height: 50,
    width: '100%',
    fontSize: 9,
    color: '#C8C5D4',
    fontWeight: 'bold',
    lineHeight: 13,
    marginTop: 7,
    top: -15,
    left: 0,
  },
});

export default SongScreen;
