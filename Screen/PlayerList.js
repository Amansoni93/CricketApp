import React, { useEffect,useRef } from 'react';
import {Button,StyleSheet,View, FlatList,TouchableOpacity,Image,Text,TextInput,ScrollView} from 'react-native';
import GLOBALS from './helper/global'; 
import { Card } from 'react-native-paper';
const  PlayerList = ({ navigation }) =>  {
 return (
    <View style={{backgroundColor:'#fff',flexDirection:'row',justifyContent:'space-between',marginLeft:10,marginRight:10}}>
    <FlatList data={GLOBALS.matchDetails.Match.TeamA.Players}
       renderItem={({item,index}) =>(
      <View >
        <Card onPress={() => {
  navigation.navigate('Employerdetails', {
  itemId: item,
  otherParam: index,
});
}} >
        
        <View style={{ borderBottomColor: 'black',borderBottomWidth: 1,    }}  />
        <View style={{flex:1,flexDirection:'row',padding:5,marginLeft:20}}>
          <Text style={{fontSize:18,opacity:.7,textAlign:'left',flex:1,}}>Experience </Text>
          <Text style={{fontSize:22,fontWeight:'700',textAlign:'center'}}>{item.Name}</Text>
        </View>
      
     </Card>
      </View>
     
    )}>

    </FlatList>
    <FlatList data={GLOBALS.matchDetails.Match.TeamB.Players}
       renderItem={({item,index}) =>(
      <View >
        <Card onPress={() => {
  navigation.navigate('Employerdetails', {
  itemId: item,
  otherParam: index,
});
}} >
        
        <View style={{ borderBottomColor: 'black',borderBottomWidth: 1,    }}  />
        <View style={{flex:1,flexDirection:'row',padding:5,marginLeft:20}}>
          <Text style={{fontSize:18,opacity:.7,textAlign:'left',flex:1,}}>Experience </Text>
          <Text style={{fontSize:22,fontWeight:'700',textAlign:'center'}}>{item.Name}</Text>
        </View>
      
     </Card>
      </View>
     
    )}>

    </FlatList>
</View>

 );

}
export default PlayerList;