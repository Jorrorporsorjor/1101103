import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';

const MoodSelection = ({ onSave }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [comment, setComment] = useState('');

  const moods = [
    { value: 1, image: require('../pic/emo_awful.png') },
    { value: 2, image: require('../pic/emo_bad.png') },
    { value: 3, image: require('../pic/emo_meh.png') },
    { value: 4, image: require('../pic/emo_good.png') },
    { value: 5, image: require('../pic/emo_great.png') },
  ];

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
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.commentInput}
        placeholder="เพิ่มความคิดเห็น..."
        multiline
        onChangeText={setComment}
        value={comment}
      />

      <TouchableOpacity
        style={[
          styles.saveButton,
          { opacity: selectedMood !== null ? 1 : 0.5 },
        ]}
        onPress={() => onSave(selectedMood, comment)}
        disabled={selectedMood === null} // Disable save button if no mood is selected
      >
        <Text style={styles.saveButtonText}>บันทึก</Text>
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
    padding: 10,
  },
  selectedMood: {
    borderWidth: 2,
    borderColor: '#007bff',
    borderRadius: 10,
  },
  moodImage: {
    width: 50,
    height: 50,
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

export default MoodSelection;
