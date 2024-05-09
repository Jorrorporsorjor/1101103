import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';

import LoginScreen from './screens/Login';
import SignUpScreen from './screens/Signup';
import ForgotPasswordScreen from './screens/ForgotPassword'; 
import MoodTrackerScreen from './screens/MoodTracker';
import ProfileScreen from './screens/Profile'; 
import HomeScreen from './screens/Home'; 
import ChatScreen from './screens/Chat'; 



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> 
        <Stack.Screen name="Profile" component={MainTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="hearto" size={24} color="black" />
          )
        }} 
      />
      <Tab.Screen 
        name="MoodTracker" 
        component={MoodTrackerScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="smileo" size={24} color="black" />
          )
        }} 
      />
      <Tab.Screen 
        name="Chat" 
        component={ChatScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="mail" size={24} color="black" />
          )
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={24} color="black" />
          )
        }} 
      />
    </Tab.Navigator>
  );
}

export default App;
