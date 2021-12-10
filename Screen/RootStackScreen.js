import React,{useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import splashscrren  from  './SplashScrren';
import HomePage from './HomePage';
import UmpireLogin from './UmpireLogin';
import PlayerHome from './PlayerHome';
import PlayerList from './PlayerList';
const Stack = createNativeStackNavigator();
const RootStackScreen =({ navigation })=> {
return(
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name="HomePage" component={HomePage} options={{headerShown: false}}/>
       <Stack.Screen name="UmpireLogin" component={UmpireLogin}  options={{headerShown: true,title:'Umpire Login'}}/>
       <Stack.Screen name="PlayerHome" component={PlayerHome} options={{headerShown: true}}/>
       <Stack.Screen name="PlayerList" component={PlayerList} options={{headerShown: true}}/>


    </Stack.Navigator>

    )
}
export default RootStackScreen;