import React,{useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import splashscrren  from  './SplashScrren';
import HomePage from './HomePage';
import UmpireLogin from './UmpireLogin';
import PlayerHome from './PlayerHome';
const Stack = createNativeStackNavigator();
const RootStackScreen =({ navigation })=> {
return(
    <Stack.Navigator headerMode='none'>
       <Stack.Screen name="splashscrren" component={splashscrren} options={{headerShown: false}}/>
       
       <Stack.Screen name="HomePage" component={HomePage} options={{headerShown: false}}/>
       <Stack.Screen name="UmpireLogin" component={UmpireLogin}  options={{headerShown: true,title:'Umpire Login'}}/>

       <Stack.Screen name="PlayerHome" component={PlayerHome} options={{headerShown: false}}/>


    </Stack.Navigator>

    )
}
export default RootStackScreen;