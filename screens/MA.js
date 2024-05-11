import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Button = ({ title, image }) => {
  return (
    <View style={styles.button}>
      {image && <Image source={image} style={styles.image} />}
      <Text style={styles.buttonText}>{title}</Text>
    </View>
  );
};

const MA = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.section1}>
        <Text style={[styles.text, { textAlign: 'center' }]}>MOVIE & ANIMATION</Text>
        <View style={styles.backButton} onPress={() => navigation.navigate("Profile")}>
          <AntDesign name="arrowleft" size={24} color="black" />
          <Text style={styles.backButtonText}>Go Back</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Button title="6 วิธีเพิ่มความสุข" image={require('../assets/Test1.jpg')} />
        <Button title="4 วิธีให้กำลังใจตัวเอง" style={{ marginTop: 10 }} />
        <Button title="5 วิธีจัดการกับความเศร้า" style={{ marginTop: 10 }} />
        <Button title="3 วิธีใช้ชีวิตให้คุ้มค่า" style={{ marginTop: 10 }} />
        <Button title="2 วิธีเพิ่มความขี้เกียจ" style={{ marginTop: 10 }} />
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
  },
  button: {
    marginTop: 20,
    width: 350,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'right',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
});

export default MA;
