import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';

const MoodTrackerScreen = () => {
  const [mood, setMood] = useState(50); // Mood อาจจะเป็นเลขระหว่าง 0-100
  const [comment, setComment] = useState('');

  const handleSaveMood = () => {
    // บันทึกอารมณ์และความคิดเห็น
    console.log(`Mood: ${mood}, Comment: ${comment}`);
    // ส่งข้อมูลไปยังเซิร์ฟเวอร์ หรือบันทึกใน Local Storage
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood Tracker</Text>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        value={mood}
        onValueChange={setMood}
        step={1}
        thumbTintColor="#007bff"
        minimumTrackTintColor="#007bff"
      />

      <Text style={styles.moodValue}>{mood}</Text>

      <TextInput
        style={styles.commentInput}
        placeholder="Add comment..."
        multiline
        onChangeText={setComment}
        value={comment}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveMood}>
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
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  moodValue: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
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
    backgroundColor: '#007bff',
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

export default MoodTrackerScreen;
