import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const theapyscreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.section1}>
                <Text style={[styles.text, { textAlign: 'center' }]}>TIPS</Text>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Profile")}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Tips")}>
                    <Text style={styles.buttonText}>6 วิธีเพิ่มความสุข</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { marginTop: 10 }]}>
                    <Text style={styles.buttonText}>4 วิธีให้กำลังใจตัวเอง</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { marginTop: 10 }]}>
                    <Text style={styles.buttonText}>5 วิธีจัดการกับความเศร้า</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { marginTop: 10 }]}>
                    <Text style={styles.buttonText}>3 วิธีใช้ชีวิตให้คุ้มค่า</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { marginTop: 10 }]}>
                    <Text style={styles.buttonText}>2 วิธีเพิ่มความขี้เกียจ</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between', // จัดเรียงให้ส่วนบนและส่วนล่างมีระยะห่างเท่ากัน
    },
    section1: {
        height: '17%',
        backgroundColor: '#FFAB7A',
    },
    text: {
        fontSize: 30, // ปรับขนาดตัวอักษร
        color: 'black',
        fontWeight: 'bold',
        lineHeight: 36, // ปรับระยะห่างระหว่างบรรทัด
        marginTop: 20, // เว้นระยะห่างด้านบน
    },
    scrollViewContainer: {
        flexGrow: 1,// กำหนดให้ส่วนตรงกลางใหญ่สุด
        backgroundColor: '#9379C2',
        alignItems: 'center', // จัดให้เนื้อหาอยู่ตรงกลาง
    },
    button: {
        marginTop: 20,
        width: 350,
        height: 100,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ddd',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
    },
    backButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 10,
    },
});

export default theapyscreen;
