import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';



const theapyscreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.section1}>
                <Text style={styles.text}>Stress Therapy</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <TouchableOpacity style={styles.button}
                    onPress={() => navigation.navigate("Tips")}>

                    <Text style={styles.buttonText}>TIPS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={() => navigation.navigate("MA")}>
                    <Text style={styles.buttonText}>MOVIE & ANIMATION</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { marginTop: 10 }]}onPress={() => navigation.navigate("Song")}>
                    <Text style={styles.buttonText}>SONG</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { marginTop: 10 }]}onPress={() => navigation.navigate("Book")}>
                    <Text style={styles.buttonText}>BOOK</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { marginTop: 10 }]}onPress={() => navigation.navigate("Ebook")}>
                    <Text style={styles.buttonText}>E-BOOK</Text>
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
});

export default theapyscreen;
