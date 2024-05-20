import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const moodIcons = {
  1: { image: require('../pic/emo_awful.png'), name: 'Awful', color: '#fe6667' }, 
  2: { image: require('../pic/emo_bad.png'), name: 'Bad', color: '#ffa648' },   
  3: { image: require('../pic/emo_meh.png'), name: 'Meh', color: '#71b5e6' },    
  4: { image: require('../pic/emo_good.png'), name: 'Good', color: '#a4d653' },  
  5: { image: require('../pic/emo_great.png'), name: 'Great', color: '#41c7a4' }, 
};

const MoodStatistics = ({ moodData }) => {
  const moodCounts = Object.values(moodData).reduce((acc, { mood }) => {
    acc[mood] = (acc[mood] || 0) + 1;
    return acc;
  }, {});

  const totalMoods = Object.keys(moodCounts).reduce((sum, key) => sum + moodCounts[key], 0);

  const sortedMoods = Object.entries(moodCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <View style={styles.container}>
      {sortedMoods.map(([mood, count]) => (
        <View key={mood} style={styles.moodRow}>
          <Image source={moodIcons[mood].image} style={styles.moodImage} />
          <Text style={styles.moodText}>{moodIcons[mood].name}</Text>
          <View style={styles.progressContainer}>
            <ProgressBar
              progress={count / totalMoods}
              color={moodIcons[mood].color}
              style={styles.progressBar}
            />
          </View>
          <Text style={styles.percentageText}>{((count / totalMoods) * 100).toFixed(1)}%</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  moodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  moodImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  moodText: {
    flex: 1,
    fontSize: 16,
  },
  progressContainer: {
    flex: 3,
    marginRight: 10,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
  percentageText: {
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
  },
});

export default MoodStatistics;
