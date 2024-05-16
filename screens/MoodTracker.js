import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { AntDesign } from '@expo/vector-icons';

const MoodTrackerScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [moodData, setMoodData] = useState({});
  const [selectedMood, setSelectedMood] = useState(null);
  const [comment, setComment] = useState('');

  const moods = [
    { value: 1, icon: 'frowno', color: 'blue' },
    { value: 2, icon: 'meh', color: 'grey' },
    { value: 3, icon: 'smileo', color: 'green' },
  ];

  const handleSaveMood = () => {
    if (!selectedDate || selectedMood === null) {
      console.log('No date or mood selected');
      return;
    }

    const newMoodData = { ...moodData, [selectedDate]: { mood: selectedMood, comment: comment } };
    setMoodData(newMoodData);

    console.log(`Saved Mood: ${selectedMood} for Date: ${selectedDate}, Comment: ${comment}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Mood Tracker</Text>

        <Calendar
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={Object.keys(moodData).reduce((acc, date) => {
            acc[date] = {
              marked: true,
              customStyles: {
                container: {
                  backgroundColor: moodData[date].mood === 1 ? 'blue' : moodData[date].mood === 2 ? 'grey' : 'green',
                },
                text: {
                  color: 'white',
                },
              },
            };
            return acc;
          }, {})}
          markingType={'custom'}
        />

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

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveMood}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: '100%',
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

export default MoodTrackerScreen;
