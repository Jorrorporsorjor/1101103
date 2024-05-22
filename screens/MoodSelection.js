import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import { auth, db } from '../config/firebase';
import { doc, setDoc, collection, query, getDocs } from 'firebase/firestore';

const MoodSelection = ({ onSave, selectedDate }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [comment, setComment] = useState('');

  const moods = [
    { value: 1, image: require('../pic/emo_awful.png'), label: 'Awful' },
    { value: 2, image: require('../pic/emo_bad.png'), label: 'Bad' },
    { value: 3, image: require('../pic/emo_meh.png'), label: 'Meh' },
    { value: 4, image: require('../pic/emo_good.png'), label: 'Good' },
    { value: 5, image: require('../pic/emo_great.png'), label: 'Great' },
  ];

  const saveMoodData = async () => {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      const moodData = {
        mood: selectedMood,
        comment,
        timestamp: new Date(),
      };

      try {
        await setDoc(doc(db, 'users', uid, 'moods', selectedDate), moodData);
        onSave(selectedMood, comment);
      } catch (error) {
        console.error('Error saving mood data: ', error);
      }
    } else {
      console.error('No user is signed in');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you?</Text>

      <View style={styles.moodContainer}>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.value}
            style={[
              styles.moodIcon,
              selectedMood === mood.value && styles.selectedMood,
            ]}
            onPress={() => setSelectedMood(mood.value)}
          >
            <Image source={mood.image} style={styles.moodImage} />
            <Text style={styles.moodLabel}>{mood.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.commentInput}
        placeholder="Add a comment..."
        multiline
        onChangeText={setComment}
        value={comment}
      />

      <TouchableOpacity
        style={[
          styles.saveButton,
          { opacity: selectedMood !== null ? 1 : 0.5 },
        ]}
        onPress={saveMoodData}
        disabled={selectedMood === null}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  moodIcon: {
    alignItems: 'center',
    padding: 10,
  },
  selectedMood: {
    borderWidth: 2,
    borderColor: '#8965d4',
    borderRadius: 10,
  },
  moodImage: {
    width: 50,
    height: 50,
  },
  moodLabel: {
    marginTop: 5,
    textAlign: 'center',
  },
  commentInput: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#8965d4',
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default MoodSelection;
