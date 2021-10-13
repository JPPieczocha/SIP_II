import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './pages/home'

function App() {
  return (
    <HomeScreen></HomeScreen>
  );
}
const Stack = createNativeStackNavigator();



export default App;