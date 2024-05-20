import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import MoodSelection from './MoodSelection';
import MoodStatistics from './MoodStatistics';

const HomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [moodData, setMoodData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewingMood, setIsViewingMood] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().slice(0, 7));

  const handleMonthChange = (month) => {
    setCurrentMonth(month.dateString.slice(0, 7));
  };

  const filteredMoodData = Object.fromEntries(
    Object.entries(moodData).filter(([date]) => date.startsWith(currentMonth))
  );

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    if (moodData[day.dateString]) {
      setIsViewingMood(true);
    } else {
      setIsModalVisible(true);
    }
  };

  const handleSaveMood = (mood, comment) => {
    const newMoodData = { ...moodData, [selectedDate]: { mood, comment } };
    setMoodData(newMoodData);
    setIsModalVisible(false);
  };

  const handleCloseViewMood = () => {
    setIsViewingMood(false);
  };

  const getMoodDetails = (mood) => {
    const moodDetails = {
      1: { image: require('../pic/emo_awful.png'), label: 'Awful' },
      2: { image: require('../pic/emo_bad.png'), label: 'Bad' },
      3: { image: require('../pic/emo_meh.png'), label: 'Meh' },
      4: { image: require('../pic/emo_good.png'), label: 'Good' },
      5: { image: require('../pic/emo_great.png'), label: 'Great' },
    };
    return moodDetails[mood] || {};
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to HAPPISM</Text>

      <Calendar
        onDayPress={handleDayPress}
        onMonthChange={handleMonthChange}
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
              {moodData[date.dateString] && (
                <Image source={getMoodDetails(moodData[date.dateString].mood).image} style={styles.moodIcon} />
              )}
            </View>
          </TouchableOpacity>
        )}
        markingType={'custom'}
        theme={{
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          monthTextColor: '#00adf5',
          arrowColor: 'orange',
        }}
      />

      {Object.keys(filteredMoodData).length > 0 ? (
        <MoodStatistics moodData={filteredMoodData} />
      ) : (
        <Text style={styles.noDataText}>No mood data for this month.</Text>
      )}

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <MoodSelection onSave={handleSaveMood} />
      </Modal>

      <Modal
        visible={isViewingMood}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseViewMood}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Mood on {selectedDate}</Text>
            {moodData[selectedDate] && (
              <>
                <Image source={getMoodDetails(moodData[selectedDate].mood).image} style={styles.largeMoodIcon} />
                <Text style={styles.moodLabel}>{getMoodDetails(moodData[selectedDate].mood).label}</Text>
                <Text style={styles.modalComment}>{moodData[selectedDate].comment}</Text>
              </>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseViewMood}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#343a40',
    fontWeight: 'bold',
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
  largeMoodIcon: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  moodLabel: {
    fontSize: 18,
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
  noDataText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#6c757d',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalComment: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#8965d4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HomeScreen;
