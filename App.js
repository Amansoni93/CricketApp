import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStackScreen  from './Screen/RootStackScreen';
import Orientation from 'react-native-orientation-locker';
Orientation.lockToLandscape();
const App = ()  => {

  return (
  <NavigationContainer>
    <RootStackScreen/> 
  </NavigationContainer>
  );
};


export default App;
