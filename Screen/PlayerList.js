import React, { useEffect,useRef,useState } from 'react';
import {Button,StyleSheet,View, FlatList,TouchableOpacity,Image,Text,TextInput,ScrollView,ImageBackground,SafeAreaView,Alert } from 'react-native';
import GLOBALS from './helper/global'; 
import { Card } from 'react-native-paper';
import Colors from './helper/colors';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

var icon;
const  PlayerList = ({ navigation }) =>  {
  const [TeamAData, setTeamAData] = useState([]);
  const [TeamBData, setTeamBData] = useState([]);
  const [selectedTossWonByID, setTossWonByID] = useState();
  const [selectedTossWonByName, setTossWonByName] = useState();
  const [selectedTossLossByID, setTossLossByID] = useState();
  const [selectedTossLossByName, setTossLossByName] = useState();
  useEffect(() => {
    GetTeamAData(GLOBALS.matchDetails.Match.ID,GLOBALS.matchDetails.Match.TeamA.ID);
    GetTeamBData(GLOBALS.matchDetails.Match.ID,GLOBALS.matchDetails.Match.TeamB.ID);
    
  }, []);  
  const GetTeamAData =(matchid,teamID) =>
  {
    
    axios.get(GLOBALS.BASE_URL +'GetMappedPlayersByMatchAndTeam'+'/'+GLOBALS.API_USERID+'/'+GLOBALS.API_KEY+'/'+matchid+'/'+teamID)
    .then(function (response) {
      if (response.data.ResponseCode==0) {
        setTeamAData(response.data.Players);
      }
      })
      .catch(function (error) {
              console.log(error);
          });
  }
  const GetTeamBData =(matchid,teamID) =>
  {
     axios.get(GLOBALS.BASE_URL +'GetMappedPlayersByMatchAndTeam'+'/'+GLOBALS.API_USERID+'/'+GLOBALS.API_KEY+'/'+matchid+'/'+teamID)
    .then(function (response) {
      if (response.data.ResponseCode==0) { 
      setTeamBData(response.data.Players);
      }
          })
          .catch(function (error) {
              console.log(error);
          });
  }
  const [data, setData] = useState({
    uri: '',
    umpireid:'',
    otp: '',
    users: [],
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidOTP: true,
});
  const [selectedTeamA, setSelectedTossTeamAValue] = useState();
  const [selectedTeamB, setSelectedTossTeamBValue] = useState();
  const [selectedTossvalue, settosssetValue] = useState();
  const [selectedTeamWon, setWhichTeamWon] = useState(0);
 
  const [selectedTossCalledID, setTossCalledByID] = useState();
  const [selectedTossCalledName, setTossCalledByName] = useState();
  const [TeamAStatus, TeamAPlayerStatus] = useState(0);
  const [TeamBStatus, TeamBPlayerStatus] = useState(0);
  const [selectedIdPlayerTeamA, setSelectedPlayerTeamAId] = useState();
  const [selectedIdPlayerTeamB, setSelectedPlayerTeamBId] = useState();
  const [selectedIdPlayerTeamAImage, setSelectedPlayerTeamAPhoto] = useState();
  const [selectedIdPlayerTeamBImage, setSelectedPlayerTeamBPhoto] = useState();
  const [selectTeamAPlayerID,setTeamAID] =useState();
  const [selectTeamBPlayerID,setTeamBID]= useState();
  const getRandomNumberBetween =(min,max) => {
    return Math.floor(Math.random()*(max-min+1)+min);
}
var choice = 0;
var tossWinner =0;
var ctr = 0;
var ID=0;
var teamname;

const setSelectedTossTeam  = (tossvalue,tossCalledBy) => {
    if (TeamAStatus==1 && TeamBStatus ==1) {

      if(tossvalue ==1 || tossvalue ==2)
      {
        settosssetValue(0);

      ctr += 1;
      if(ctr==1){
              setTimeout(() => {
                var randomSelected = 0;
                var randomVal = getRandomNumberBetween(100, 300);
                //console.log("Second"+randomVal);
                if (randomVal < 200)
                          randomSelected = 0;
                      else randomSelected = 1;
      
                      if (choice == randomSelected)
                      {
                          if (tossCalledBy == 0)
                              tossWinner = 1;
                          else
                              tossWinner = 2;
                      }
                      else
                      {
                          if (tossCalledBy == 0)
                              tossWinner = 2;
                          else tossWinner = 1;
                      }
                      var isHead = (randomSelected == 0);
                      
                      if (isHead==1)
                      {
                         icon=require("./images/coin_head.gif");
                         settosssetValue(1);
                      }
                      else
                      {
                         icon=require("./images/coin_tail.gif");
                         settosssetValue(1);
                      }
      
                      if (tossWinner == 1)
                      {
                          ID = GLOBALS.matchDetails.Match.TeamA.ID;
                          setTossWonByName(GLOBALS.matchDetails.Match.TeamA.Name);
                          setTossWonByID(GLOBALS.matchDetails.Match.TeamA.ID);
                          setTossLossByID(GLOBALS.matchDetails.Match.TeamB.ID);
                          setTossLossByName(GLOBALS.matchDetails.Match.TeamB.Name);
                          setWhichTeamWon(1);
                        
                          
                      } else {
                          ID = GLOBALS.matchDetails.Match.TeamB.ID;
                          setTossWonByName(GLOBALS.matchDetails.Match.TeamB.Name);
                          setTossWonByID(GLOBALS.matchDetails.Match.TeamB.ID);
                          setTossLossByID(GLOBALS.matchDetails.Match.TeamA.ID);
                          setTossLossByName(GLOBALS.matchDetails.Match.TeamA.Name);
                          setWhichTeamWon(2);
                      }
            }, 1000);
           
          }
      }
    }else {
      Alert.alert(
        "Sorry",
        "Please select Captions from Both Team.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
    //console.log("Team A"+tossvalue);
    setSelectedTossTeamAValue(tossvalue);

  }
  
  const getPlayerdetailsTeamA =(Playerid,PlayerName) =>
  {
    //console.log(Playerid);
    setTossCalledByID(Playerid);
    setTossCalledByName(PlayerName);
    axios.get(GLOBALS.BASE_URL +'GetPlayerByID'+'/'+GLOBALS.API_USERID+'/'+GLOBALS.API_KEY+'/'+Playerid)
    .then(function (response) {
     
    //  console.log(response.data.ResponseMessageEnglish);
      if(response.data.ResponseCode =='0'){
        //console.log("Check"+response.data.Player);
        GLOBALS.TeamADetails = response.data;
        TeamAPlayerStatus(1);
        setSelectedPlayerTeamAId(response.data.Player.Name); 
        setSelectedPlayerTeamAPhoto(response.data.Player.Photo);
        setTeamAID(response.data.Player.ID);
       
   } else if(response.data.ResponseCode =='1'){
       Alert.alert(
           response.data.ResponseMessageEnglish,
           response.data.ResponseMessageHindi,
           [
             {
               text: "Cancel",
               onPress: () => console.log("Cancel Pressed"),
               style: "cancel"
             },
             { text: "OK", onPress: () => console.log("OK Pressed") }
           ]
       );
   }
              
             
          })
          .catch(function (error) {
              console.log(error);
          });
  }
  const getPlayerdetailsTeamB =(Playerid,playerName) =>
  {
    setTossCalledByID(Playerid);
    setTossCalledByName(playerName);

    axios.get(GLOBALS.BASE_URL +'GetPlayerByID'+'/'+GLOBALS.API_USERID+'/'+GLOBALS.API_KEY+'/'+Playerid)
    .then(function (response) {
     
      
      if(response.data.ResponseCode =='0'){
       // console.log("Check"+response.data);
        GLOBALS.TeamBDetails = response.data.Player.Name;
        TeamBPlayerStatus(1);
        setSelectedPlayerTeamBId(response.data.Player.Name);
        setSelectedPlayerTeamBPhoto(response.data.Player.Photo);
        setTeamBID(response.data.Player.ID);
       
   } else if(response.data.ResponseCode =='1'){
       Alert.alert(
           response.data.ResponseMessageEnglish,
           response.data.ResponseMessageHindi,
           [
             {
               text: "Cancel",
               onPress: () => console.log("Cancel Pressed"),
               style: "cancel"
             },
             { text: "OK", onPress: () => console.log("OK Pressed") }
           ]
       );
   }
              
             
          })
          .catch(function (error) {
              console.log(error);
          });
  }

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
      />
    );
  };
  const renderItem1 = ({ item }) => {
    return (
      <Item1
        item={item}
      />
    );
  };
  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity
    onPress={()=> getPlayerdetailsTeamA(item.ID,item.Name)} 
    style={{
      paddingHorizontal: 5,
      paddingTop:10,
      alignSelf: "center",
      marginTop: 10,
      backgroundColor: "#FFF",
      height: 70,
      elevation: 1,
      width: '100%',
      borderRadius: 16,
    }}
  >
    
        <View style={{flexDirection:'row',}}>
            <Image  source={{ uri: item.Photo,}}   style={styles.coverImage} />
        <View  style={{flex:1,alignContent:'flex-end',justifyContent:'flex-end',position:'relative'}}> 
           <Text style={{fontSize:16,fontWeight:'700',textAlign:'center',alignSelf:'center',color:'#000000',flexDirection: 'column',justifyContent:'flex-end',flex:1,alignItems:'flex-end'}}>{item.Name}</Text>
          
         </View>
       </View>
      
  </TouchableOpacity>
  );
  const Item1 = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity
    onPress={()=> getPlayerdetailsTeamB(item.ID,item.Name)}
    style={{
      paddingHorizontal: 5,
      paddingTop:10,
      alignSelf: "center",  
      marginTop: 10,
      backgroundColor: "#FFF",
      height: 70,
      elevation: 1,
      width: '100%',
      borderRadius: 16,
    }}
  >
   
        <View style={{flexDirection:'row',}}>
        <Image  source={{
          uri: item.Photo,
        }}   style={styles.coverImage}/>
        <View style={{flex:1,alignContent:'flex-start',justifyContent:'flex-start',position:'relative'}}>
        <Text style={{fontSize:16,fontWeight:'700',textAlign:'center',flexDirection: 'column',color:'#000000',justifyContent:'flex-end',flex:1,alignItems:'flex-end'}}>{item.Name}</Text>
           {/* <Image  source={require('./images/Edit_Icon.png')} resizeMode="contain"   style={styles.editImage}/> */}
           </View>
        </View>
     
  </TouchableOpacity>
  );
  const getCurrentDate=()=>{

   // var currentTimeInSeconds=Math.floor(Date.now()/1000); //unix timestamp in seconds
     var currentTimeInMilliseconds=Date.now();
     return currentTimeInMilliseconds;
}
  const SaveTossdetailsTeam  = (CaptionAID,CaptionBID,Message,TossDesion) =>
  {
    
    var current_date  =  "\/Date("+getCurrentDate()+")\/";
    var TeamAStatus;
    var TeamBStatus;
    if (selectedTeamWon==1) {
      if (TossDesion==0) {
        TeamAStatus = true;
        TeamBStatus=false;
      }else {
        TeamBStatus=true;
        TeamAStatus = false;
      }
    }else if (selectedTeamWon==2) {
      if (TossDesion==0) {
        TeamBStatus = true;
        TeamAStatus=false;
        }else {
          TeamAStatus=false;
          TeamBStatus = true;
        }
    }
    //console.log("Toss Result",selectedTeamWon);
    
    const params = JSON.stringify({"TossResults":null,"TossResult":{
      "Match":{"ID":GLOBALS.matchDetails.Match.ID,"Title":GLOBALS.matchDetails.Match.Title,"Description":GLOBALS.matchDetails.Match.Description,"MatchDate":GLOBALS.matchDetails.Match.MatchDate,"Venue":GLOBALS.matchDetails.Match.Venue,"Sponsor":GLOBALS.matchDetails.Match.Sponsor,"NumberOfOvers":GLOBALS.matchDetails.Match.NumberOfOvers,"NumberOfPlayers":GLOBALS.matchDetails.Match.NumberOfPlayers,
      "TeamA":{"ID":GLOBALS.matchDetails.Match.TeamA.ID,"Name":GLOBALS.matchDetails.Match.TeamA.Name,"NickName":GLOBALS.matchDetails.Match.TeamA.NickName,"Coach":GLOBALS.matchDetails.Match.TeamA.Coach,"AboutTeam":GLOBALS.matchDetails.Match.TeamA.AboutTeam,"Logo":GLOBALS.matchDetails.Match.TeamA.Logo,"Class":GLOBALS.matchDetails.Match.TeamA.Class,"Topic":GLOBALS.matchDetails.Match.TeamA.Topic,"CreatedOn":GLOBALS.matchDetails.Match.TeamA.CreatedOn,"IsVisible":GLOBALS.matchDetails.Match.TeamA.IsVisible,"PreferredLanguage":GLOBALS.matchDetails.Match.TeamA.PreferredLanguage,
      "Players":GLOBALS.matchDetails.Match.TeamA.Players,
      "IsBatting":TeamAStatus,"CreatedBy":null},
      "TeamACreationType":GLOBALS.matchDetails.Match.TeamACreationType,
      "TeamB":{"ID":GLOBALS.matchDetails.Match.TeamB.ID,"Name":GLOBALS.matchDetails.Match.TeamB.Name,"NickName":GLOBALS.matchDetails.Match.TeamB.NickName,"Coach":GLOBALS.matchDetails.Match.TeamB.Coach,"AboutTeam":GLOBALS.matchDetails.Match.TeamB.AboutTeam,"Logo":GLOBALS.matchDetails.Match.TeamB.Logo,"Class":GLOBALS.matchDetails.Match.TeamB.Class,"Topic":GLOBALS.matchDetails.Match.TeamB.Topic,"CreatedOn":GLOBALS.matchDetails.Match.TeamB.CreatedOn,"IsVisible":GLOBALS.matchDetails.Match.TeamB.IsVisible,"PreferredLanguage":GLOBALS.matchDetails.Match.TeamB.PreferredLanguage,
      "Players":GLOBALS.matchDetails.Match.TeamB.Players,
      "IsBatting":TeamBStatus,"CreatedBy":null},
      "TeamBCreationType":GLOBALS.matchDetails.Match.TeamBCreationType,
      "SelectedQuestionSet":GLOBALS.matchDetails.Match.SelectedQuestionSet,
      "Umpire":GLOBALS.matchDetails.Match.Umpire,"UmpireUniqueCode":GLOBALS.matchDetails.Match.UmpireUniqueCode,"CreatedOn":GLOBALS.matchDetails.Match.CreatedOn,"LastUpdated":GLOBALS.matchDetails.Match.LastUpdated,"IsVisible":GLOBALS.matchDetails.Match.IsVisible,"MatchWonFinalRemark":GLOBALS.matchDetails.Match.MatchWonFinalRemark,
      "CreatedBy":GLOBALS.matchDetails.Match.CreatedBy},
      "TossCalledBy":{"ID":selectedTossWonByID,"Name":selectedTossWonByName,"NickName":null,"Coach":null,"AboutTeam":null,"Logo":null,"Class":null,"Topic":null,"CreatedOn":null,"IsVisible":false,"PreferredLanguage":0,"Players":null,"IsBatting":false,"CreatedBy":null},
      "TossWonBy":{"ID":selectedTossWonByID,"Name":selectedTossWonByName,"NickName":null,"Coach":null,"AboutTeam":null,"Logo":null,"Class":null,"Topic":null,"CreatedOn":null,"IsVisible":false,"PreferredLanguage":0,"Players":null,"IsBatting":false,"CreatedBy":null},
      "TossDate":current_date,"DECISIONAFTERTOSS":TossDesion,"TossRemark":selectedTossWonByName+" has won the toss and elected to Bowl first."},"APIUserID":"NIC","APIKey":"123456","IPAddress":null});

      //console.log(params);
        axios.post(GLOBALS.BASE_URL +'SaveTossResult', params,{
            "headers": {
            "content-type": "application/json",
            },
            })
          .then(function (response) {

            //console.log(response.data);

                    if(response.data.ResponseCode == 0 || response.data.ResponseCode=='0'){
                      var myinfo;
                      if(TossDesion == 0)
                      {
                        myinfo = selectedTossWonByName +" is going to Bat";
                      }
                      else
                      {
                        myinfo = selectedTossWonByName +" is going to Boll";
                      }
                     // console.log(selectedTossLossByID,selectedTossLossByName,selectedTossWonByID,selectedTossWonByName,'PlyerList');
                      navigation.navigate('TeamPlayerOverView', {
                        TeamWinitemId: selectedTossWonByID,
                        TeamWinitemName:selectedTossWonByName,
                        TeamLossitemID:selectedTossLossByID,
                        TeamLossitemName:selectedTossLossByName,
                        BattingStatus:myinfo,
                        TossDesion:TossDesion,
                        TeamA1Status:TeamAStatus,
                        TeamB1Status:TeamBStatus,
                        SeletedTeamWon:selectedTeamWon,
                        
                    });
                    } else {
                        Alert.alert(
                            "Internal Server Error",
                            [
                              { text: "OK", onPress: () => console.log("OK Pressed") }
                            ]
                          );    
                    }
                    
                   
                })
                .catch(function (error) {
                    console.log(error);
                });

  }
  
 return (
    <View style={styles.container}>
   
      
      <TouchableOpacity
    style={{
      paddingHorizontal: 12,
      alignSelf: "center",
      alignContent:'center',
      justifyContent:'center',
      marginTop: 10,
      height:30,
      flexDirection:'row',
      backgroundColor: "#FFF",
      elevation: 1,
      width: '90%',
      borderRadius: 16,
    }}>
        <Text style={{fontSize:16,fontWeight:'700',marginLeft:10,textAlign:'left',color:'#414A4C', fontFamily: "RobotoBold",}}>{GLOBALS.matchDetails.Match.TeamA.Name}</Text>
        <Text style={{fontSize:16,fontWeight:'700',marginRight:10,  paddingLeft: 70,textAlign:'right', fontFamily: "RobotoBold",alignItems:'flex-end',color:'#414A4C'}}>{GLOBALS.matchDetails.Match.TeamB.Name}</Text>
        </TouchableOpacity>
      
      {(selectedTossvalue) == 1 ? (
          <View  style={{flex:1,alignContent:'center',justifyContent:'center',marginTop:40,marginBottom:10}}>
             <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
             
                 <Image  source={icon}    style={{width:80,height:80,justifyContent:'center',alignContent:'center'}}/>
               
             </View>
             <View style={{flexDirection:'row',alignContent:'center',justifyContent:'space-between',marginLeft:10,marginRight:10}}>
               <TouchableOpacity onPress={ ()=> SaveTossdetailsTeam(selectTeamAPlayerID,selectTeamBPlayerID,selectedTossWonByName,0) }>
                   <Image  source={require("./images/batting_icon.png")}    style={{width:50,height:80,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:10,padding:10}} />
               </TouchableOpacity>
               
               <TouchableOpacity
    style={{
      paddingHorizontal: 32,
      alignSelf: "center",
      marginTop: 20,
      height:40,
      flexDirection:'row',
      backgroundColor: "#FFF",
      elevation: 1,
      width: '60%',
      borderRadius: 16,
    }}>
             <Text style={{color:Colors.Marooncolor,alignItems:'center',justifyContent:'center',fontFamily:'RobotoRegular'}}>{(selectedTossWonByID) != '' ? ( selectedTossWonByName):(<View></View>)} has won the toss.</Text>
             </TouchableOpacity>
             <TouchableOpacity onPress={ ()=> SaveTossdetailsTeam(selectTeamAPlayerID,selectTeamBPlayerID,selectedTossWonByName,1) }>
                   <Image  source={require("./images/bowling_icon.png")}    style={{width:50,height:80,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:10,padding:10}} />
               </TouchableOpacity>
             
             </View>
             
          </View>
      ): (selectedTossvalue) ==0?(
        <View style={{alignSelf:'center'}}>
           
             <Image  source={require("./images/coin_flip.gif")}    style={{width:80,height:80,justifyContent:'center',alignContent:'center'}}/>
             </View>
      ):(
        
          <TouchableOpacity
    style={{
      paddingHorizontal: 32,
      alignSelf: "center",
      marginTop: 10,
      height:40,
      flexDirection:'row',
      backgroundColor: "#FFF",
      elevation: 1,
      width: '90%',
      borderRadius: 16,
      justifyContent: "center",alignItems: "center"
    }}>
        <Text style={{textAlignVertical: "center",textAlign: "center",color:Colors.blackcolor,alignItems:'center',justifyContent:'center', fontFamily: "RobotoRegular",fontSize:16}}>   Select Captain from  Both Team and then click 'Call Toss'</Text>
        </TouchableOpacity>
       
       
      )}
      
      <TouchableOpacity
    style={{
      paddingHorizontal: 32,
      alignSelf: "center",
      marginTop: 10,
      height:30,
      flexDirection:'row',
      backgroundColor: "#FFF",
      elevation: 1,
      width: '50%',
      borderRadius: 16,justifyContent: "center",alignItems: "center"
    }}>
        <Text adjustsFontSizeToFit={true}  style={{textAlignVertical: "center",fontFamily:'RobotoRegular',color:Colors.blackcolor,justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center',alignContent:'center',fontSize:16}}>Match ID :{GLOBALS.matchDetails.Match.ID}</Text>
        </TouchableOpacity>
       
    <View style={{flexDirection:'row',flex:3,margin:5}}>
        <View style={{flex:1,flexDirection:'row',padding:2,shadowColor:'#000', }}>
        <SafeAreaView style={{flex:1}}>
        <TouchableOpacity
    style={{
      paddingHorizontal: 10,
      paddingTop:10,
      alignSelf: "center",
      marginTop: 20,
      height:55,
      flexDirection:'row',
      backgroundColor: "#FFF",
      elevation: 1,
      width: '100%',
      borderRadius: 6,
    }}>
       {(TeamAStatus) == 1 ? ( 
         <View style={{flexDirection:'row'}}>
           <Image  source={{ uri: selectedIdPlayerTeamAImage,}}   style={styles.coverImage} />
           <Text style={{fontSize:16,fontWeight:'700',textAlign:'center',color:Colors.blackcolor,justifyContent:'center'}}> {selectedIdPlayerTeamA} (Caption) </Text>
           </View>
       ):(
        <Text style={{fontSize:16,fontWeight:'700',textAlign:'center',color:Colors.blackcolor,justifyContent:'center'}}>  Select Captain from  Team A</Text>
       )}
       </TouchableOpacity>
       <TouchableOpacity
      style={{
      paddingHorizontal: 10,
      alignSelf: "center",
      height:50,
      backgroundColor:'#9CD85C',
      flexDirection:'row',
      elevation: 1,
      width: '100%',
      borderRadius: 6,
    }}>
        <Picker  style={styles.input} onValueChange={(itemValue, itemIndex) => setSelectedTossTeam(itemValue,0)} >
              <Picker.Item label="Call Toss" value="0" />
              <Picker.Item label="HEAD" value="1" />
              <Picker.Item label="TAIL" value="2" />
            </Picker>
        </TouchableOpacity>
        <FlatList data={TeamAData}   contentContainerStyle={{padding:2}}
         renderItem={renderItem}
         keyExtractor={(item, index) => item.ID}
        />
        
    
       
        </SafeAreaView>
    </View>
    <View style={{flex:1,flexDirection:'row',padding:2,}}>
      <SafeAreaView style={{flex:1}}>
         <TouchableOpacity
    style={{
      paddingHorizontal: 10,
      alignSelf: "center",
      marginTop: 20,
      height:55,
      flexDirection:'row',
      backgroundColor: "#FFF",
      elevation: 1,
      width: '100%',
      borderRadius: 6,
    }}>
    {(TeamBStatus) == 1 ? ( 
       <View style={{flexDirection:'row'}}>
           <Image  source={{ uri: selectedIdPlayerTeamBImage,}}   style={styles.coverImage} />
           <Text style={{fontSize:16,fontWeight:'700',textAlign:'center',color:Colors.blackcolor,justifyContent:'center'}}>  {selectedIdPlayerTeamB} (Caption)  </Text>
           </View>
       ) : (
      <Text style={{fontSize:16,fontWeight:'700',textAlign:'center',color:Colors.blackcolor,justifyContent:'center'}}>  Select Captain From Team B </Text>
    )}
        </TouchableOpacity>
        
        <TouchableOpacity
    style={{
      paddingHorizontal: 10,
      alignSelf: "center",
      height:50,
      backgroundColor:'#9CD85C',
      flexDirection:'row',
      elevation: 1,
      width: '100%',
      borderRadius: 6,
    }}>
        <Picker  style={styles.input} onValueChange={(itemValue, itemIndex) => setSelectedTossTeam(itemValue,1)} >
        <Picker.Item label="Call Toss" value="0" />
              <Picker.Item label="HEAD" value="1" />
              <Picker.Item label="TAIL" value="2" />
            </Picker>
        </TouchableOpacity>
    <FlatList data={TeamBData}
        renderItem={renderItem1}
        keyExtractor={(item, index) => item.ID}
         />
     
    
        </SafeAreaView>
    </View>
    </View>
    
</View>
    
 )
      
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F2F5FE'
    },
    coverImage: {
      width: 50,
      height: 50,
      borderRadius:20,
    
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
      textAlign: "center",
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
  
export default PlayerList;