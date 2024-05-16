import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const MoodSelection = ({ onSave }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [comment, setComment] = useState('');

  const moods = [
    { value: 1, icon: 'frowno', color: 'blue' },
    { value: 2, icon: 'meh', color: 'grey' },
    { value: 3, icon: 'smileo', color: 'green' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Mood</Text>

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
            <AntDesign name={mood.icon} size={50} color={mood.color} />
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.commentInput}
        placeholder="Add comment..."
        multiline
        onChangeText={setComment}
        value={comment}
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => onSave(selectedMood, comment)}
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
    padding: 10,
  },
  selectedMood: {
    borderWidth: 2,
    borderColor: '#007bff',
    borderRadius: 10,
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
