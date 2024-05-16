import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { AntDesign } from '@expo/vector-icons';
import MoodSelection from './MoodSelection'; // import the MoodSelection component

const HomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [moodData, setMoodData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setIsModalVisible(true);
  };

  const handleSaveMood = (mood, comment) => {
    const newMoodData = { ...moodData, [selectedDate]: { mood, comment } };
    setMoodData(newMoodData);
    setIsModalVisible(false);
  };

  const getMoodIcon = (mood) => {
    const moods = {
      1: { icon: 'frowno', color: 'blue' },
      2: { icon: 'meh', color: 'grey' },
      3: { icon: 'smileo', color: 'green' },
    };
    const moodObj = moods[mood];
    return moodObj ? <AntDesign name={moodObj.icon} size={20} color={moodObj.color} /> : null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to HAPPISM</Text>

      <Calendar
        onDayPress={handleDayPress}
        markedDates={Object.keys(moodData).reduce((acc, date) => {
          acc[date] = {
            customStyles: {
              container: {
                backgroundColor: moodData[date].mood === 1 ? 'blue' : moodData[date].mood === 2 ? 'grey' : 'green',
                bottom: 0, // Add this line to position the icon at the bottom
              },
              text: {
                color: 'white',
              },
            },
            // Render the mood icon under the date
            renderCustomMarker: () => getMoodIcon(moodData[date].mood),
          };
          return acc;
        }, {})}
        markingType={'custom'}
      />

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <MoodSelection onSave={handleSaveMood} />
      </Modal>
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
});

export default HomeScreen;
