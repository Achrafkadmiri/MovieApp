import React from 'react';
import Search from './Components/Search';
import Main from './Components/Main';
import ProfileScreen from './Components/FilmDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
export default function App() { 
  return (
     <NavigationContainer>
      <Stack.Navigator initialRouteName="Main"  >
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Details" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    
 
  );
}