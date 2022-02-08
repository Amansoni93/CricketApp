import React,{useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './HomePage';
import UmpireLogin from './UmpireLogin';
import PlayerHome from './PlayerHome';
import PlayerList from './PlayerList';
import TeamPlayerOverView from './TeamPlayerOverView';
import PlayerDevice from './PlayerDevice';
import GameWindow from './GameWindow';

const Stack = createNativeStackNavigator();
const RootStackScreen =({ navigation })=> {
return(
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name="HomePage" component={HomePage} options={{headerShown: false}}/>
       <Stack.Screen name="UmpireLogin" component={UmpireLogin}  options={{headerShown: false,title:'Umpire Login'}}/>
       <Stack.Screen name="PlayerHome" component={PlayerHome} options={{headerShown: false}}/>
       <Stack.Screen name="PlayerList" component={PlayerList} options={{headerShown: false}}/>
       <Stack.Screen name="TeamPlayerOverView" component={TeamPlayerOverView} options={{headerShown: false}}/>
       <Stack.Screen name="PlayerDevice" component={PlayerDevice} options={{headerShown: false}}/>
       <Stack.Screen name="GameWindow" component={GameWindow} options={{headerShown: false}}/>
    </Stack.Navigator>

    )
}
export default RootStackScreen;