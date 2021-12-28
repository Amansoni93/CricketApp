import React, { useEffect,useRef,useState } from 'react';
import {Button,StyleSheet,View, FlatList,TouchableOpacity,Image,Text,TextInput,ScrollView,ImageBackground,SafeAreaView,Alert } from 'react-native';
import GLOBALS from './helper/global'; 
import { Card } from 'react-native-paper';
import Colors from './helper/colors';
import axios from 'axios';
import Carousel from './component/Carousel';
import { dummyData } from './data/Data';
import { Directions } from 'react-native-gesture-handler';

const  GameWindow = ({ route,navigation }) =>  {
     const [MappedPlayerStatics, setMappedPlayerStaticsData] = useState();
    const { WinTeanitemId } = route.params;
    const  {WinTeamitemName}  = route.params;
    const { LossTeamitemID } = route.params;
    const  {LossTeamitemName}  = route.params;
    const  {TossDesion} = route.params;
    console.log(LossTeamitemID,LossTeamitemName,WinTeanitemId,WinTeamitemName,'Game',TossDesion)
    useEffect(() => {
      GetMappedPlayerStaticsData(GLOBALS.matchDetails.Match.ID);
    
      
    }, []); 
    var batteamname,bowlteamname;
    if(TossDesion==1)
    {
        batteamname=LossTeamitemName;
        bowlteamname=WinTeamitemName;
    }
    else
    {
        batteamname=WinTeamitemName;
        bowlteamname=LossTeamitemName;
    }
    const GetMappedPlayerStaticsData =(matchid) =>
  {
    
    axios.get(GLOBALS.BASE_URL +'GetMappedPlayersStatistics'+'/'+GLOBALS.API_USERID+'/'+GLOBALS.API_KEY+'/'+matchid)
    .then(function (response) {
      //console.log(response.data.PlayersStatistics);
      if(response.data.ResponseCode =='0'){
      setMappedPlayerStaticsData(response.data.PlayersStatistics);
      console.log(response.data.PlayersStatistics);
      }
      
      })
      .catch(function (error) {
              console.log(error);
          });
  }
  if (MappedPlayerStatics && MappedPlayerStatics.length) {
    return (
        <View style={styles.container}>
        {/* <ImageBackground source={require('./images/main_bg.png')}  resizeMode="cover" style={styles.image}>  */}
        
        <View style={{flex:1,marginTop:30 }}>
       
          <View style={{flex:1,flexDirection:'row',}}>
            
          <Image  source= {{ uri:GLOBALS.matchDetails.Match.TeamA.Logo}}  style={{width:60,height:60,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:10,padding:2}} />
          <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,flex:1,color:Colors.blackcolor,padding:2}} >{batteamname}</Text>
          <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,flex:1,color:Colors.Marooncolor,padding:2}} >Batting</Text>
       
        </View>

        <View style={{flex:1, flexDirection:'row'}}>
        <Image  source={require("./images/DeviceImage.png")}    style={{width:60,height:60,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:10,padding:2}} />
        <View style={{flexDirection:'column'}}>
        <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,flex:1,color:Colors.blue,padding:2}} >Batsman 1</Text>
          <Text style={{fontSize:12,fontWeight:'700',marginLeft:10,flex:1,color:Colors.blue,padding:2}} >Batsman(Striker)</Text>
         
          <View style={styles.btnSecondary}>
                            <TouchableOpacity  onPress={() => { navigation.navigate('PlayerDevice',{
                      
                    }); }} >
                                <Text style={{ fontWeight: "bold", marginHorizontal: 5, alignItems: 'stretch',color:'#ffffff' }} >
                                    Select Bats</Text>
                            </TouchableOpacity>
                        </View>
         

          </View>
          
          <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,flex:1,color:Colors.blue,padding:2}} >00</Text>
          </View>
          
          <View style={{flex:1, flexDirection:'row'}}>
        <Image  source={require("./images/DeviceImage.png")}    style={{width:60,height:60,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:10,padding:2}} />
        <View style={{flexDirection:'column'}}>
        <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,flex:1,color:Colors.blue,padding:2}} >Batsman 2 </Text>
          <Text style={{fontSize:12,fontWeight:'700',marginLeft:10,flex:1,color:Colors.blue,padding:2}} >Batsman(Non-Striker)</Text>
         
          <View style={styles.btnSecondary}>
                            <TouchableOpacity  onPress={() => { navigation.navigate('PlayerDevice',{
                      
                    }); }} >
                                <Text style={{ fontWeight: "bold", marginHorizontal: 5, alignItems: 'stretch',color:'#ffffff' }} >
                                    Select Bats</Text>
                            </TouchableOpacity>
                        </View>
         

          </View>
          
          <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,flex:1,color:Colors.blue,padding:2}} >00</Text>
          </View>

        </View>
        
        <View style={{flex:1,marginTop:30 }}>
       
       <View style={{flexDirection:'row'}}>
         
       <Image  source={{ uri:GLOBALS.matchDetails.Match.TeamB.Logo}}  style={{width:60,height:60,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:10,padding:2}} />
       <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,flex:1,color:Colors.blackcolor,padding:2}} >{bowlteamname}</Text>
       <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,flex:1,color:Colors.Marooncolor,padding:2}} >Bowling</Text>
    
     </View>

     <View style={{flex:1, flexDirection:'row'}}>
     <Image  source={require("./images/DeviceImage.png")}    style={{width:60,height:60,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:10,padding:2}} />
     <View style={{flexDirection:'column'}}>
     <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,flex:1,color:Colors.blue,padding:2}} >Bowler</Text>
       <Text style={{fontSize:12,fontWeight:'700',marginLeft:10,flex:1,color:Colors.blue,padding:2}} >Bowler</Text>
      
       <View style={styles.btnSecondary}>
                         <TouchableOpacity  onPress={() => { navigation.navigate('PlayerDevice',{
                   
                 }); }} >
                             <Text style={{ fontWeight: "bold", marginHorizontal: 5, alignItems: 'stretch',color:'#ffffff' }} >
                                 Select Bats</Text>
                         </TouchableOpacity>
                     </View>
      

       </View>
       
       <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,flex:1,color:Colors.blue,padding:2}} >00</Text>
       </View>
       
       <View style={{flex:1, flexDirection:'row'}}>
     <Image  source={require("./images/DeviceImage.png")}    style={{width:60,height:60,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:10,padding:2}} />
     <View style={{flexDirection:'column'}}>
     <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,flex:1,color:Colors.blue,padding:2}} >Fielder</Text>
       <Text style={{fontSize:12,fontWeight:'700',marginLeft:10,flex:1,color:Colors.blue,padding:2}} >Fielder</Text>
      
       <View style={styles.btnSecondary}>
                         <TouchableOpacity  onPress={() => { navigation.navigate('PlayerDevice',{
                   
                 }); }} >
                             <Text style={{ fontWeight: "bold", marginHorizontal: 5, alignItems: 'stretch',color:'#ffffff' }} >
                                 Select Bats</Text>
                         </TouchableOpacity>
                     </View>
      

       </View>
       
       <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,flex:1,color:Colors.blue,padding:2}} >00</Text>
       </View>

        </View>

         <View style={{flex:1, flexDirection:'row',marginTop:30 ,padding:10}}>
         <View style={styles.btnEnd}>
                         <TouchableOpacity  onPress={() => { navigation.navigate('PlayerDevice',{
                   
                 }); }} >
                             <Text style={{ fontWeight: "bold", marginHorizontal: 5, alignItems: 'stretch',color:Colors.white }} >
                                 End Game</Text>
                         </TouchableOpacity>
                     </View>
                     <View style={styles.btnBlack}>
                         <TouchableOpacity  onPress={() => { navigation.navigate('PlayerDevice',{
                   
                 }); }} >
                             <Text style={{ fontWeight: "bold", marginHorizontal: 5, alignItems: 'stretch',color:Colors.white }} >
                                 Extend Over</Text>
                         </TouchableOpacity>
                     </View>
                     <View style={styles.btnBlack}>
                         <TouchableOpacity  onPress={() => { navigation.navigate('PlayerDevice',{
                   
                 }); }} >
                             <Text style={{ fontWeight: "bold", marginHorizontal: 5, alignItems: 'stretch',color:Colors.white }} >
                                 BOWL(1)</Text>
                         </TouchableOpacity>
                     </View>
             </View>    
       {/* </ImageBackground> */}
       </View>
    )
    
   }
   console.log('Please provide Images')
    return null
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    coverImage: {
      width: 50,
      height: 50,
      borderRadius:50,
    
    },
    editImage: {
      width: 30,
      height: 30,
      position: 'absolute',
      margin: 10,
      right: 0,
      bottom: -20,
    },
    textView: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',

      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    input: {
      color: Colors.blackcolor,
      paddingLeft: 30,
      borderBottomWidth: 1,
      flex: 1,
      fontSize: 18,
    },
    imageText: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
    },
    centerimage:{
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width:80,
      alignSelf:'flex-start',
      height:80,
    },
    btnBlack: {
        height: 50,
        borderWidth: 1,
        borderColor: Colors.maincolor,
        backgroundColor:Colors.blackcolor,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        flexDirection: 'row',
    },
    btnEnd: {
        height: 50,
        borderWidth: 1,
        borderColor: Colors.maincolor,
        backgroundColor:Colors.Marooncolor,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        flexDirection: 'row',
    },
    btnSecondary: {
      height: 50,
      borderWidth: 1,
      borderColor: Colors.maincolor,
      backgroundColor:Colors.primary,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      flexDirection: 'row',
  },
    btnPrimary:{
      backgroundColor:'#28388f',
      height:50,
      marginTop:10,
      justifyContent:'center',
      padding:10,
      alignItems:'center',
      borderRadius:5
  },
    image: {
      flex: 1,
      justifyContent: "center"
    },
    inputContainer: {
      flexDirection: "row",
      marginBottom: 20,
      padding: 20,
  
    },
    text: {
      color: "white",
      fontSize: 42,
      lineHeight: 84,
      fontWeight: "bold",
      backgroundColor: "#000000c0"
    },
    bottomView:{
      flex:1,
      width: '100%', 
      height: 200, 
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',
      marginVertical: 10,
      bottom: 50,
      borderRadius:5
    },
    buttonspace: {
      marginBottom: 20,
      padding: 30,
      color:"#0030a1",
      backgroundColor:"#0030a1"
    },
    space: {
      width: 10, 
      height: 10,
    },
  
  });
export default GameWindow;