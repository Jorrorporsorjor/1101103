import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My App</Text>
      {/* กราฟ */}
      <View style={styles.chartContainer}>
        {/* ส่วนของกราฟอาจต้องนำเข้าคอมโพเนนท์ Chart ตามต้องการ */}
        <Text style={styles.chartText}>กราฟแสดงผลอารมณ์วันนี้</Text>
        {/* เนื่องจาก Chart ไม่มีอยู่ใน React Native โดยปกติ คุณอาจต้องใช้ไลบรารีอื่น ๆ หรือสร้าง Component ของคุณเอง */}
      </View>
      {/* ปุ่มแรก */}
      <TouchableOpacity
        style={styles.button}
      >
        <Text style={styles.buttonText}>Button 1</Text>
      </TouchableOpacity>
      {/* ปุ่มที่สอง */}
      <TouchableOpacity
        style={styles.button}
      >
        <Text style={styles.buttonText}>Button 2</Text>
      </TouchableOpacity>
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
    marginBottom: 30,
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
  chartContainer: {
    marginTop: 20, // เพิ่มระยะห่างระหว่างปุ่มกับกราฟ
  },
  chartText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default HomeScreen;
