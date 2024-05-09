import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../config/firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Login error", "Please enter email and password");
      return;
    }
  
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Login Success");
        // นำทางไปยังหน้าหลักหรือ Dashboard หลังจากเข้าสู่ระบบเรียบร้อย
        navigation.navigate("Profile"); // ชื่อหน้าต่าง ๆ ที่คุณต้องการ
      })
      .catch((err) => Alert.alert("Login error", err.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>
      <Text style={styles.signup}>Please enter your email and password{'\n'}</Text>
    
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
      <Text style={styles.signup}>Don't have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={{color: '#9932CC'}}> Sign Up</Text>
      </TouchableOpacity>
    </View>
    <View style={{marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={{color: '#9932CC'}}> Forgot Password</Text>
      </TouchableOpacity>
    </View>
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
    marginBottom: 30,
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
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});
