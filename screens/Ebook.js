import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const MAScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text>EbookScreen SCREEN</Text>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={24} color="black" />
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ddd',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
        marginTop: 20,
    },
    backButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 10,
    },
});

export default MAScreen;
