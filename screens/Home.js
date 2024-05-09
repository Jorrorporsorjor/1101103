import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// สร้างคอมโพเนนท์ ButtonComponent
const ButtonComponent = ({ text, onPress }) => (
  <TouchableOpacity
    style={styles.button}
    onPress={onPress}
  >
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const moodToday = 'Happy';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My App</Text>
      <Text style={styles.moodText}>Your mood today: {moodToday}</Text>
      {/* เรียกใช้งาน ButtonComponent */}
      <ButtonComponent
        text="Button 1"
        onPress={() => {
          // การทำงานเมื่อปุ่มถูกกด
          console.log("Button 1 pressed");
        }}
      />
      <ButtonComponent
        text="Button 2"
        onPress={() => {
          // การทำงานเมื่อปุ่มถูกกด
          console.log("Button 2 pressed");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 10, // ลดระยะห่างระหว่าง title กับ moodText
  },
  moodText: {
    fontSize: 18,
    marginTop: 10, // เพิ่มระยะห่างระหว่าง moodText กับปุ่ม
  },
  button: {
    width: 200,
    height: 40,
    backgroundColor: '#3498db',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, // เพิ่มระยะห่างระหว่างปุ่ม
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default HomeScreen;
