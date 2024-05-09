import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { sendPasswordResetEmail } from '@firebase/auth';
import { auth } from '../config/firebase';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert("Forgot Password", "Please enter your email");
      return;
    }

    // Send password reset email
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Forgot Password", email);
        Alert.alert("Forgot Password", "Password reset email has been sent to your email address");
      })
      .catch((error) => {
        console.error("Forgot Password Error:", error.message);
        Alert.alert("Forgot Password Error", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.instructions}>Enter your email address to reset your password</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />

      <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  instructions: {
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
  },
  button: {
    width: 300,
    height: 40,
    backgroundColor: '#9932CC',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  link: {
    marginBottom: 20,
  },
  linkText: {
    color: '#9932CC',
    fontSize: 16,
  },
});

export default ForgotPasswordScreen;
