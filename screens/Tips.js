import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Tips = ({ navigation }) => {
    return (
        <View style={styles.container}>
             <LinearGradient
                colors={['#8678c1', '#7164b6']}
                style={styles.section1}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
            >   
                <Text style={[styles.text]}>TIPS</Text>
                <Text style={[styles.text2]}>ทริค</Text>
                
                
                </LinearGradient>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Tips")}>
                    <Text style={styles.buttonText}>6 </Text>
                    <Text style={styles.buttonText2}>วิธีเพิ่มความสุข</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { marginTop: 10 }]}>
                    <Text style={styles.buttonText}>4 </Text>
                    <Text style={styles.buttonText2}>วิธีให้กำลังใจตัวเอง</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { marginTop: 10 }]}>
                    <Text style={styles.buttonText}>5 </Text>
                    <Text style={styles.buttonText2}>วิธีจัดการกับความเศร้า</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { marginTop: 10 }]}>
                    <Text style={styles.buttonText}>3</Text>
                    <Text style={styles.buttonText2}>วิธีใช้ชีวิตให้คุ้มค่า</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { marginTop: 10 }]}>
                    <Text style={styles.buttonText}>2</Text>
                    <Text style={styles.buttonText2}>วิธีเพิ่มความขี้เกียจ</Text>
                </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Profile")}>
                    <AntDesign name="arrowleft" size={24} color="#e6e6ee" />
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between', // จัดเรียงให้ส่วนบนและส่วนล่างมีระยะห่างเท่ากัน
        backgroundColor: '#dcd9f4',
    },
    section1: {
        height: '17%',
        backgroundColor: '#f4ebdc',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000', // สีของเงา
        shadowOffset: { width: 0, height: 2 }, // การเลื่อนของเงา
        shadowOpacity: 1, // ความทึบของเงา
        shadowRadius: 2, // รัศมีของเงา
        elevation: 5,
    },
    text2: {
        fontSize: 25, // ปรับขนาดตัวอักษร
        color: 'white',
        fontWeight: 'bold',
        lineHeight: 30, // ปรับระยะห่างระหว่างบรรทัด
        marginTop: 0, // เว้นระยะห่างด้านบน
        textShadowColor: 'rgba(0, 0, 0, 0.75)', // สีของเงา
        textShadowOffset: { width: -1, height: 1 }, // ตำแหน่งของเงา
        textShadowRadius: 10, // รัศมีของเงา
    },
    text: {
        fontSize: 30, // ปรับขนาดตัวอักษร
        color: 'white',
        fontWeight: 'bold',
        lineHeight: 30, // ปรับระยะห่างระหว่างบรรทัด
        marginTop: 40, // เว้นระยะห่างด้านบน
        marginBottom: 2, // เว้นระยะห่างด้านบน
        textShadowColor: 'rgba(0, 0, 0, 0.75)', // สีของเงา
        textShadowOffset: { width: -1, height: 1 }, // ตำแหน่งของเงา
        textShadowRadius: 10, // รัศมีของเงา
    },
    scrollViewContainer: {
        flexGrow: 1,// กำหนดให้ส่วนตรงกลางใหญ่สุด
        backgroundColor: '#dcd9f4',
        alignItems: 'center', // จัดให้เนื้อหาอยู่ตรงกลาง
        
    },
    button: {
        marginTop: 20,
        width: 350,
        height: 100,
        backgroundColor: '#eeeef4',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        shadowColor: '#000', // สีของเงา
        shadowOffset: { width: 0, height: 2 }, // การเลื่อนของเงา
        shadowOpacity: 0.8, // ความทึบของเงา
        shadowRadius: 2, // รัศมีของเงา
        elevation: 5, // การยกระดับของเงา (สำหรับ Android)
    },
    buttonText: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#7164b6',
        top: 10,
        left: -120,
        
        
    },
    buttonText2: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#88888e',
        top: -35,
        left: 15,
        
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#8678c1',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
        position: 'absolute',
        top: 720,
        left: 250,
        shadowColor: '#000', // สีของเงา
        shadowOffset: { width: 0, height: 1 }, // การเลื่อนของเงา
        shadowOpacity: 0.8, // ความทึบของเงา
        shadowRadius: 1, // รัศมีของเงา
        elevation: 4, // การยกระดับของเงา (สำหรับ Android)
    },
    backButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#e6e6ee',
        marginLeft: 10,
    },
});

export default Tips;
