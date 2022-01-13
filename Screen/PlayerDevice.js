import React, { useEffect,useRef,useState } from 'react';
import {Button,StyleSheet,View, FlatList,TouchableOpacity,Image,Text,TextInput,ScrollView,ImageBackground,SafeAreaView,Alert } from 'react-native';
import GLOBALS from './helper/global'; 
import { Card } from 'react-native-paper';
import Colors from './helper/colors';
import axios from 'axios';
import Carousel from './component/Carousel';
import { dummyData } from './data/Data';
import { Directions } from 'react-native-gesture-handler';

const  PlayerDevice = ({ route,navigation }) =>  {
     const [MappedPlayerStatics, setMappedPlayerStaticsData] = useState();
     const  {BattingStatus} = route.params;

    const { WinTeanitemId } = route.params;
    const  {WinTeamitemName}  = route.params;
    const { LossTeamitemID } = route.params;
    const  {LossTeamitemName}  = route.params;
    const  {TossDesion} = route.params;
    const  {Teama1Status}  = route.params;
    const  {Teamb1Status} = route.params;
    const  {SeletedTeamWon} = route.params;
    
    console.log(LossTeamitemID,LossTeamitemName,WinTeanitemId,WinTeamitemName+'playerdevice'+TossDesion,Teama1Status,Teamb1Status);
    useEffect(() => {
      GetMappedPlayerStaticsData(GLOBALS.matchDetails.Match.ID);
    
      
    }, []); 
    const GetMappedPlayerStaticsData =(matchid) =>
  {
    
    axios.get(GLOBALS.BASE_URL +'GetMappedPlayersStatistics'+'/'+GLOBALS.API_USERID+'/'+GLOBALS.API_KEY+'/'+matchid)
    .then(function (response) {
      //console.log(response.data.PlayersStatistics);
      if(response.data.ResponseCode =='0'){
      setMappedPlayerStaticsData(response.data.PlayersStatistics);
      //console.log(response.data.PlayersStatistics);
      }
      
      })
      .catch(function (error) {
              console.log(error);
          });
  }
  if (MappedPlayerStatics && MappedPlayerStatics.length) {
    return (
      <TouchableOpacity
      style={{
        paddingHorizontal: 10,
        alignSelf: "center",
        marginTop: 20,
        backgroundColor: "#FFF",
        height: '80%',
        elevation: 1,
        width: '90%',
        borderRadius: 16,
      }}
    >
       <View style={{margin:5,flexDirection:'column'}}>
          <Text style={{fontSize:16,fontWeight:'700',marginLeft:10,color:Colors.blackcolor,alignSelf:'center',fontFamily:'RobotoRegular'}} >{BattingStatus}</Text>
          <Text style={{fontSize:14,fontWeight:'700',marginLeft:10,color:Colors.blackcolor,alignSelf:'center',fontFamily:'RobotoRegular'}} >Select Number of Devices being used for Game</Text>
          <Text style={{fontSize:12,fontWeight:'700',marginLeft:10,color:Colors.blackcolor,alignSelf:'center',fontFamily:'RobotoRegular'}} >गेम के लिए उपयोग किए जा रहे उपकरणों की संख्या का चयन करें</Text>
       </View>
        
       
        <View style={{flexDirection:'row',alignContent:'space-around',justifyContent:'space-between'}}>
            
        <Image  source={require("./images/DeviceImage.png")}    style={{width:40,height:80,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:10,padding:2}} />
        <View style={{flexDirection:'row'}}>
          <View style={{flexDirection:'column'}}>
          <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,color:Colors.blackcolor,padding:2}} >1 Device</Text>
          <Text style={{fontSize:14,fontWeight:'700',marginLeft:10,color:Colors.blackcolor,padding:2}} >1 डिवाइस</Text>
          </View>
        </View>
        
        <TouchableOpacity  style={{alignContent:'flex-end',alignItems:'flex-end'}} onPress={() => { navigation.navigate('GameWindow',{
                        WinTeanitemId: WinTeanitemId,
                        WinTeamitemName:WinTeamitemName,
                        LossTeamitemID: LossTeamitemID,
                        LossTeamitemName:LossTeamitemName,
                        TossDesion:TossDesion,
                        TeamA1Status:Teama1Status,
                        TeamB1Status:Teamb1Status,
                        DevicesUsedForGame:1,
                        SeletedTeamWon:SeletedTeamWon,
                    }); }}>
           <Image  source={require("./images/right_arrow.png")}  style={{width:49,height:42,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:0,padding:2}} />
        </TouchableOpacity>
        </View>
       
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            
        <Image  source={require("./images/DeviceImage.png")}    style={{width:40,height:80,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:10,padding:2}} />
        <Image  source={require("./images/DeviceImage.png")}    style={{width:40,height:80,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:10,padding:2}} />
        <View style={{flexDirection:'row'}}>
        <View style={{  flexDirection:'column'}}>
        <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,color:Colors.blackcolor,padding:2}} >2 Device</Text>
        <Text style={{fontSize:14,fontWeight:'700',marginLeft:10,color:Colors.blackcolor,padding:2}} >2 डिवाइस</Text>
        </View>
        </View>
        <TouchableOpacity  style={{alignContent:'flex-end',alignItems:'flex-end'}} onPress={() => { navigation.navigate('GameWindow',{
          WinTeanitemId: WinTeanitemId,
          WinTeamitemName:WinTeamitemName,
          LossTeamitemID: LossTeamitemID,
          LossTeamitemName:LossTeamitemName,
          TossDesion:TossDesion,
          TeamA1Status:Teama1Status,
          TeamB1Status:Teamb1Status,
          DevicesUsedForGame:2,   
          SeletedTeamWon:SeletedTeamWon,          
                    }); }}>
           <Image  source={require("./images/right_arrow.png")}  style={{width:49,height:42,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:0,padding:2}} />
        </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Image  source={require("./images/DeviceImage.png")}    style={{width:40,height:80,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:5,padding:1}} />
        <Image  source={require("./images/DeviceImage.png")}    style={{width:40,height:80,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:5,padding:2}} />
        <Image  source={require("./images/DeviceImage.png")}    style={{width:40,height:80,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:5,padding:2}} />
        <View style={{flexDirection:'row'}}>
        <View style={{  flexDirection:'column'}}>
        <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,color:Colors.blackcolor}} >3 Device</Text>
        
        <Text style={{fontSize:14,fontWeight:'700',marginLeft:10,color:Colors.blackcolor}} >3 डिवाइस</Text>
        </View>
        </View>
        <TouchableOpacity style={{alignContent:'flex-end',alignItems:'flex-end'}} onPress={() => { navigation.navigate('GameWindow',{
                        WinTeanitemId: WinTeanitemId,
                        WinTeamitemName:WinTeamitemName,
                        LossTeamitemID: LossTeamitemID,
                        LossTeamitemName:LossTeamitemName,
                        TossDesion:TossDesion,
                        TeamA1Status:Teama1Status,
                        TeamB1Status:Teamb1Status,
                        DevicesUsedForGame:3, 
                        SeletedTeamWon:SeletedTeamWon,
                    }); }}>
           <Image  source={require("./images/right_arrow.png")}  style={{width:49,height:42,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:0,padding:2}} />
        </TouchableOpacity>
        </View>

     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Image  source={require("./images/DeviceImage.png")}    style={{width:40,height:80,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:5,padding:2}} />
        <Image  source={require("./images/DeviceImage.png")}    style={{width:40,height:80,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:5,padding:2}} />
        <Image  source={require("./images/DeviceImage.png")}    style={{width:40,height:80,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:5,padding:2}} />
        <Image  source={require("./images/DeviceImage.png")}    style={{width:40,height:80,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:5,padding:2}} />
       <View style={{flexDirection:'row'}}>
        <View style={{ flexDirection:'column'}}>
        <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,color:Colors.blackcolor}} >4 Device</Text>
        
        <Text style={{fontSize:14,fontWeight:'700',marginLeft:10,color:Colors.blackcolor}} >4 डिवाइस</Text>
        </View>
        </View>
        <TouchableOpacity style={{alignContent:'flex-end'}} onPress={() => { navigation.navigate('GameWindow',{
                       WinTeanitemId: WinTeanitemId,
                       WinTeamitemName:WinTeamitemName,
                       LossTeamitemID: LossTeamitemID,
                       LossTeamitemName:LossTeamitemName,
                       TossDesion:TossDesion,
                       TeamA1Status:Teama1Status,
                        TeamB1Status:Teamb1Status,
                        DevicesUsedForGame:4, 
                        SeletedTeamWon:SeletedTeamWon,
                    }); }}>
           <Image  source={require("./images/right_arrow.png")}  style={{width:49,height:42,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:0,padding:2}} />
        </TouchableOpacity>
        </View>
       </TouchableOpacity>
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
export default PlayerDevice;