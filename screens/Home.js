import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import MoodSelection from './MoodSelection';
import MoodStatistics from './MoodStatistics'; // Import MoodStatistics component

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
    const moodIcons = {
      1: require('../pic/emo_awful.png'),
      2: require('../pic/emo_bad.png'),
      3: require('../pic/emo_meh.png'),
      4: require('../pic/emo_good.png'),
      5: require('../pic/emo_great.png'),
    };
    return moodIcons[mood] ? <Image source={moodIcons[mood]} style={styles.moodIcon} /> : null;
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to HAPPISM</Text>

      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          ...Object.keys(moodData).reduce((acc, date) => {
            acc[date] = {
              customStyles: {
                container: {
                  backgroundColor: 'transparent',
                },
                text: {
                  color: 'black',
                },
              },
            };
            return acc;
          }, {}),
          [today]: {
            customStyles: {
              container: {
                backgroundColor: '#e6ffe6',
              },
              text: {
                color: 'black',
                fontWeight: 'bold',
              },
            },
          },
        }}
        dayComponent={({ date, state }) => (
          <TouchableOpacity onPress={() => handleDayPress(date)}>
            <View style={styles.dayContainer}>
              <Text style={[styles.dayText, state === 'disabled' && styles.disabledText]}>
                {date.day}
              </Text>
              {moodData[date.dateString] && getMoodIcon(moodData[date.dateString].mood)}
            </View>
          </TouchableOpacity>
        )}
        markingType={'custom'}
      />

      <MoodStatistics moodData={moodData} />

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
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 16,
    color: 'black',
  },
  disabledText: {
    color: 'gray',
  },
  moodIcon: {
    width: 20,
    height: 20,
    marginTop: 5,
  },
});

export default HomeScreen;
