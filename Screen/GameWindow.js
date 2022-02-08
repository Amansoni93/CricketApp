import React, { useEffect,useRef,useState } from 'react';
import {Button,StyleSheet,View, FlatList,Dimensions,Modal,Animated,TouchableOpacity,Image,Text,TextInput,ScrollView,TouchableHighlight,ImageBackground,SafeAreaView,Alert } from 'react-native';
import GLOBALS from './helper/global'; 
import { Card } from 'react-native-paper';
import Colors from './helper/colors';
import axios from 'axios';
import { Directions } from 'react-native-gesture-handler';
import RBSheet from "react-native-raw-bottom-sheet";
import RNRestart from 'react-native-restart'; 
import Video from 'react-native-video';
import CarouselQuestion from './component/CarouselQuestion';
import { dummyData } from './data/Data';
var batteamname,bowlteamname;
var batteamIcon,bowlteamIcon;
var videopath =null;
import notification from './helper/notifications';
var topBarP1Name,topBarP2Name,topBarPB1,topBarPB2,lblCurrentOver,TotalDevicesBeingUsedForGame;
var MatchID;
const numColumns =2;
const  WIDTH = Dimensions.get('window').width;
var AnswerRandomSubmit = 0;
var isRandomAnswered = false ;
const ModalPoup = ({visible, children}) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};
const  GameWindow = ({ route,navigation }) =>  {

  const refRBSheetTeamBat1 = useRef();
  const refRBSheetTeamBat2 = useRef();
  const refRBSheetTeamBoll1 = useRef();
  const refRBSheetTeamBoll2 = useRef();
  const [TeamAData, setTeamAData] = useState([]);
  const [TeamBData, setTeamBData] = useState([]);
  const [Bat1IDData, setBatData1ID] = useState(null);
  const [Bat1NameData, setBatData1Name] = useState('Batsman 1');
  const [Bat1PhotoData, setBatData1Photo] = useState();
  const [StrickerBatsmanData,setBat1DataAllDetails]= useState();
  const [Bat2IDData, setBatData2ID] = useState(null);
  const [Bat2NameData, setBatData2Name] = useState('Batsman2');
  const [Bat2PhotoData, setBatData2Photo] = useState();
  const [NonStrickerData,setNonStrickerBatsmanData] =useState();
  const [Boll1IDData, setBollData1ID] = useState(null);
  const [Boll1NameData, setBollData1Name] = useState('Bowler');
  const [Boll1PhotoData, setBollData1Photo] = useState();
  const [BollerData,setBollerData] =useState();
  const [Boll2IDData, setBollData2ID] = useState(null);
  const [Boll2NameData, setBollData2Name] = useState('Fielder');
  const [Boll2PhotoData, setBollData2Photo] = useState();
  const [filderData,setFilderData]= useState();
  const [NoofBoll, setNoofBollThrow] = useState(0);
  const [QuestionDeliverItems, setQuestionDeliverItems] = useState([]);
  const [ShowHideBar,SetShowHideTopBar] =  useState(0);
  const [ShowVideoPath,setvideovideopath] =  useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTeamscore, setScore] = useState(0);
  const [CurrentSession,setCurrentSession] = useState(0);
  const [ScoreInfo,SetScoreInfomation] = useState('');
  const [PlayerScoreStriker,setPlayerScoreStricker] = useState(0);
  const [PlayerScoreNonStricker,setPlayerScoreNonStricker]= useState(0);
   const [CurrentOver,SetCurrentOver] = useState(0);
   const [TotalFoursSixesTopBar,setTotalFoursSixesTopBar]= useState(0);
  const[RunsScoredTopBar,setRunsScoredTopBar]=useState(0);
  const[TargetTopBar,setTarget]= useState(0);
  const [TotalBallsDeliveredTopBar,setTotalBallsDeliveredTopBar] = useState('');
  const [WicketsTakenTopBar,setWicketsTakenTopBar]= useState('');
  const [visible, setVisible] = React.useState(false);
  const { WinTeanitemId } = route.params;
  const  {WinTeamitemName}  = route.params;
  const { LossTeamitemID } = route.params;
  const  {LossTeamitemName}  = route.params;
  const  {TossDesion} = route.params;
  const  {TeamA1Status} = route.params;
  const  {TeamB1Status} = route.params;
  const {DevicesUsedForGame} =  route.params;
  const {SeletedTeamWon} =  route.params;
   
   
    useEffect(() => {
      
      GLOBALS.CurrentBowlBeingThrown =1;
      if (SeletedTeamWon == 1) {
        if (TossDesion==0) {
        GetTeamAData(GLOBALS.matchDetails.Match.ID,GLOBALS.matchDetails.Match.TeamA.ID);
        GetTeamBData(GLOBALS.matchDetails.Match.ID,GLOBALS.matchDetails.Match.TeamB.ID);
        batteamname = GLOBALS.matchDetails.Match.TeamA.Name;
        bowlteamname= GLOBALS.matchDetails.Match.TeamB.Name;
        batteamIcon = GLOBALS.matchDetails.Match.TeamA.Logo;
        bowlteamIcon= GLOBALS.matchDetails.Match.TeamB.Logo;
        GLOBALS.TeamAIsBatting= true;
        GLOBALS.TeamBIsBatting= false;
        MatchID =  GLOBALS.matchDetails.Match.ID;
        }
        else  if (TossDesion==1) {
          GetTeamAData(GLOBALS.matchDetails.Match.ID,GLOBALS.matchDetails.Match.TeamB.ID);
          GetTeamBData(GLOBALS.matchDetails.Match.ID,GLOBALS.matchDetails.Match.TeamA.ID);
          batteamname = GLOBALS.matchDetails.Match.TeamB.Name;
          bowlteamname= GLOBALS.matchDetails.Match.TeamA.Name;
          batteamIcon = GLOBALS.matchDetails.Match.TeamB.Logo;
          bowlteamIcon= GLOBALS.matchDetails.Match.TeamA.Logo;
          GLOBALS.TeamAIsBatting= false;
          GLOBALS.TeamBIsBatting= true;
          MatchID =  GLOBALS.matchDetails.Match.ID;
        }
        
      } else  if (SeletedTeamWon==2) {
        
      
        if (TossDesion==0) { 
          GetTeamAData(GLOBALS.matchDetails.Match.ID,GLOBALS.matchDetails.Match.TeamB.ID);
          GetTeamBData(GLOBALS.matchDetails.Match.ID,GLOBALS.matchDetails.Match.TeamA.ID);
          batteamname = GLOBALS.matchDetails.Match.TeamB.Name;
          bowlteamname= GLOBALS.matchDetails.Match.TeamA.Name;
          batteamIcon = GLOBALS.matchDetails.Match.TeamB.Logo;
          bowlteamIcon= GLOBALS.matchDetails.Match.TeamA.Logo;
          GLOBALS.TeamAIsBatting= false;
          GLOBALS.TeamBIsBatting= true;
          MatchID =  GLOBALS.matchDetails.Match.ID;
        }else if (TossDesion==1){
          GetTeamAData(GLOBALS.matchDetails.Match.ID,GLOBALS.matchDetails.Match.TeamA.ID);
          GetTeamBData(GLOBALS.matchDetails.Match.ID,GLOBALS.matchDetails.Match.TeamB.ID);
          batteamname = GLOBALS.matchDetails.Match.TeamA.Name;
          bowlteamname= GLOBALS.matchDetails.Match.TeamB.Name;
          batteamIcon = GLOBALS.matchDetails.Match.TeamA.Logo;
          bowlteamIcon= GLOBALS.matchDetails.Match.TeamB.Logo;
          GLOBALS.TeamAIsBatting= true;
          GLOBALS.TeamBIsBatting= false;
          MatchID =  GLOBALS.matchDetails.Match.ID;
         
        }
      }
          }, []); 
    
    const getBattingPlayer1Details=(playerid,name,photo,StrickerBatsman) => {
     
      try {
        var team = (GLOBALS.TeamAIsBatting) ? GLOBALS.matchDetails.Match.TeamA : GLOBALS.matchDetails.Match.TeamB ;
        var isTeamA = (GLOBALS.TeamAIsBatting) ? true : false;
        const myStrickerBatsmanObject = {
          "APIKey" : '123456',
          "APIUserID":'NIC',
          "Game": {
            "SelectedStrikerBatsman" : {"ID" : playerid} ,
            "Match": { "ID" : GLOBALS.matchDetails.Match.ID }
          }
      };
        //console.log("Josn DATA",myObject);
        const params = JSON.stringify(myStrickerBatsmanObject);
        
        axios.post(GLOBALS.BASE_URL +'SelectPlayerForGame', params,{
            "headers": {
            "content-type": "application/json",
            },
            })
          .then(function (response) {

                    if(response.data.ResponseCode == 0 || response.data.ResponseCode=='0'){
                     
                      setBatData1ID(playerid);
                      setBatData1Name(name);
                      setBatData1Photo(photo);
                      setBat1DataAllDetails(StrickerBatsman);

                      refRBSheetTeamBat1.current.close();
                        
                    } else {
                        Alert.alert(
                            "Internal Server Error. Unable to select Player",
                            [
                              { text: "OK", onPress: () => console.log("OK Pressed") }
                            ]
                          );    
                    }
                    
                   
                })
                .catch(function (error) {
                    console.log(error);
                });
        } catch (e) {
        console.log('Error')
        }
      
    }
    const getBattingPlayer2Details= (playerid,name,photo,nonstrickerdata) =>{
      try {
        var team = (GLOBALS.TeamAIsBatting) ? GLOBALS.matchDetails.Match.TeamA : GLOBALS.matchDetails.Match.TeamB ;
        var isTeamA = (GLOBALS.TeamAIsBatting) ? true : false;
        const myNonStrickerBatsmanObject = {
          "APIKey" : '123456',
          "APIUserID":'NIC',
          "Game": {
            "SelectedNonStrikerBatsman" : {"ID" : playerid} ,
            "Match": { "ID" : GLOBALS.matchDetails.Match.ID }
          }
      };
        const params = JSON.stringify(myNonStrickerBatsmanObject);
        
        axios.post(GLOBALS.BASE_URL +'SelectPlayerForGame', params,{
            "headers": {
            "content-type": "application/json",
            },
            })
          .then(function (response) {

                    if(response.data.ResponseCode == 0 || response.data.ResponseCode=='0'){
                       
                      setBatData2ID(playerid);
                      setBatData2Name(name);
                      setBatData2Photo(photo);
                      setNonStrickerBatsmanData(nonstrickerdata);
                      refRBSheetTeamBat1.current.close();
                        
                    } else {
                        Alert.alert(
                            "Internal Server Error. Unable to select Player",
                            [
                              { text: "OK", onPress: () => console.log("OK Pressed") }
                            ]
                          );    
                    }
                    
                   
                })
                .catch(function (error) {
                    console.log(error);
                });
        } catch (e) {
        console.log('Error')
        }
     
      refRBSheetTeamBat2.current.close();
    }
    const getBollPlayer1Details =(playerid,name,photo,bowlerdata) =>{
      try {
        var team = (GLOBALS.TeamAIsBatting) ? GLOBALS.matchDetails.Match.TeamA : GLOBALS.matchDetails.Match.TeamB ;
        var isTeamA = (GLOBALS.TeamAIsBatting) ? true : false;
        const myBollerObject = {
          "APIKey" : '123456',
          "APIUserID":'NIC',
          "Game": {
            "SelectedBowler" : {"ID" : playerid} ,
            "Match": { "ID" : GLOBALS.matchDetails.Match.ID }
          }
      };
        const params = JSON.stringify(myBollerObject);
        
        axios.post(GLOBALS.BASE_URL +'SelectPlayerForGame', params,{
            "headers": {
            "content-type": "application/json",
            },
            })
          .then(function (response) {

                    if(response.data.ResponseCode == 0 || response.data.ResponseCode=='0'){
                       
                      setBollData1ID(playerid);
                      setBollData1Name(name);
                      setBollData1Photo(photo);
                      setBollerData(bowlerdata);
                      if (response.data.DeviceIDList != null && response.data.DeviceIDList.length>0)
                      {
                        let names =response.data.DeviceIDList;
                          var dev1 = names.find((x => x === "3"));

                          sendPushNotification(dev1.DeviceID, "CB");
                      }
                        
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
        } catch (e) {
        console.log('Error')
        }
     
      refRBSheetTeamBoll1.current.close();
    }
    const getBollPlayer2Details =(playerid,name,photo,filderdata) =>
    {
      try {
        var team = (GLOBALS.TeamAIsBatting) ? GLOBALS.matchDetails.Match.TeamA : GLOBALS.matchDetails.Match.TeamB ;
        var isTeamA = (GLOBALS.TeamAIsBatting) ? true : false;
        const myFilderObject = {
          "APIKey" : '123456',
          "APIUserID":'NIC',
          "Game": {
            "SelectedFielder" : {"ID" : playerid} ,
            "Match": { "ID" : GLOBALS.matchDetails.Match.ID }
          }
      };
        const params = JSON.stringify(myFilderObject);
        
        axios.post(GLOBALS.BASE_URL +'SelectPlayerForGame', params,{
            "headers": {
            "content-type": "application/json",
            },
            })
          .then(function (response) {

                    if(response.data.ResponseCode == 0 || response.data.ResponseCode=='0'){
                       
                      setBollData2ID(playerid);
                      setBollData2Name(name);
                      setBollData2Photo(photo);
                      setFilderData(filderdata);
                      if (response.data.DeviceIDList != null && response.data.DeviceIDList.length>0)
                        {
                          let names =response.data.DeviceIDList;
                          var dev2 = names.find((x => x === "4"));
                          sendPushNotification(dev2.DeviceID, "CF");
                        }

                        
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
        } catch (e) {
        console.log('Error')
        }
      
      refRBSheetTeamBoll2.current.close();
    }
    
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
    const renderItem2 = ({ item }) => {
      return (
        <Item2
          item={item}
        />
      );
    };
    const renderItem3 = ({ item }) => {
      return (
        <Item3
          item={item}
        />
      );
    };
    const Item = ({ item, onPress, backgroundColor, textColor }) => (
      <TouchableOpacity
      onPress={()=> getBattingPlayer1Details(item.ID,item.Name,item.Photo,item)} 
      style={{
        paddingHorizontal: 5,
        alignSelf: "center",
        marginTop:5,
        backgroundColor: "#FFF",
        elevation: 1,
        height:60,
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
      onPress={()=> getBattingPlayer2Details(item.ID,item.Name,item.Photo,item)} 
      style={{
        paddingHorizontal: 5,
        marginTop:10,
        alignSelf: "center",
        height:60,
        backgroundColor: "#FFF",
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
    const Item2 = ({ item, onPress, backgroundColor, textColor }) => (
      <TouchableOpacity
      onPress={()=> getBollPlayer1Details(item.ID,item.Name,item.Photo,item)} 
      style={{
        paddingHorizontal: 5,
        alignSelf: "center",
        backgroundColor: "#FFF",
        marginTop:10,
        height:60,
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
    const Item3 = ({ item, onPress, backgroundColor, textColor }) => (
      <TouchableOpacity
      onPress={()=> getBollPlayer2Details(item.ID,item.Name,item.Photo,item)} 
      style={{
        paddingHorizontal: 5,
        alignSelf: "center",
        backgroundColor: "#FFF",
        marginTop:10,
        height:60,
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
    const ExitGame = ()=>
    {
      Alert.alert(
        "Do You relly want to close ?",
        "All unsaved data will be reset.",
        [
          
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Exit ok", onPress: () => RNRestart.Restart()  }
        ]
      );
    }
    const PlayGame = async() => {
      try {
        isRandomAnswered = false;
        
        if (Bat1IDData == null) 
        {
          Alert.alert(
            "Please select Striker Batsman."
          );
        }

        if (Bat2IDData == null) {
          Alert.alert(
            "Please select Non-Striker Batsman."
          );
        }
        if (Bat1IDData == Bat2IDData) {
          Alert.alert(
            "Please select two different Player from Batting Team."
          );
        }
        if (Bat1IDData != null && Bat2IDData != null && Boll1IDData != null && Boll2IDData != null)
        {
            topBarP1Name = Bat1NameData + "   (Batting)";
            topBarP2Name = Boll1NameData + "   (Bowling)";
            topBarPB1 = Bat1PhotoData;
            topBarPB2 = Boll1PhotoData;
            

            var  lblCurrentOver = ((GLOBALS.CurrentBowlBeingThrown) / 6) + "." + ((GLOBALS.CurrentBowlBeingThrown) % 6) + " Thrown";
            SetCurrentOver(lblCurrentOver);
            if (GLOBALS.TempPlayerScores != null && GLOBALS.TempPlayerScores.Count > 0)
                    {
                        var  TotalFoursSixesTopBar = GLOBALS.TempPlayerScores.Where(t => t.PlayerType == 1)[0].TotalFours + "  /  " + GLOBALS.TempPlayerScores.Where(t => t.PlayerType == 1)[0].TotalSixes;
                        setTotalFoursSixesTopBar(TotalFoursSixesTopBar);
                        var lblRunsScoredTopBar = GLOBALS.TempPlayerScores.Where(t => t.PlayerType == 1)[0].TotalIndividualRuns.ToString("d2");
                        setRunsScoredTopBar(lblRunsScoredTopBar);
                        var lblTarget = GLOBALS.TempPlayerScores.Where(t => t.PlayerType == 1)[0].Target;
                        setTarget(lblTarget);
                        var totalBallsThrown = GLOBALS.TempPlayerScores.Where(t => t.PlayerType == 3)[0].TotalIndividulBallsThrown;

                        var lblTotalBallsDeliveredTopBar = (totalBallsThrown / 6) + "." + (totalBallsThrown % 6);
                        setTotalBallsDeliveredTopBar(lblTotalBallsDeliveredTopBar);
                        var lblWicketsTakenTopBar = GLOBALS.TempPlayerScores.Where(t => t.PlayerType == 4)[0].TotalIndividualWickets.ToString();
                        setWicketsTakenTopBar(lblWicketsTakenTopBar);
                    }
            
           

            if (GLOBALS.QuestionsDeliveredForLevelGroup == null)
            {
              GLOBALS.QuestionsDeliveredForLevelGroup= [];
            }
            
            var randomGroup = 1;

            var retryCount = 0;
             
            var tempCtr = 0;
            while (true)
            {
              
                randomGroup = getRandomNumberBetween(GLOBALS.matchDetails.Match.SelectedQuestionSet.MinLevelGroupID, GLOBALS.matchDetails.Match.SelectedQuestionSet.MaxLevelGroupID);

                if ( !GLOBALS.QuestionsDeliveredForLevelGroup.filter(element => element == randomGroup))
                {
                  break;
                }
                    

                if (tempCtr > 10)   // 10 attempts to get random number
                {

                  break;
                }
                   

                tempCtr += 1;
            }
            TotalDevicesBeingUsedForGame = (DevicesUsedForGame == 0) ? 1 : DevicesUsedForGame;
            const myDeliverBowlObject = {
              "APIKey" : '123456',
              "APIUserID":'NIC',
              "Match": {
                "ID" : GLOBALS.matchDetails.Match.ID ,
                "SelectedQuestionSet": { "MinLevelGroupID" : randomGroup },
                "TotalDevicesBeingUsedForGame": TotalDevicesBeingUsedForGame = (DevicesUsedForGame == 0) ? 1 : DevicesUsedForGame
              }
          };
            const params = JSON.stringify(myDeliverBowlObject);
      
        console.log(params);
        axios.post(GLOBALS.BASE_URL +'DeliverBowlByLevelV2', params,{
            "headers": {
            "content-type": "application/json",
            },
            })
          .then(function (response) {

            console.log("code",response.data);

                    if(JSON.stringify(response.data.ResponseCode) == 0 ||  JSON.stringify(response.data.ResponseCode) =='0' ){
                       
                      if (response.data.DeviceIDList != null &&  response.data.DeviceIDList.length>0 )
                      {

                        for (let device of response.data.DeviceIDList) {
                          //console.log(device.DeviceID);
                            //SendPushNotification(device.DeviceID, "QA");
                            
                            setTimeout(() => {
                              sendPushNotification(device.DeviceID, "QA");
                          }, 40);
                        
                      } 
                       
                      }
                      try {
                        axios.get(GLOBALS.BASE_URL +'GetViewersByMatch'+'/'+GLOBALS.API_USERID+'/'+GLOBALS.API_KEY+'/'+match_id)
                        .then(function (response) {
                         // console.log("Check"+response.data.ResponseCode);
                                  if(JSON.stringify(response.data.ResponseCode) =='0' || JSON.stringify(response.data.ResponseCode) ==0){
                                    if (response.data.DeviceIDList != null &&  response.data.DeviceIDList.length>0 )
                                    {
              
                                      for (let device of response.data.Viewers) {
                                        //console.log(device.DeviceID);
                                          //SendPushNotification(device.DeviceID, "QA");
                                          try {
                                            setTimeout(() => {
                                              sendPushNotification(device.DeviceDetail.ClientToken, "QAV");
                                          }, 40);
                                            } catch (e) {
                                            console.log('Error')
                                            }
                                    } 
                                     
                                    }
                                      
                                      
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
                        } catch (e) {
                        console.log('Error')
                        }
                      GLOBALS.CurrentBowlBeingThrown = response.data.QuestionDeliveryItem.BowlNo;
                      setNoofBollThrow(+response.data.QuestionDeliveryItem.BowlNo);
                      setTimeout(() => {
                        timerGetAnswerStatus();   
                      }, 20000);
                      setTimeout(() => {
                        GetQuestionForViewer();
                      }, 10);
                      
                     

                       if (! GLOBALS.QuestionsDeliveredForLevelGroup.find(randomGroup))
                       {
                         GLOBALS.QuestionsDeliveredForLevelGroup.push(randomGroup);
                       }
                        
                    } else   {
                      
                          if (response.data.ResponseMessageEnglish== "selected striker")
                          {
                              setBatData1ID(null);
                              setBatData1Photo(null);
                              setBatData1Name("Batsman 1");
                              lblPlayerScoreStriker.Text = "0";
                          }
                          else if (response.data.ResponseMessageEnglish =="selected non-striker")
                          {
                              setBatData2ID(null);
                              setBatData2Photo(null);
                              setBatData2Name("Batsman 2");
                              lblPlayerScoreNonStriker.Text = "0";
                          }
                          else if (response.data.ResponseMessageEnglish=="selected bowler")
                          {
                            
                              setBollData1ID(null);
                              setBollData1Photo("Bowler");
                              
                          }
                          else if (response.data.ResponseMessageEnglish == "selected fielder")
                          {
                              setBollData2ID(null);
                              setBollData2Photo(null);
                              setBollData2Name("Fielder");
                      
                          }
                          Alert.alert(JSON.stringify(response.data.ResponseMessageEnglish));
                      }
                })
                .catch(function (error) {
                     
                });


        }

        } catch (e) {
        console.log('Error',e)
        }
    }
    const GetQuestionForViewer = async () => {
      SetShowHideTopBar(1);
      

      axios.get(GLOBALS.BASE_URL +'WhatIsTheQuestionForViewer'+'/'+GLOBALS.API_USERID+'/'+GLOBALS.API_KEY+'/'+MatchID)
      .then(function (response) {
        
                if(JSON.stringify(response.data.ResponseCode) ==0 || JSON.stringify(response.data.ResponseCode) =="0"){

                  if (JSON.stringify(response.data.QuestionDeliveryItem) != null && JSON.stringify(response.data.QuestionDeliveryItem).length>0) {
                    
                    
                    setQuestionDeliverItems(response.data.QuestionDeliveryItem);
                  }
                    
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
    const timerGetAnswerStatus= async ()=>{
      try {
      axios.get(GLOBALS.BASE_URL +'GetAnswerStatus'+'/'+GLOBALS.API_USERID+'/'+GLOBALS.API_KEY+'/'+MatchID)
          .then(function (response) {
           console.log("Check"+response.data.ResponseCode);
                    if(response.data.ResponseCode =='0'|| response.data.ResponseCode ==0){
                      console.log("NOt Automatic",response.data);
                      try {

                        SetShowHideTopBar(0);
                        const myUpdateScoreObject = {
                          "APIKey" : '123456',
                          "APIUserID":'NIC',
                          "Game": {
                            "CurrentBowlBeingThrown" : GLOBALS.CurrentBowlBeingThrown,
                            "SelectedStrikerBatsman":StrickerBatsmanData,
                            "SelectedNonStrikerBatsman":NonStrickerData,
                            "SelectedBowler":BollerData,
                            "SelectedFielder" : filderData,
                            "CurrentSession":1,
                            "Match": { "ID" : GLOBALS.matchDetails.Match.ID }
                          }
                      };
                        const params = JSON.stringify(myUpdateScoreObject);
                        
                        axios.post(GLOBALS.BASE_URL +'UpdateScore', params,{
                            "headers": {
                            "content-type": "application/json",
                            },
                            })
                          .then(function (responsescore) {
                
                           // console.log("Update Score Result",JSON.stringify(responsescore.data.ResponseCode));
                
                                    if(JSON.stringify(responsescore.data.ResponseCode) == 0 || JSON.stringify(responsescore.data.ResponseCode)=='0'){
                                      
                                      setScore(responsescore.data.Game.Score);
                                    //  console.log("Update Score Score",JSON.stringify(responsescore.data.Game.Score.AnimationType));
                                   
                                       if (JSON.stringify(responsescore.data.Game.Score.AnimationType)==11) { // catchout
                                        SetShowHideTopBar(2);
                                        setvideovideopath(<Video 
                                          source={require('./Videos/GameVideos/Catch/Catch.mp4')}
                                          style={styles.backgroundVideo} 
                                          resizeMode={'contain'}
                                          volume={10}/>);
                                        setDuration(14);
                                        setTimeout(() => {
                                          SetShowHideTopBar(0);               
                                        }, 12000);
                                       
                                       }else if (JSON.stringify(responsescore.data.Game.Score.AnimationType)==10) { // Bowled 
                                        SetShowHideTopBar(2);
                                        setvideovideopath(<Video 
                                          source={require('./Videos/GameVideos/Bowled/Bowled.mp4')}
                                          style={styles.backgroundVideo} 
                                          resizeMode={'contain'}
                                          volume={10}/>);
                                        //setvideovideopath(require('./Videos/GameVideos/Bowled/Bowled.mp4'));
                                        setDuration(15);
                                        setTimeout(() => {
                                          SetShowHideTopBar(0);               
                                        }, 12000);
                                       }else if (JSON.stringify(responsescore.data.Game.Score.AnimationType)==9) { // RunOut 
                                        SetShowHideTopBar(2); 
                                        setDuration(15);
                                        setvideovideopath(<Video 
                                          source={require('./Videos/GameVideos/Runout/Runout.mp4')}
                                          style={styles.backgroundVideo} 
                                          resizeMode={'contain'}
                                          volume={10}/>);
                                       // setvideovideopath(require('./Videos/GameVideos/Runout/Runout.mp4'));
                                        setTimeout(() => {
                                          SetShowHideTopBar(0);               
                                        }, 12000);
                                       } else if (JSON.stringify(responsescore.data.Game.Score.AnimationType)==8) { // CatchMissed
                                        SetShowHideTopBar(2);   
                                        setDuration(10);
                                        setvideovideopath(<Video 
                                          source={require('./Videos/GameVideos/CatchMissed/CatchMissed.mp4')}
                                          style={styles.backgroundVideo} 
                                          resizeMode={'contain'}
                                          volume={10}/>);
                                        //setvideovideopath(require('./Videos/GameVideos/CatchMissed/CatchMissed.mp4'));
                                        setTimeout(() => {
                                          SetShowHideTopBar(0);               
                                        }, 13000);
                                       }else if (JSON.stringify(responsescore.data.Game.Score.AnimationType)==7) { // BallMissed    
                                        SetShowHideTopBar(2);
                                        setDuration(5);
                                        setvideovideopath(<Video 
                                          source={require('./Videos/GameVideos/NoRuns/BallMissed.mp4')}
                                          style={styles.backgroundVideo} 
                                          resizeMode={'contain'}
                                          volume={10}/>);
                                        //setvideovideopath(require('./Videos/GameVideos/NoRuns/BallMissed.mp4'));
                                        setTimeout(() => {
                                          SetShowHideTopBar(0);               
                                        }, 12000);
                                       }else if (JSON.stringify(responsescore.data.Game.Score.AnimationType)==6) { // Six    
                                        SetShowHideTopBar(2);
                                        setDuration(13);
                                        setvideovideopath(<Video 
                                          source={require('./Videos/GameVideos/Six/Six.mp4')}
                                          style={styles.backgroundVideo} 
                                          resizeMode={'contain'}
                                          volume={10}/>);
                                        //setvideovideopath(require('./Videos/GameVideos/Six/Six.mp4'));
                                        setTimeout(() => {
                                          SetShowHideTopBar(0);               
                                        }, 13000);
                                       }else if (JSON.stringify(responsescore.data.Game.Score.AnimationType)==4) { // Four    
                                        SetShowHideTopBar(2);
                                        setDuration(12);
                                        setvideovideopath(<Video 
                                          source={require('./Videos/GameVideos/Four/Four.mp4')}
                                          style={styles.backgroundVideo} 
                                          resizeMode={'contain'}
                                          volume={10}/>);
                                        //setvideovideopath(require('./Videos/GameVideos/Four/Four.mp4'));
                                        setTimeout(() => {
                                          SetShowHideTopBar(0);               
                                        }, 13000);
                                    
                                       }else if (JSON.stringify(responsescore.data.Game.Score.AnimationType)==1) { // Single    
                                        SetShowHideTopBar(2); 
                                        setDuration(6);
                                        setvideovideopath(<Video 
                                          source={require('./Videos/GameVideos/Run/Single.mp4')}
                                          style={styles.backgroundVideo} 
                                          resizeMode={'contain'}
                                          volume={10}/>);
                                        //setvideovideopath(require('./Videos/GameVideos/Run/Single.mp4'));
                                        setTimeout(() => {
                                          SetShowHideTopBar(0);               
                                        }, 12000);
                                        
                                       }else if (JSON.stringify(responsescore.data.Game.Score.AnimationType)==0) { // Dot 
                                        SetShowHideTopBar(2);    
                                        setDuration(5);
                                        setvideovideopath(<Video 
                                          source={require('./Videos/GameVideos/NoRuns/DotBall.mp4')}
                                          style={styles.backgroundVideo} 
                                          resizeMode={'contain'}
                                          volume={10}/>);
                                        //setvideovideopath(require('./Videos/GameVideos/NoRuns/DotBall.mp4'));
                                        setTimeout(() => {
                                          SetShowHideTopBar(0);               
                                        }, 12000);
                                       }
                                      //  SetShowHideTopBar(3);
                                       
                         try {
                          const mySwapPlayerObject = {
                            "APIKey" : '123456',
                            "APIUserID":'NIC',
                            "Game": {
                              "Match": { "ID" : GLOBALS.matchDetails.Match.ID },
                              "Score" : responsescore.data.Game.Score,
                            }
                        };
      
      
      const paramsswap = JSON.stringify(mySwapPlayerObject);
      
      console.log("Swap Parameter",mySwapPlayerObject);
      console.log("Swap Parameter json ",paramsswap);
      axios.post(GLOBALS.BASE_URL +'SwapPlayerIfApplicable', paramsswap,{
          "headers": {
          "content-type": "application/json",
          },
          })
        .then(function (responseswap) {
          console.log("Swap  Response1  "+ responseswap.data);
           console.log("Swap  Response  "+ JSON.stringify(responseswap.data));
          

                  if(JSON.stringify(responseswap.data.ResponseCode) == 0 || JSON.stringify(responseswap.data.ResponseCode)=='0'){
                    try {
                      try {
                        if (parseInt(responseswap.data.ResponseMessageHindi) == 1)
                        {
                          var tempTeam1id =Bat1IDData;
                          var tempTeam1Name= Bat1NameData;
                          var tempTeam1photo  = Bat1PhotoData;
                          var tempTeam2id  = Bat2IDData;
                          var tempTeam2name= Bat2NameData;
                          var teamTeam2photo = Bat2PhotoData;
                          setBatData1ID(tempTeam2id);
                          setBatData1Name(tempTeam2name);
                          setBatData1Photo(teamTeam2photo);
                          setBatData2ID(tempTeam1id);
                          setBatData2Name(tempTeam1Name);
                          setBatData2Photo(tempTeam1photo);
                         
                      }
                       var ppp = scoreResponse.Game.ScoreItems.Where(t => t.PlayerType == 1)[0];
                     
                      SetScoreInfomation(ppp.TotalTeamRuns.ToString("d2") + " / " + ppp.TotalTeamWickets + "    (" + ppp.TotalOvers + ")")
                        } catch (e) {
                        console.log('Error')
                        }
                        
                      } catch (e) {
                      console.log('Error')
                      }
                      var showTempScore = true;
                      try {
                        axios.get(GLOBALS.BASE_URL +'GetMatchWonStatus'+'/'+GLOBALS.API_USERID+'/'+GLOBALS.API_KEY+'/'+match_id)
                        .then(function (responsematchwon) {
       // console.log("Check"+response.data.ResponseCode);
                if(responsematchwon.data.ResponseCode =='0'){

                    if (responsematchwon.data.DeviceIDList != null) {
                      for (let device of responsematchwon.data.DeviceIDList) {
                        //console.log(device.DeviceID);
                          //SendPushNotification(device.DeviceID, "QA");
                          sendPushNotification(device.DeviceID, "FR");
                         
                    }
                  }

                  showTempScore = false;
                  setVisible(true);
                } else if(responsematchwon.data.ResponseCode =='1'){
                    Alert.alert(
                      responsematchwon.data.ResponseMessageEnglish,
                      responsematchwon.data.ResponseMessageHindi,
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
                        } catch (e) {
                        console.log('Error')
                        }
                     
                      if (responseswap.data.DeviceIDList != null && responseswap.data.DeviceIDList.Count > 0)
                        {
                          
                                      for (let device of responseswap.data.DeviceIDList) {
                                        //console.log(device.DeviceID);
                                          //SendPushNotification(device.DeviceID, "QA");
                                          sendPushNotification(device.DeviceID, "R");
                                          setTimeout(() => {
                                          
                                        }, 100);
                                        
                                    }
                      }
                      if (showTempScore) {
                        
                        //  this  is  a  testing    code  of  
                        if (responsescore.data.Game.ScoreItems[0].CurrentScore % 2 != 0)
                          {
                                            // Swap Players (Important)
                                            GLOBALS.TempPlayerScores = [];
                                            var p1 = responsescore.data.Game.ScoreItems.filter(t => t.PlayerType === 1);
                                            var p2 = responsescore.data.Game.ScoreItems.filter(t => t.PlayerType === 2);
                                            var p3 = responsescore.data.Game.ScoreItems.filter(t => t.PlayerType ===  3);

                                            GLOBALS.TempPlayerScores.push([{ "IsOut" : p1.IsOut, "PlayerType" : 2, "CurrentScore" : p1.CurrentScore, "Bowl" : p1.Bowl, "Player" : p1.Player, "IsRunOut" : p1.IsRunOut, "TotalFours" : p1.TotalFours, "TotalSixes" : p1.TotalSixes, "Session" : p1.Session, "Target" : p1.Target, "TotalIndividualRuns" : p1.TotalIndividualRuns, "TotalIndividualWickets" : p1.TotalIndividualWickets, "TotalIndividulBallsThrown" : p1.TotalIndividulBallsThrown, "TotalOvers" : p1.TotalOvers, "TotalTeamRuns" : p1.TotalTeamRuns, "TotalTeamWickets" : p1.TotalTeamWickets }]);

                                             GLOBALS.TempPlayerScores.push([{ "IsOut" : p2.IsOut, "PlayerType" : 1, "CurrentScore" : p2.CurrentScore, "Bowl" : p2.Bowl, "Player" : p2.Player, "IsRunOut" : p2.IsRunOut, "TotalFours" :  p2.TotalFours, "TotalSixes" : p2.TotalSixes, "Session" : p2.Session, "Target" : p2.Target, "TotalIndividualRuns" : p2.TotalIndividualRuns, "TotalIndividualWickets" : p2.TotalIndividualWickets, "TotalIndividulBallsThrown" : p2.TotalIndividulBallsThrown, "TotalOvers" : p2.TotalOvers, "TotalTeamRuns" : p2.TotalTeamRuns, "TotalTeamWickets" : p2.TotalTeamWickets }]);

                                            GLOBALS.TempPlayerScores.push(p3);
                                           

                            }
                            else
                            {
                               GLOBALS.TempPlayerScores = responsescore.data.Game.ScoreItems; 
                            }
                           
                           var playerstrickerscore = GLOBALS.TempPlayerScores.filter(t => t.PlayerType == 1).TotalIndividualRuns;
                           var  lblPlayerScoreNonStriker = GLOBALS.TempPlayerScores.filter(t => t.PlayerType == 2).TotalIndividualRuns;
                           console.log("playerstrickerscore",playerstrickerscore);
                           console.log("lblPlayerScoreNonStriker",lblPlayerScoreNonStriker);
                           setPlayerScoreStricker(playerstrickerscore);
                           setPlayerScoreNonStricker(lblPlayerScoreNonStriker);
                           // set  score  for a  player  
                           
                      }
                      if (!responsescore.data.Game.Score.IsTeamAllOut)
                      {
                                       
                                         
                                        
                    }else {
                      // this  is  a TEST for  
                      if (CurrentSession == 2) 
                      {
                        return;
                        
                      }
                      alert(((GLOBALS.matchDetails.Match.TeamA.IsBatting) ? GLOBALS.matchDetails.Match.TeamA.Name + " Team is All Out. Starting 2nd Inning." : GLOBALS.matchDetails.Match.TeamB.Name + " Team is All Out. Starting 2nd Inning."), "CAAT");
                      try {
                        
                        setNoofBollThrow(1);
                        setBollData1ID(null);
                        setBollData2ID(null);
                        setBatData2ID(null);
                        setBatData1ID(null);
                        setCurrentSession(2)
                      
                        GeneralHelper.ActiveMatch.TeamA.IsBatting = !GeneralHelper.ActiveMatch.TeamA.IsBatting;
                        GeneralHelper.ActiveMatch.TeamB.IsBatting = !GeneralHelper.ActiveMatch.TeamB.IsBatting;
                        setBatData1Photo(null);
                        setBatData2Photo(null);
                        setBollData1Photo(null);
                        setBollData2Photo(null);
                       
                        setBatData1Name("Player Name");
                        setBatData2Name("Player Name");
                        setBollData1Name("Player Name");
                        setBollData2Name("Player Name");
                       
                        SetScoreInfomation("00 / 0  (0.0)")
                        setTeamAData(null);
                        setTeamBData(null);
                        try {
                          axios.get(GLOBALS.BASE_URL +'ChangeSession'+'/'+GLOBALS.API_USERID+'/'+GLOBALS.API_KEY+'/'+MatchID)
                          .then(function (changesessionresponse) {
                            
                                    if(JSON.stringify(changesessionresponse.data.ResponseCode) ==0 || JSON.stringify(changesessionresponse.data.ResponseCode) =="0"){
                                      if (changesessionresponse.data.DeviceIDList != null) {
                                        for (let device of changesessionresponse.data.DeviceIDList) {
                                          //console.log(device.DeviceID);
                                            //SendPushNotification(device.DeviceID, "QA");
                                            sendPushNotification(device.DeviceID, "SC");
                                           
                                      }
                                    }
                                      
                                        
                                    } else if(changesessionresponse.data.ResponseCode =='1'){
                                        Alert.alert(
                                          changesessionresponse.data.ResponseMessageEnglish,
                                          changesessionresponse.data.ResponseMessageHindi,
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
                          } catch (e) {
                          console.log('Error')
                          }

                        } catch (e) {
                        console.log('Error')
                        }
                      
                    }
                      
                  } else {
                      Alert.alert(
                          "Internal error occurred.",
                          [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                          ]
                        );    
                  }
                  
                 
              })
              .catch(function (error) {
                  console.log("Printf",error);
              });
                                          } catch (e) {
                                          console.log('Error')
                                          }  
                                    }
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                       
                        } catch (e) {
                        console.log('Error')
                        }
                        
                    } 
                      try {
                       
                        if (AnswerRandomSubmit >= 0 && isRandomAnswered == false)
                            {
                              const myAutomatePlayerAnswerObject = {
                                "APIKey" : '123456',
                                "APIUserID":'NIC',
                                "Game": {
                                   "Match":  GLOBALS.matchDetails.Match 
                                }
                            };
                              const paramsauto = JSON.stringify(myAutomatePlayerAnswerObject);
                              
                              axios.post(GLOBALS.BASE_URL +'AutomatePlayerAnswerSubmission', paramsauto,{
                                  "headers": {
                                  "content-type": "application/json",
                                  },
                                  })
                                .then(function (responseauto) {
                      
                                 // console.log(response.data);
                                 console.log("Automatic",responseauto.data);
                      
                                          if(JSON.stringify(responseauto.data.ResponseCode) == 0 || JSON.stringify(responseauto.data.ResponseCode)=='0'){
                                             
                                          
                                          } else {
                                              Alert.alert(
                                                  "Internal Server Error",
                                                  [
                                                    { text: "OK", onPress: () => console.log("OK Pressed") }
                                                  ]
                                                );    
                                          }
                                        
                                          AnswerRandomSubmit = 0;
                                          isRandomAnswered = true;
                                          timerGetAnswerStatus(); 
                                      })
                                      .catch(function (error) {
                                          console.log(error);
                                      });
                                      
                                             
                            
                          }
                         
                        } catch (e) {
                        console.log('Error')
                        }
                    
                   
                })
                .catch(function (error) {
                    console.log(error);
                });
             
              } catch (e) {
                console.log('Error')
              }
    }
    
    
   
  const getRandomNumberBetween =(min,max) => {
      return Math.floor(Math.random()*(max-min+1)+min);
  }
  const sendPushNotification = async (deviceid,msg) => {

    try {
      const FIREBASE_API_KEY = "AAAAPs3FQRQ:APA91bEwgnBf4qEwapaHu6-Xqt8AUAKzS-GkYJf0b4KiC2ec-mCvIye8DbMMtT0PoZKxp6k1oPrURZayM04lbOBEFYrHoLObqU8QGYHtthHjwjHLfGGSvxP16O1SMmo4oJsbbCrWvG0H"
    const json = "{\"to\": \"" + deviceid + "\",\"data\": {\"message\": \"" + msg + "\",}}";
    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: "key=" + FIREBASE_API_KEY,
    })
      
      let response = await  fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers,
      body: json,
    });
    let jsonresponse = await response.json();
    return jsonresponse;
    
    } catch (error) {
       console.error(error);
    }
    
    SavePushNotificationLog(jsonresponse,deviceid,msg);
  };


  const getCurrentDate=()=>{

      var currentTimeInMilliseconds=Date.now();
      return currentTimeInMilliseconds;
 }
  const SavePushNotificationLog = async (res,device,message) =>{
    var current_date  =  "\/Date("+getCurrentDate()+")\/";
    const myPushNotificationLogObject = {
      "APIKey" : '123456',
      "APIUserID":'NIC',
      "PushNotificationLogItem": {
        "DeviceID" : device,
        "NotificationResponseMessage":res,
        "QueryString":message,
        "Match": { "ID" : GLOBALS.matchDetails.Match.ID },
        "DateTimeStamp": current_date
      }
  };
    const params = JSON.stringify(myPushNotificationLogObject);
    axios.post(GLOBALS.BASE_URL +'SavePushNotificationLog', params,{
      "headers": {
      "content-type": "application/json",
      },
      })
    .then(function (response) {
             if(response.data.ResponseCode == 0 || response.data.ResponseCode=='0'){
                 
                 
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
 const  _renderItem =({item,index})=> {
   let {itemStyle,imageStyle} =styles
   return (
     <View style={styles.itemStyle}>
       <Text >{item.QuestionImage}{index}</Text>
        <Image  source={{ uri: "http://10.132.36.133/Service"+item.QuestionImage,}}   style={styles.img0} />
        <Image  source={{ uri: "http://10.132.36.133/Service"+item.Player.Photo,}}   style={styles.img1} />
     </View>
   )
  }
  
    return (
      <SafeAreaView style={{flex: 1}}>
         {(visible) == true ? (
         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ModalPoup visible={visible}>
                  <View style={{alignItems: 'center'}}>
                    <View style={styles.header}>
                      <TouchableOpacity onPress={() => setVisible(false)}>
                        <Image
                          source={require('./images/x.png')}
                          style={{height: 30, width: 30}}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Image
                      source={require('./images/final_anim.gif')}
                      style={{height: 150, width: 150, marginVertical: 10}}
                    />
                  </View>

                  <Text style={{marginVertical: 30, fontSize: 20, textAlign: 'center'}}>
                    Congratulations registration was successful
                  </Text>
                </ModalPoup>
              
              </View>
         ):(null)}
        <View style={{flex:1}}>
          
         {(ShowHideBar) == 1 ? (
          
          <View style={{backgroundColor: '#fff',
          justifyContent: 'space-around'}}>
            {/* <Text>{QuestionDeliverItems.BowlNo}</Text> */}
             {QuestionDeliverItems.QuestionsForViewer && QuestionDeliverItems.QuestionsForViewer.length? (
            <CarouselQuestion data = {QuestionDeliverItems.QuestionsForViewer}/>
             ):(  null )}
           {/* {QuestionDeliverItems && QuestionDeliverItems.length? (
          <CarouselQuestion data = {QuestionDeliverItems.QuestionsForViewer}/>
          ):(  null )} */}
            {/* <FlatList data={QuestionDeliverItems.QuestionsForViewer}
              keyExtractor={(item,index)=> index.toString()}
              renderItem={_renderItem}
              numColumns={numColumns}>

            </FlatList> */}
            </View>
         ):(ShowHideBar) == 2 ? (
          <View style={{backgroundColor: '#fff',
          justifyContent: 'space-around',flex:1}}>
          {ShowVideoPath}
          </View>
       
         
         ):(
          
          <View style={{flex:1,flexDirection:'row'}} >
         <View style={styles.container}>
         <View style={{flex:1}}> 
       <View style={styles.item}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            
          <Image  source= {{ uri:batteamIcon}}  style={{width:60,height:60,justifyContent:'flex-start',left:0,alignContent:'flex-start',padding:2}} />
          <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,color:Colors.blackcolor,padding:2}} >{batteamname}</Text>
          <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,color:Colors.Marooncolor,padding:2}} >Batting</Text>
       
        </View>
        <TouchableOpacity
    style={{
      paddingHorizontal: 10,
      alignSelf: "center",
      backgroundColor: "#FFF",
      elevation: 1,
      width: '90%',
      borderRadius: 16,
    }}
  >
        <View style={{ flexDirection:'row',justifyContent:'space-between'}}>

        <Image  source={{uri:Bat1PhotoData}}    style={{width:60,height:60,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:10,padding:2}} />
        <View style={{flexDirection:'column'}}>
       
          <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,color:Colors.blue,padding:2}} >  {Bat1NameData}</Text>
        
       
          <Text style={{fontSize:12,fontWeight:'700',marginLeft:10,color:Colors.blue,padding:2}} >Batsman(Striker)</Text>
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => refRBSheetTeamBat1.current.open()}>
          <Text style={styles.loginText}> Select Bats</Text>
        </TouchableHighlight>
          </View>
          
          <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,color:Colors.blue,padding:2}} >{GLOBALS.lblPlayerScoreStriker}</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity
    style={{
      paddingHorizontal: 10,
      alignSelf: "center",
      marginTop: 5,
      backgroundColor: "#FFF",
      elevation: 1,
      width: '90%',
      borderRadius: 16,
    }}
  >
          <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
        <Image  source={{uri:Bat2PhotoData}}    style={{width:60,height:60,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:10,padding:2}} />
        <View style={{flexDirection:'column'}}>
          <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,color:Colors.blue,padding:2}} > {Bat2NameData}</Text>
          <Text style={{fontSize:12,fontWeight:'700',marginLeft:10,color:Colors.blue,padding:2}} >Batsman(Non Striker)</Text>
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => refRBSheetTeamBat2.current.open()}>
          <Text style={styles.loginText}> Select Bats</Text>
        </TouchableHighlight>
          </View>
          <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,color:Colors.blue,padding:2}} >{GLOBALS.lblPlayerScoreNonStriker}</Text>
          </View>
          </TouchableOpacity>
          <RBSheet
        ref={refRBSheetTeamBat1}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
       <SafeAreaView style={{flex:1}}>
        
        <FlatList data={TeamAData}   contentContainerStyle={{padding:2}}
         renderItem={renderItem}
         keyExtractor={(item, index) => item.ID}
        />
        </SafeAreaView>
      </RBSheet>
      <RBSheet
        ref={refRBSheetTeamBat2}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
       <SafeAreaView style={{flex:1}}>
        
        <FlatList data={TeamAData}   contentContainerStyle={{padding:2}}
         renderItem={renderItem1}
         keyExtractor={(item, index) => item.ID}
        />
        </SafeAreaView>
      </RBSheet>
       
        </View>
        </View>
        </View>
        
     
   <View style={styles.containerright}>
   <View style={{flex:1}}> 
       <View style={styles.item}>
       <View style={{flexDirection:'row',justifyContent:'space-between'}}>
         
       <Image  source={{ uri:bowlteamIcon}}  style={{width:60,height:60,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:10,padding:2}} />
       <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,color:Colors.blackcolor,padding:2}} >{bowlteamname}</Text>
       <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,color:Colors.Marooncolor,padding:2}} >Bowling</Text>
    
     </View>
     <TouchableOpacity
    style={{
      paddingHorizontal: 10,
      alignSelf: "center",
      marginTop: 5,
      backgroundColor: "#FFF",
      elevation: 1,
      width: '90%',
      borderRadius: 16,
    }}
  >
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
     <Image  source={{uri:Boll1PhotoData}}    style={{width:60,height:60,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:10,padding:2}} />
     <View style={{flexDirection:'column'}}>
    
     <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,color:Colors.blue,padding:2}} >{Boll1NameData}</Text>
   
       <Text style={{fontSize:12,fontWeight:'700',marginLeft:10,color:Colors.blue,padding:2}} >Bowler</Text>
       <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}  onPress={() => refRBSheetTeamBoll1.current.open()}>
          <Text style={styles.loginText}>  Select Boll</Text>
        </TouchableHighlight>
       </View>
       
       <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,color:Colors.blue,padding:2}} >00</Text>
      
       <RBSheet
        ref={refRBSheetTeamBoll1}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
       <SafeAreaView style={{flex:1}}>
        
        <FlatList data={TeamBData}   contentContainerStyle={{padding:2}}
         renderItem={renderItem2}
         keyExtractor={(item, index) => item.ID}
        />
        </SafeAreaView>
      </RBSheet>
       </View>
       </TouchableOpacity>
       <TouchableOpacity
    style={{
      paddingHorizontal: 10,
      alignSelf: "center",
      marginTop: 10,
      backgroundColor: "#FFF",
      elevation: 1,
      width: '90%',
      borderRadius: 16,
    }}
  >
       <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
     <Image  source={{uri:Boll2PhotoData}}    style={{width:60,height:60,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:10,padding:2}} />
     <View style={{flexDirection:'column'}}>
    
      <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,color:Colors.blue,padding:2}} >{Boll2NameData}</Text>

       <Text style={{fontSize:12,fontWeight:'700',marginLeft:10,color:Colors.blue,padding:2}} >Fielder</Text>
       <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => refRBSheetTeamBoll2.current.open()}>
          <Text style={styles.loginText}>  Select Boll</Text>
        </TouchableHighlight>
     
      

       </View>
       
       <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,color:Colors.blue,padding:2}} >00</Text>
       <RBSheet
        ref={refRBSheetTeamBoll2}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
       <SafeAreaView style={{flex:1}}>
        
        <FlatList data={TeamBData}   contentContainerStyle={{padding:2}}
         renderItem={renderItem3}
         keyExtractor={(item, index) => item.ID}
        />
        </SafeAreaView>
      </RBSheet>
       </View>
</TouchableOpacity>
        </View>
        </View>
</View>
         <View style={{position: 'absolute',
  flex:1,
  left: 0,
  right: 0,
  flexWrap: 'wrap',
    alignItems: 'flex-start',
  bottom: -10,
  flexDirection:'row',
  justifyContent:'space-between',
  height:60,
  alignItems:'center',}}>
     
    <TouchableHighlight  onPress={() => ExitGame()} style={[styles.buttonBottomContainer, styles.loginbootomButton]}  >
          <Text style={styles.loginText}>   End Game</Text>
        </TouchableHighlight>
        
        <TouchableHighlight style={[styles.buttonBottomContainer, styles.loginbootomButton]}  >
          <Text style={styles.loginText}>   Extend Over</Text>
        </TouchableHighlight>
     
        <TouchableHighlight onPress={() => PlayGame()} style={[styles.buttonBottomContainer, styles.loginbootomButton]}  >
          <Text style={styles.loginText}>  BOWL{NoofBoll}</Text>
        </TouchableHighlight> 
            
             </View>  
        </View>

        )}
       </View>
       </SafeAreaView>
    )
    
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  containerright: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end'
  },
    coverImage: {
      width: 50,
      height: 50,
      borderRadius:50,
    
    },
    item: {
      width: '100%' // is 50% of container width
    },
    
    itemStyle : {
alignItems :'center',
justifyContent:'center',
height:150,
flex:1,
height:WIDTH/numColumns,
    },
    img0: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 180,
      height: 180,
    
      
    },
    img1 :{
      position: 'absolute',
      top: 0,
      right: 0,
      width: 40,
      height: 40,
      borderRadius:10,
     
    },
    img2: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: 180,
      height: 180,
     
    },
    img3: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 180,
      height: 180,
    
    },
    editImage: {
      width: 30,
      height: 30,
      position: 'absolute',
      margin: 10,
      right: 0,
      bottom: -20,
    },
    loginText: {
      color: 'black',
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
    buttonContainer: {
      height:25,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:120,
      borderRadius:30,
    },
    buttonBottomContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:0,
      width:130,
      
    },
    loginButton: {
      backgroundColor: "#9CD85C",
     
    },
    loginbootomButton: {
      backgroundColor: "#9CD85C",
      width:'33%'
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
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      
    },
    modalBackGround: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: '80%',
      backgroundColor: 'white',
      paddingHorizontal: 20,
      paddingVertical: 30,
      borderRadius: 20,
      elevation: 20,
    },
    header: {
      width: '100%',
      height: 40,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
  
  });
export default GameWindow;