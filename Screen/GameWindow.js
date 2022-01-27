import React, { useEffect,useRef,useState } from 'react';
import {Button,StyleSheet,View, FlatList,Dimensions,TouchableOpacity,Image,Text,TextInput,ScrollView,TouchableHighlight,ImageBackground,SafeAreaView,Alert } from 'react-native';
import GLOBALS from './helper/global'; 
import { Card } from 'react-native-paper';
import Colors from './helper/colors';
import axios from 'axios';
import { Directions } from 'react-native-gesture-handler';
import RBSheet from "react-native-raw-bottom-sheet";
import RNRestart from 'react-native-restart'; 
import Video from 'react-native-video';
var batteamname,bowlteamname;
var batteamIcon,bowlteamIcon;
var videopath =null;
import notification from './helper/notifications';
var topBarP1Name,topBarP2Name,topBarPB1,topBarPB2,lblCurrentOver,TotalDevicesBeingUsedForGame;
var MatchID;
const numColumns =2;
const  WIDTH = Dimensions.get('window').width;
var AnswerRandomSubmit = 0;
var isRandomAnswered  = false;
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
  const [Bat2IDData, setBatData2ID] = useState(null);
  const [Bat2NameData, setBatData2Name] = useState('Batsman2');
  const [Bat2PhotoData, setBatData2Photo] = useState();
  const [Boll1IDData, setBollData1ID] = useState(null);
  const [Boll1NameData, setBollData1Name] = useState('Bowler');
  const [Boll1PhotoData, setBollData1Photo] = useState();
  const [Boll2IDData, setBollData2ID] = useState(null);
  const [Boll2NameData, setBollData2Name] = useState('Fielder');
  const [Boll2PhotoData, setBollData2Photo] = useState();
  const [NoofBoll, setNoofBollThrow] = useState(0);
  const [QuestionDeliverItems, setQuestionDeliverItems] = useState([]);
  const [ShowHideBar,SetShowHideTopBar] =  useState(0);
  const [ShowVideoPath,setvideovideopath] =  useState();

 
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
          MatchID =  GLOBALS.matchDetails.Match.ID;
        }else if (TossDesion==1){
          GetTeamAData(GLOBALS.matchDetails.Match.ID,GLOBALS.matchDetails.Match.TeamA.ID);
          GetTeamBData(GLOBALS.matchDetails.Match.ID,GLOBALS.matchDetails.Match.TeamB.ID);
          batteamname = GLOBALS.matchDetails.Match.TeamA.Name;
          bowlteamname= GLOBALS.matchDetails.Match.TeamB.Name;
          batteamIcon = GLOBALS.matchDetails.Match.TeamA.Logo;
          bowlteamIcon= GLOBALS.matchDetails.Match.TeamB.Logo;
          GLOBALS.TeamAIsBatting= true;
          MatchID =  GLOBALS.matchDetails.Match.ID;
         
        }
      }
          }, []); 
    
    const getBattingPlayer1Details=(playerid,name,photo) => {
      
      try {
        var team = (GLOBALS.TeamAIsBatting) ? GLOBALS.matchDetails.Match.TeamA : GLOBALS.matchDetails.Match.TeamB ;
        var isTeamA = (GLOBALS.TeamAIsBatting) ? true : false;
        const params = JSON.stringify({"Game":{"CurrentBowlBeingThrown":0,"CurrentSession":0,"Decision":0,"DoesGameCompleted":false,"DoesUmpireJoined":false,"GameCompletedOn":null,"GameDate":null,"GameWonBy":null,"ID":0,
        "Match":{"CreatedBy":null,"CreatedOn":null,"Description":null,"ID":GLOBALS.matchDetails.Match.ID,"IsVisible":false,"LastUpdated":null,"MatchDate":null,"MatchWonFinalRemark":null,"NumberOfOvers":0,"NumberOfPlayers":0,"SelectedQuestionSet":null,"Sponsor":null,"TeamA":null,"TeamACreationType":0,"TeamB":null,"TeamBCreationType":0,"Title":null,"Umpire":null,"UmpireUniqueCode":null,"Venue":null},
        "Score":null,"ScoreItems":null,"SelectedBowler":null,"SelectedFielder":null,"SelectedNonStrikerBatsman":null,
        "SelectedStrikerBatsman":{"CreatedBy":null,"CreatedOn":null,"DOB":null,"Device":null,"ExperienceAsUmpire":0,"Father":"test1","Gender":0,"ID":playerid,"IsMappedWithMatch":false,"IsRegisteredForUmpire":false,"IsVisible":false,"Mobile":null,"Name":name,"PersonalScore":null,"Photo":photo,"PlayerCategory":0,
        "StudyingClass":team.Players.StudyingClass,
        "Team":null,"UnEncryptedPassword":null},"TossCalledBy":null,"TossDate":null,"TossRemark":null,"TossWonBy":null},
        "Games":null,"APIKey":"123456","APIUserID":"NIC","IPAddress":null}
        );
        
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
    const getBattingPlayer2Details= (playerid,name,photo) =>{
      try {
        var team = (GLOBALS.TeamAIsBatting) ? GLOBALS.matchDetails.Match.TeamA : GLOBALS.matchDetails.Match.TeamB ;
        var isTeamA = (GLOBALS.TeamAIsBatting) ? true : false;
        const params = JSON.stringify({"Game":{"CurrentBowlBeingThrown":0,"CurrentSession":0,"Decision":0,"DoesGameCompleted":false,"DoesUmpireJoined":false,"GameCompletedOn":null,"GameDate":null,"GameWonBy":null,"ID":0,
        "Match":{"CreatedBy":null,"CreatedOn":null,"Description":null,"ID":GLOBALS.matchDetails.Match.ID,"IsVisible":false,"LastUpdated":null,"MatchDate":null,"MatchWonFinalRemark":null,"NumberOfOvers":0,"NumberOfPlayers":0,"SelectedQuestionSet":null,"Sponsor":null,"TeamA":null,"TeamACreationType":0,"TeamB":null,"TeamBCreationType":0,"Title":null,"Umpire":null,"UmpireUniqueCode":null,"Venue":null},
        "Score":null,"ScoreItems":null,"SelectedBowler":null,"SelectedFielder":null,
        "SelectedNonStrikerBatsman":{"CreatedBy":null,"CreatedOn":null,"DOB":null,"Device":null,"ExperienceAsUmpire":0,"Father":"test5","Gender":0,"ID":playerid,"IsMappedWithMatch":false,"IsRegisteredForUmpire":false,"IsVisible":false,"Mobile":null,"Name":name,"PersonalScore":null,"Photo":photo,"PlayerCategory":0,
        "StudyingClass":team.Players.StudyingClass,"Team":null,"UnEncryptedPassword":null},
        "SelectedStrikerBatsman":null,"TossCalledBy":null,"TossDate":null,"TossRemark":null,"TossWonBy":null},
        "Games":null,"APIKey":"123456","APIUserID":"NIC","IPAddress":null}
        );
        
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
    const getBollPlayer1Details =(playerid,name,photo) =>{
      try {
        var team = (GLOBALS.TeamAIsBatting) ? GLOBALS.matchDetails.Match.TeamA : GLOBALS.matchDetails.Match.TeamB ;
        var isTeamA = (GLOBALS.TeamAIsBatting) ? true : false;
        const params = JSON.stringify({"Game":{"CurrentBowlBeingThrown":0,"CurrentSession":0,"Decision":0,"DoesGameCompleted":false,"DoesUmpireJoined":false,"GameCompletedOn":null,"GameDate":null,"GameWonBy":null,"ID":0,
        "Match":{"CreatedBy":null,"CreatedOn":null,"Description":null,"ID":GLOBALS.matchDetails.Match.ID,"IsVisible":false,"LastUpdated":null,"MatchDate":null,"MatchWonFinalRemark":null,"NumberOfOvers":0,"NumberOfPlayers":0,"SelectedQuestionSet":null,"Sponsor":null,"TeamA":null,"TeamACreationType":0,"TeamB":null,"TeamBCreationType":0,"Title":null,"Umpire":null,"UmpireUniqueCode":null,"Venue":null},
        "Score":null,"ScoreItems":null,
        "SelectedBowler":{"CreatedBy":null,"CreatedOn":null,"DOB":null,"Device":null,"ExperienceAsUmpire":0,"Father":"test2","Gender":0,"ID":playerid,"IsMappedWithMatch":false,"IsRegisteredForUmpire":false,"IsVisible":false,"Mobile":null,"Name":name,"PersonalScore":null,"Photo":photo,"PlayerCategory":0,
        "StudyingClass":team.Players.StudyingClass,"Team":null,"UnEncryptedPassword":null},"SelectedFielder":null,"SelectedNonStrikerBatsman":null,"SelectedStrikerBatsman":null,"TossCalledBy":null,"TossDate":null,"TossRemark":null,"TossWonBy":null},"Games":null,"APIKey":"123456","APIUserID":"NIC","IPAddress":null}
        );
        
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
    const getBollPlayer2Details =(playerid,name,photo) =>
    {
      try {
        var team = (GLOBALS.TeamAIsBatting) ? GLOBALS.matchDetails.Match.TeamA : GLOBALS.matchDetails.Match.TeamB ;
        var isTeamA = (GLOBALS.TeamAIsBatting) ? true : false;
        const params = JSON.stringify({"Game":{"CurrentBowlBeingThrown":0,"CurrentSession":0,"Decision":0,"DoesGameCompleted":false,"DoesUmpireJoined":false,"GameCompletedOn":null,"GameDate":null,"GameWonBy":null,"ID":0,
        "Match":{"CreatedBy":null,"CreatedOn":null,"Description":null,"ID":GLOBALS.matchDetails.Match.ID,"IsVisible":false,"LastUpdated":null,"MatchDate":null,"MatchWonFinalRemark":null,"NumberOfOvers":0,"NumberOfPlayers":0,"SelectedQuestionSet":null,"Sponsor":null,"TeamA":null,"TeamACreationType":0,"TeamB":null,"TeamBCreationType":0,"Title":null,"Umpire":null,"UmpireUniqueCode":null,"Venue":null},
        "Score":null,"ScoreItems":null,"SelectedBowler":null,
        "SelectedFielder":{"CreatedBy":null,"CreatedOn":null,"DOB":null,"Device":null,"ExperienceAsUmpire":0,"Father":"test6","Gender":0,"ID":playerid,"IsMappedWithMatch":false,"IsRegisteredForUmpire":false,"IsVisible":false,"Mobile":null,"Name":name,"PersonalScore":null,"Photo":photo,"PlayerCategory":0,
        "StudyingClass":team.Players.StudyingClass,"Team":null,"UnEncryptedPassword":null},"SelectedNonStrikerBatsman":null,"SelectedStrikerBatsman":null,"TossCalledBy":null,"TossDate":null,"TossRemark":null,"TossWonBy":null},"Games":null,"APIKey":"123456","APIUserID":"NIC","IPAddress":null}
        );
        
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
      onPress={()=> getBattingPlayer1Details(item.ID,item.Name,item.Photo)} 
      style={{
        paddingHorizontal: 5,
        alignSelf: "center",
        marginTop:10,
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
      onPress={()=> getBattingPlayer2Details(item.ID,item.Name,item.Photo)} 
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
      onPress={()=> getBollPlayer1Details(item.ID,item.Name,item.Photo)} 
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
      onPress={()=> getBollPlayer2Details(item.ID,item.Name,item.Photo)} 
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
            

            lblCurrentOver = ((GLOBALS.CurrentBowlBeingThrown) / 6) + "." + ((GLOBALS.CurrentBowlBeingThrown) % 6) + " Thrown";
            // if (GeneralHelper.TempPlayerScores != null && GeneralHelper.TempPlayerScores.Count > 0)
            //         {
            //             lblTotalFoursSixesTopBar.Text = GeneralHelper.TempPlayerScores.Where(t => t.PlayerType == ApplicationEnumeratorsPlayerType.Batsman1).FirstOrDefault().TotalFours + "  /  " + GeneralHelper.TempPlayerScores.Where(t => t.PlayerType == ApplicationEnumeratorsPlayerType.Batsman1).FirstOrDefault().TotalSixes;
            //             lblRunsScoredTopBar.Text = GeneralHelper.TempPlayerScores.Where(t => t.PlayerType == ApplicationEnumeratorsPlayerType.Batsman1).FirstOrDefault().TotalIndividualRuns.ToString("d2");

            //             lblTarget.Text = GeneralHelper.TempPlayerScores.Where(t => t.PlayerType == ApplicationEnumeratorsPlayerType.Batsman1).FirstOrDefault().Target;

            //             int totalBallsThrown = GeneralHelper.TempPlayerScores.Where(t => t.PlayerType == ApplicationEnumeratorsPlayerType.Bowler).FirstOrDefault().TotalIndividulBallsThrown;

            //             lblTotalBallsDeliveredTopBar.Text = (totalBallsThrown / 6) + "." + (totalBallsThrown % 6);
            //             lblWicketsTakenTopBar.Text = GeneralHelper.TempPlayerScores.Where(t => t.PlayerType == ApplicationEnumeratorsPlayerType.Bowler).FirstOrDefault().TotalIndividualWickets.ToString();
            //         }
            
            //var obj = new CricketServiceReference.CoreServiceAPIClient();

            if (GLOBALS.QuestionsDeliveredForLevelGroup == null)
            {
              GLOBALS.QuestionsDeliveredForLevelGroup= [];
            }
            
            var randomGroup = 1;

            //short retryCount = 0;
             
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
            const params = JSON.stringify({"Matches":null,"Match":{"ID":GLOBALS.matchDetails.Match.ID,"Title":null,"Description":null,"MatchDate":null,"Venue":null,"Sponsor":null,"NumberOfOvers":0,"NumberOfPlayers":0,"TeamA":null,"TeamACreationType":0,"TeamB":null,"TeamBCreationType":0,"SelectedQuestionSet":{"ID":0,"SetName":null,"Description":null,"CreatedOn":null,"IsVisible":false,"QuestionSetCategory":0,"Questions":null,"MinLevelGroupID":1,"MaxLevelGroupID":0},"Umpire":null,"UmpireUniqueCode":null,"CreatedOn":null,"LastUpdated":null,"IsVisible":false,"MatchWonFinalRemark":null,"CreatedBy":null},"TotalDevicesBeingUsedForGame":TotalDevicesBeingUsedForGame,"APIUserID":"NIC","APIKey":"123456","IPAddress":null});
        //  const params = JSON.stringify({"Matches":null,"Match":{"ID":GLOBALS.matchDetails.Match.ID,"Title":null,"Description":null,"MatchDate":null,"Venue":null,"Sponsor":null,"NumberOfOvers":0,"NumberOfPlayers":0,"TeamA":null,
        //       "TeamACreationType":0,"TeamB":null,"TeamBCreationType":0,"SelectedQuestionSet":{"ID":0,"SetName":null,"Description":null,"CreatedOn":null,"IsVisible":false,"QuestionSetCategory":0,
        //       "Questions":null,"MinLevelGroupID":randomGroup,"MaxLevelGroupID":0},"Umpire":null,
        //       "UmpireUniqueCode":null,"CreatedOn":null,"LastUpdated":null,"IsVisible":false,"MatchWonFinalRemark":null,"CreatedBy":null},"TotalDevicesBeingUsedForGame":TotalDevicesBeingUsedForGame,
        //       "APIUserID":"NIC","APIKey":"123456","IPAddress":null});
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
                            sendPushNotification(device.DeviceID, "QA");
                            setTimeout(() => {
                            
                          }, 100);
                        
                      } 
                       
                      }
                      GLOBALS.CurrentBowlBeingThrown = response.data.QuestionDeliveryItem.BowlNo;
                      setNoofBollThrow(++response.data.QuestionDeliveryItem.BowlNo);
                      setTimeout(() => {
                        timerGetAnswerStatus();   
                      }, 25000);
                      setTimeout(() => {
                        GetQuestionForViewer();
                      }, 10);
                      
                     

                      //  if (! GLOBALS.QuestionsDeliveredForLevelGroup.Contains(randomGroup))
                      //  {
                      //    GLOBALS.QuestionsDeliveredForLevelGroup.Add(randomGroup);
                      //  }
                        
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
    const GetQuestionForViewer = async ()=>{
      
      

      axios.get(GLOBALS.BASE_URL +'WhatIsTheQuestionForViewer'+'/'+GLOBALS.API_USERID+'/'+GLOBALS.API_KEY+'/'+MatchID)
      .then(function (response) {
        
                if(JSON.stringify(response.data.ResponseCode) ==0 || JSON.stringify(response.data.ResponseCode) =="0"){

                  if (JSON.stringify(response.data.QuestionDeliveryItem) != null && JSON.stringify(response.data.QuestionDeliveryItem).length>0) {
                    
                    SetShowHideTopBar(1);
                    //console.log("Check Data for app "+response.data.QuestionDeliveryItem);
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

      axios.get(GLOBALS.BASE_URL +'GetAnswerStatus'+'/'+GLOBALS.API_USERID+'/'+GLOBALS.API_KEY+'/'+MatchID)
          .then(function (response) {
           // console.log("Check"+response.data.ResponseCode);
                    if(response.data.ResponseCode =='0'){
                      console.log("NOt Automatic");
                      try {

                        SetShowHideTopBar(0);
                        UpdateScore();
                       
                        } catch (e) {
                        console.log('Error')
                        }
                        
                    } 
                    try {
                      if (AnswerRandomSubmit >= 0 && isRandomAnswered == false)
                          {
                            const params = JSON.stringify({"Game":{"ID":0,"Match":{"ID":20151,"Title":"CSSDA New Match","Description":"","MatchDate":"12-01-2022","Venue":"Indravati Bhawan","Sponsor":"CSSDA","NumberOfOvers":1,"NumberOfPlayers":4,"TeamA":{"ID":57,"Name":"A Team","NickName":null,"Coach":null,"AboutTeam":null,"Logo":"/Contents/Teams/Photos/no-image.png","Class":null,"Topic":null,"CreatedOn":null,"IsVisible":false,"PreferredLanguage":0,"Players":[{"ID":106,"Name":"test1","Father":"test1","Photo":"/Contents/Players/Photos/no-image.png","Mobile":"","DOB":"16-06-1986","Gender":1,
                            "StudyingClass":{"ID":0,"ClassName":"Class 2","ClassIdentifier":2,"Language":0},"PlayerCategory":1,"CreatedOn":"10-01-2022","CreatedBy":{"ID":2,"Name":null,"Mobile":null,"UnEncryptedPassword":null,"IsActive":false,"CreatedOn":null,"LastUpdated":null,"LastLogin":null,"Role":0},"Team":{"ID":57,"Name":"A Team","NickName":null,"Coach":null,"AboutTeam":null,"Logo":"/Contents/Teams/Photos/no-image.png","Class":null,"Topic":null,"CreatedOn":null,"IsVisible":false,"PreferredLanguage":0,"Players":null,"IsBatting":false,"CreatedBy":null},
                            "IsRegisteredForUmpire":false,"ExperienceAsUmpire":0,"IsVisible":true,"Device":{"ID":0,"UserID":"","UserName":null,"AndroidID":null,"ClientToken":null,"ModelName":null,"OSName":null,"OSVersion":null,"CreatedOn":null,"LastUpdated":null,"IsAlreadyRegistered":false},"PersonalScore":null,"IsMappedWithMatch":false,"UnEncryptedPassword":null},{"ID":108,"Name":"test3","Father":"test3","Photo":"/Contents/Players/Photos/no-image.png","Mobile":"","DOB":"16-06-1987","Gender":1,"StudyingClass":{"ID":0,"ClassName":"Class 2","ClassIdentifier":2,"Language":0},
                            "PlayerCategory":1,"CreatedOn":"10-01-2022","CreatedBy":{"ID":2,"Name":null,"Mobile":null,"UnEncryptedPassword":null,"IsActive":false,"CreatedOn":null,"LastUpdated":null,"LastLogin":null,"Role":0},"Team":{"ID":57,"Name":"A Team","NickName":null,"Coach":null,"AboutTeam":null,"Logo":"/Contents/Teams/Photos/no-image.png","Class":null,"Topic":null,"CreatedOn":null,"IsVisible":false,"PreferredLanguage":0,"Players":null,"IsBatting":false,"CreatedBy":null},"IsRegisteredForUmpire":false,"ExperienceAsUmpire":0,"IsVisible":true,"Device":{"ID":0,"UserID":"","UserName":null,"AndroidID":null,"ClientToken":null,"ModelName":null,"OSName":null,"OSVersion":null,"CreatedOn":null,"LastUpdated":null,"IsAlreadyRegistered":false},"PersonalScore":null,"IsMappedWithMatch":false,"UnEncryptedPassword":null},{"ID":110,"Name":"test5","Father":"test5","Photo":"/Contents/Players/Photos/no-image.png","Mobile":"","DOB":"16-06-1992","Gender":2,
                            "StudyingClass":{"ID":0,"ClassName":"Class 2","ClassIdentifier":2,"Language":0},"PlayerCategory":1,"CreatedOn":"10-01-2022","CreatedBy":{"ID":2,"Name":null,"Mobile":null,"UnEncryptedPassword":null,"IsActive":false,"CreatedOn":null,"LastUpdated":null,"LastLogin":null,"Role":0},"Team":{"ID":57,"Name":"A Team","NickName":null,"Coach":null,"AboutTeam":null,"Logo":"/Contents/Teams/Photos/no-image.png","Class":null,"Topic":null,"CreatedOn":null,"IsVisible":false,"PreferredLanguage":0,"Players":null,"IsBatting":false,"CreatedBy":null},"IsRegisteredForUmpire":false,"ExperienceAsUmpire":0,"IsVisible":true,
                            "Device":{"ID":0,"UserID":"","UserName":null,"AndroidID":null,"ClientToken":null,"ModelName":null,"OSName":null,"OSVersion":null,"CreatedOn":null,"LastUpdated":null,"IsAlreadyRegistered":false},"PersonalScore":null,"IsMappedWithMatch":false,"UnEncryptedPassword":null},{"ID":112,"Name":"test7","Father":"test7","Photo":"/Contents/Players/Photos/no-image.png","Mobile":"","DOB":"12-01-1992","Gender":1,"StudyingClass":{"ID":0,"ClassName":"Class 2","ClassIdentifier":2,"Language":0},"PlayerCategory":1,"CreatedOn":"10-01-2022","CreatedBy":{"ID":2,"Name":null,"Mobile":null,"UnEncryptedPassword":null,"IsActive":false,"CreatedOn":null,"LastUpdated":null,"LastLogin":null,"Role":0},
                            "Team":{"ID":57,"Name":"A Team","NickName":null,"Coach":null,"AboutTeam":null,"Logo":"/Contents/Teams/Photos/no-image.png","Class":null,"Topic":null,"CreatedOn":null,"IsVisible":false,"PreferredLanguage":0,"Players":null,"IsBatting":false,"CreatedBy":null},"IsRegisteredForUmpire":false,"ExperienceAsUmpire":0,"IsVisible":true,"Device":{"ID":0,"UserID":"","UserName":null,"AndroidID":null,"ClientToken":null,"ModelName":null,"OSName":null,"OSVersion":null,"CreatedOn":null,"LastUpdated":null,"IsAlreadyRegistered":false},"PersonalScore":null,"IsMappedWithMatch":false,"UnEncryptedPassword":null}],"IsBatting":true,"CreatedBy":null},"TeamACreationType":0,"TeamB":{"ID":58,"Name":"B Team","NickName":null,"Coach":null,"AboutTeam":null,"Logo":"/Contents/Teams/Photos/no-image.png","Class":null,"Topic":null,"CreatedOn":null,"IsVisible":false,"PreferredLanguage":0,"Players":[{"ID":107,"Name":"test2","Father":"test2","Photo":"/Contents/Players/Photos/no-image.png","Mobile":"","DOB":"16-06-1987","Gender":1,"StudyingClass":{"ID":0,"ClassName":"Class 2","ClassIdentifier":2,"Language":0},
                            "PlayerCategory":1,"CreatedOn":"10-01-2022","CreatedBy":{"ID":2,"Name":null,"Mobile":null,"UnEncryptedPassword":null,"IsActive":false,"CreatedOn":null,"LastUpdated":null,"LastLogin":null,"Role":0},"Team":{"ID":58,"Name":"B Team","NickName":null,"Coach":null,"AboutTeam":null,"Logo":"/Contents/Teams/Photos/no-image.png","Class":null,"Topic":null,"CreatedOn":null,"IsVisible":false,"PreferredLanguage":0,"Players":null,"IsBatting":false,"CreatedBy":null},"IsRegisteredForUmpire":false,"ExperienceAsUmpire":0,"IsVisible":true,"Device":{"ID":0,"UserID":"","UserName":null,"AndroidID":null,"ClientToken":null,"ModelName":null,"OSName":null,"OSVersion":null,"CreatedOn":null,"LastUpdated":null,"IsAlreadyRegistered":false},
                            "PersonalScore":null,"IsMappedWithMatch":false,"UnEncryptedPassword":null},{"ID":109,"Name":"test4","Father":"test4","Photo":"/Contents/Players/Photos/no-image.png","Mobile":"","DOB":"16-06-1992","Gender":1,"StudyingClass":{"ID":0,"ClassName":"Class 2","ClassIdentifier":2,"Language":0},"PlayerCategory":1,"CreatedOn":"10-01-2022","CreatedBy":{"ID":2,"Name":null,"Mobile":null,"UnEncryptedPassword":null,"IsActive":false,"CreatedOn":null,"LastUpdated":null,"LastLogin":null,"Role":0},"Team":{"ID":58,"Name":"B Team","NickName":null,"Coach":null,"AboutTeam":null,"Logo":"/Contents/Teams/Photos/no-image.png","Class":null,"Topic":null,"CreatedOn":null,"IsVisible":false,"PreferredLanguage":0,"Players":null,"IsBatting":false,"CreatedBy":null},"IsRegisteredForUmpire":false,"ExperienceAsUmpire":0,"IsVisible":true,"Device":{"ID":0,"UserID":"","UserName":null,"AndroidID":null,"ClientToken":null,"ModelName":null,"OSName":null,"OSVersion":null,"CreatedOn":null,"LastUpdated":null,"IsAlreadyRegistered":false},"PersonalScore":null,"IsMappedWithMatch":false,"UnEncryptedPassword":null},{"ID":111,"Name":"test6","Father":"test6","Photo":"/Contents/Players/Photos/no-image.png","Mobile":"","DOB":"16-06-1994","Gender":1,
                            "StudyingClass":{"ID":0,"ClassName":"Class 2","ClassIdentifier":2,"Language":0},"PlayerCategory":1,"CreatedOn":"10-01-2022","CreatedBy":{"ID":2,"Name":null,"Mobile":null,"UnEncryptedPassword":null,"IsActive":false,"CreatedOn":null,"LastUpdated":null,"LastLogin":null,"Role":0},"Team":{"ID":58,"Name":"B Team","NickName":null,"Coach":null,"AboutTeam":null,"Logo":"/Contents/Teams/Photos/no-image.png","Class":null,"Topic":null,"CreatedOn":null,"IsVisible":false,"PreferredLanguage":0,"Players":null,"IsBatting":false,"CreatedBy":null},"IsRegisteredForUmpire":false,"ExperienceAsUmpire":0,"IsVisible":true,"Device":{"ID":0,"UserID":"","UserName":null,"AndroidID":null,"ClientToken":null,"ModelName":null,"OSName":null,"OSVersion":null,"CreatedOn":null,"LastUpdated":null,"IsAlreadyRegistered":false},"PersonalScore":null,"IsMappedWithMatch":false,"UnEncryptedPassword":null},{"ID":113,"Name":"test8","Father":"test8","Photo":"/Contents/Players/Photos/no-image.png","Mobile":"","DOB":"12-01-1996","Gender":2,"StudyingClass":{"ID":0,"ClassName":"Class 2","ClassIdentifier":2,"Language":0},"PlayerCategory":1,"CreatedOn":"10-01-2022","CreatedBy":{"ID":2,"Name":null,"Mobile":null,"UnEncryptedPassword":null,"IsActive":false,"CreatedOn":null,"LastUpdated":null,"LastLogin":null,"Role":0},
                            "Team":{"ID":58,"Name":"B Team","NickName":null,"Coach":null,"AboutTeam":null,"Logo":"/Contents/Teams/Photos/no-image.png","Class":null,"Topic":null,"CreatedOn":null,"IsVisible":false,"PreferredLanguage":0,"Players":null,"IsBatting":false,"CreatedBy":null},"IsRegisteredForUmpire":false,"ExperienceAsUmpire":0,"IsVisible":true,"Device":{"ID":0,"UserID":"","UserName":null,"AndroidID":null,"ClientToken":null,"ModelName":null,"OSName":null,"OSVersion":null,"CreatedOn":null,"LastUpdated":null,"IsAlreadyRegistered":false},"PersonalScore":null,"IsMappedWithMatch":false,"UnEncryptedPassword":null},{"ID":115,"Name":"rtest10","Father":"test10","Photo":"/Contents/Players/Photos/no-image.png","Mobile":"","DOB":"12-01-1996","Gender":2,"StudyingClass":{"ID":0,"ClassName":"Class 2","ClassIdentifier":2,"Language":0},"PlayerCategory":1,"CreatedOn":"10-01-2022","CreatedBy":{"ID":2,"Name":null,"Mobile":null,"UnEncryptedPassword":null,"IsActive":false,"CreatedOn":null,"LastUpdated":null,"LastLogin":null,"Role":0},"Team":{"ID":58,"Name":"B Team","NickName":null,"Coach":null,"AboutTeam":null,"Logo":"/Contents/Teams/Photos/no-image.png","Class":null,"Topic":null,"CreatedOn":null,"IsVisible":false,"PreferredLanguage":0,"Players":null,"IsBatting":false,"CreatedBy":null},"IsRegisteredForUmpire":false,"ExperienceAsUmpire":0,"IsVisible":true,
                            "Device":{"ID":0,"UserID":"","UserName":null,"AndroidID":null,"ClientToken":null,"ModelName":null,"OSName":null,"OSVersion":null,"CreatedOn":null,"LastUpdated":null,"IsAlreadyRegistered":false},"PersonalScore":null,"IsMappedWithMatch":false,"UnEncryptedPassword":null}],"IsBatting":false,"CreatedBy":null},"TeamBCreationType":0,"SelectedQuestionSet":{"ID":2,"SetName":"Computer Science","Description":"Computer Science","CreatedOn":"07-03-2019","IsVisible":true,"QuestionSetCategory":2,"Questions":null,"MinLevelGroupID":1,"MaxLevelGroupID":1},"Umpire":{"ID":102,"Name":"Kishor","Father":null,"Photo":null,"Mobile":null,"DOB":null,"Gender":0,"StudyingClass":null,"PlayerCategory":0,"CreatedOn":"","CreatedBy":null,"Team":null,"IsRegisteredForUmpire":false,"ExperienceAsUmpire":0,"IsVisible":false,"Device":null,"PersonalScore":null,"IsMappedWithMatch":false,"UnEncryptedPassword":null},"UmpireUniqueCode":"7240","CreatedOn":"12-01-2022","LastUpdated":"","IsVisible":true,"MatchWonFinalRemark":"","CreatedBy":{"ID":2,"Name":null,"Mobile":null,"UnEncryptedPassword":null,"IsActive":false,"CreatedOn":null,"LastUpdated":null,"LastLogin":null,"Role":0}},
                            "GameDate":null,"DoesUmpireJoined":false,"TossCalledBy":null,"TossWonBy":null,"TossRemark":null,"TossDate":null,"Decision":0,"DoesGameCompleted":false,"GameCompletedOn":null,"SelectedStrikerBatsman":null,"SelectedNonStrikerBatsman":null,"SelectedBowler":null,"SelectedFielder":null,"CurrentBowlBeingThrown":0,"CurrentSession":0,"Score":null,"ScoreItems":null,"GameWonBy":null},
                            "Games":null,"APIUserID":"NIC","APIKey":"123456","IPAddress":null});
                            
                            axios.post(GLOBALS.BASE_URL +'AutomatePlayerAnswerSubmission', params,{
                                "headers": {
                                "content-type": "application/json",
                                },
                                })
                              .then(function (response) {
                    
                               // console.log(response.data);
                               console.log("Automatic",response.data);
                    
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
                                    
                                    AnswerRandomSubmit = 0;
                                    isRandomAnswered = true;
                                    timerGetAnswerStatus();         
                             
                             
                              
                        }
                       
                      } catch (e) {
                      console.log('Error')
                      }
                   
                })
                .catch(function (error) {
                    console.log(error);
                });
             
              
    }
    const UpdateScore = async () =>
    {
      
      console.log("Update Score");
        const params = JSON.stringify({"Game":{"ID":0,"Match":{"ID":20151,"Title":null,"Description":null,"MatchDate":null,"Venue":null,"Sponsor":null,"NumberOfOvers":0,"NumberOfPlayers":0,"TeamA":null,"TeamACreationType":0,"TeamB":null,"TeamBCreationType":0,"SelectedQuestionSet":null,"Umpire":null,
        "UmpireUniqueCode":null,"CreatedOn":null,"LastUpdated":null,"IsVisible":false,"MatchWonFinalRemark":null,"CreatedBy":null},"GameDate":null,"DoesUmpireJoined":false,"TossCalledBy":null,"TossWonBy":null,"TossRemark":null,"TossDate":null,"Decision":0,"DoesGameCompleted":false,"GameCompletedOn":null,"SelectedStrikerBatsman":{"ID":108,"Name":"test3","Father":"test3","Photo":"/Contents/Players/Photos/no-image.png","Mobile":null,"DOB":null,"Gender":0,"StudyingClass":{"ID":0,"ClassName":"Class 2","ClassIdentifier":0,"Language":0},"PlayerCategory":0,"CreatedOn":null,"CreatedBy":null,"Team":null,"IsRegisteredForUmpire":false,"ExperienceAsUmpire":0,"IsVisible":false,"Device":null,"PersonalScore":null,"IsMappedWithMatch":false,"UnEncryptedPassword":null},"SelectedNonStrikerBatsman":{"ID":106,"Name":"test1","Father":"test1","Photo":"/Contents/Players/Photos/no-image.png","Mobile":null,"DOB":null,"Gender":0,"StudyingClass":{"ID":0,"ClassName":"Class 2","ClassIdentifier":0,"Language":0},"PlayerCategory":0,"CreatedOn":null,"CreatedBy":null,"Team":null,"IsRegisteredForUmpire":false,"ExperienceAsUmpire":0,"IsVisible":false,"Device":null,"PersonalScore":null,"IsMappedWithMatch":false,"UnEncryptedPassword":null},"SelectedBowler":{"ID":109,"Name":"test4","Father":"test4","Photo":"/Contents/Players/Photos/no-image.png","Mobile":null,"DOB":null,"Gender":0,"StudyingClass":{"ID":0,"ClassName":"Class 2","ClassIdentifier":0,"Language":0},"PlayerCategory":0,"CreatedOn":null,"CreatedBy":null,"Team":null,"IsRegisteredForUmpire":false,"ExperienceAsUmpire":0,"IsVisible":false,"Device":null,"PersonalScore":null,"IsMappedWithMatch":false,"UnEncryptedPassword":null},"SelectedFielder":{"ID":111,"Name":"test6","Father":"test6","Photo":"/Contents/Players/Photos/no-image.png","Mobile":null,"DOB":null,"Gender":0,"StudyingClass":{"ID":0,"ClassName":"Class 2","ClassIdentifier":0,"Language":0},"PlayerCategory":0,"CreatedOn":null,"CreatedBy":null,"Team":null,"IsRegisteredForUmpire":false,"ExperienceAsUmpire":0,"IsVisible":false,"Device":null,"PersonalScore":null,"IsMappedWithMatch":false,"UnEncryptedPassword":null},"CurrentBowlBeingThrown":1,"CurrentSession":1,"Score":null,"ScoreItems":null,"GameWonBy":null},"Games":null,"APIUserID":"NIC","APIKey":"123456","IPAddress":null}
);
        
        axios.post(GLOBALS.BASE_URL +'UpdateScore', params,{
            "headers": {
            "content-type": "application/json",
            },
            })
          .then(function (response) {

            console.log("Update Score Result",JSON.stringify(response.data.ResponseCode));

                    if(JSON.stringify(response.data.ResponseCode) == 0 || JSON.stringify(response.data.ResponseCode)=='0'){
                      SetShowHideTopBar(2);
                      console.log("Update Score Score",JSON.stringify(response.data.Game.Score.AnimationType));
                      
                       if (JSON.stringify(response.data.Game.Score.AnimationType)==11) { // catchout
                        setvideovideopath(require('./Videos/GameVideos/Catch/Catch.mp4'));
                       
                       }else if (JSON.stringify(response.data.Game.Score.AnimationType)==10) { // Bowled 
                        videopath = require('./Videos/GameVideos/Bowled/Bowled.mp4');
                        setvideovideopath(require('./Videos/GameVideos/Bowled/Bowled.mp4'));
                       
                       }else if (JSON.stringify(response.data.Game.Score.AnimationType)==9) { // RunOut  
                        videopath = require('./Videos/GameVideos/Runout/Runout.mp4');
                        setvideovideopath(require('./Videos/GameVideos/Runout/Runout.mp4'));
                        
                       } else if (JSON.stringify(response.data.Game.Score.AnimationType)==8) { // CatchMissed   
                        videopath = require('./Videos/GameVideos/CatchMissed/CatchMissed.mp4');
                        setvideovideopath(require('./Videos/GameVideos/Catch/Catch.mp4'));
                        
                       }else if (JSON.stringify(response.data.Game.Score.AnimationType)==7) { // BallMissed    
                        videopath = require('./Videos/GameVideos/NoRuns/BallMissed.mp4');
                        setvideovideopath(require('./Videos/GameVideos/Runout/Runout.mp4'));
                        
                       }else if (JSON.stringify(response.data.Game.Score.AnimationType)==6) { // Six    
                        videopath = require('./Videos/GameVideos/Six/Six.mp4');
                        setvideovideopath(require('./Videos/GameVideos/Six/Six.mp4'));
                        
                       }else if (JSON.stringify(response.data.Game.Score.AnimationType)==4) { // Four    
                        videopath = require('./Videos/GameVideos/Four/Four.mp4');
                        setvideovideopath(require('./Videos/GameVideos/Four/Four.mp4'));
                       
                       }else if (JSON.stringify(response.data.Game.Score.AnimationType)==3) { // Triple     
                        videopath = require('./Videos/GameVideos/Four/Four.mp4');
                        setvideovideopath(require('./Videos/GameVideos/Four/Four.mp4'));
                      
                       
                       }else if (JSON.stringify(response.data.Game.Score.AnimationType)==2) { // Double     
                        videopath = require('./Videos/GameVideos/Run/Single.mp4');
                        setvideovideopath(require('./Videos/GameVideos/Run/Single.mp4'));
                       
                       }else if (JSON.stringify(response.data.Game.Score.AnimationType)==1) { // Single     
                        videopath = require('./Videos/GameVideos/Run/Single.mp4');
                        setvideovideopath(require('./Videos/GameVideos/Run/Single.mp4'));
                        
                        
                       }else if (JSON.stringify(response.data.Game.Score.AnimationType)==0) { // Dot     
                        videopath = require('./Videos/GameVideos/NoRuns/DotBall.mp4');
                        setvideovideopath(require('./Videos/GameVideos/NoRuns/DotBall.mp4'));
                       
                       }
                       else{
                        videopath = require('./Videos/GameVideos/NoRuns/DotBall.mp4');
                        setvideovideopath(require('./Videos/GameVideos/NoRuns/DotBall.mp4'));
                       }
                
                       setTimeout(() => {
                        SetShowHideTopBar(0);               
                      }, 7000);

                       
                        try {
                          SwapPlayerIfApplicable();
                          } catch (e) {
                          console.log('Error')
                          } 
                       
                       
                    }
                     
                        
                   
                    
                   
                })
                .catch(function (error) {
                    console.log(error);
                });
    }
    const SwapPlayerIfApplicable = async () =>{
      const params = JSON.stringify({"Game":{"ID":0,"Match":{"ID":20151,"Title":null,"Description":null,"MatchDate":null,"Venue":null,"Sponsor":null,"NumberOfOvers":0,"NumberOfPlayers":0,"TeamA":null,"TeamACreationType":0,"TeamB":null,"TeamBCreationType":0,"SelectedQuestionSet":null,"Umpire":null,"UmpireUniqueCode":null,"CreatedOn":null,"LastUpdated":null,"IsVisible":false,"MatchWonFinalRemark":null,"CreatedBy":null},"GameDate":null,"DoesUmpireJoined":false,"TossCalledBy":null,"TossWonBy":null,"TossRemark":null,"TossDate":null,"Decision":0,"DoesGameCompleted":false,"GameCompletedOn":null,"SelectedStrikerBatsman":null,"SelectedNonStrikerBatsman":null,"SelectedBowler":null,"SelectedFielder":null,"CurrentBowlBeingThrown":0,"CurrentSession":0,"Score":{"Session":0,"CommentatorsRemark":"No runs in this ball.","PersonalScore":0,"IsOut":false,"IsRunOut":false,"TeamScore":0,"TotalFours":0,"TotalSixes":0,"Wicket":0,"TotalWicketDown":0,"Bowl":1,"OversThrown":0,"Player":null,"PlayerType":0,"AnimationType":0,"Batsman1":null,"Batsman2":null,"Bowler":null,"Fielder":null,"IsTeamAllOut":false},"ScoreItems":null,"GameWonBy":null},"Games":null,"APIUserID":"NIC","APIKey":"123456","IPAddress":null});
      
      axios.post(GLOBALS.BASE_URL +'SwapPlayerIfApplicable', params,{
          "headers": {
          "content-type": "application/json",
          },
          })
        .then(function (response) {

          console.log(response.data);

                  if(response.data.ResponseMessageHindi == 0 || response.data.ResponseMessageHindi=='0'){
                     
                    try {
                      GetMatchWonStatus();
                      if (response.data.DeviceIDList != null && response.data.DeviceIDList.Count > 0)
                        {
                                      for (let device of response.data.DeviceIDList) {
                                        //console.log(device.DeviceID);
                                          //SendPushNotification(device.DeviceID, "QA");
                                          sendPushNotification(device.DeviceID, "R");
                                          setTimeout(() => {
                                          
                                        }, 100);
                                        
                                    }
                      }
                      } catch (e) {
                      console.log('Error')
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
    }
    const GetMatchWonStatus  = async () =>{
      axios.get(GLOBALS.BASE_URL +'GetMatchWonStatus'+'/'+GLOBALS.API_USERID+'/'+GLOBALS.API_KEY+'/'+match_id)
      .then(function (response) {
       // console.log("Check"+response.data.ResponseCode);
                if(response.data.ResponseCode =='0'){

                    if (response.data.DeviceIDList != null) {
                      for (let device of response.data.DeviceIDList) {
                        //console.log(device.DeviceID);
                          //SendPushNotification(device.DeviceID, "QA");
                          sendPushNotification(device.DeviceID, "FR");
                          setTimeout(() => {
                          
                        }, 100);
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

    }
  const getRandomNumberBetween =(min,max) => {
      return Math.floor(Math.random()*(max-min+1)+min);
  }
  const sendPushNotification = async (deviceid,msg) => {
    const FIREBASE_API_KEY = "AAAAPs3FQRQ:APA91bEwgnBf4qEwapaHu6-Xqt8AUAKzS-GkYJf0b4KiC2ec-mCvIye8DbMMtT0PoZKxp6k1oPrURZayM04lbOBEFYrHoLObqU8QGYHtthHjwjHLfGGSvxP16O1SMmo4oJsbbCrWvG0H"
    const json = "{\"to\": \"" + deviceid + "\",\"data\": {\"message\": \"" + msg + "\",}}";
    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: "key=" + FIREBASE_API_KEY,
    });
    let response = await  fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers,
      body: json,
    });
    let jsonresponse = await response.json();
    return jsonresponse;
    SavePushNotificationLog(jsonresponse,deviceid,msg);
  
};
  // const sendPushNotification = async (deviceid,msg) => {

  //   //console.log("Demo",deviceid,msg);
  //   const FIREBASE_API_KEY = "AAAAPs3FQRQ:APA91bEwgnBf4qEwapaHu6-Xqt8AUAKzS-GkYJf0b4KiC2ec-mCvIye8DbMMtT0PoZKxp6k1oPrURZayM04lbOBEFYrHoLObqU8QGYHtthHjwjHLfGGSvxP16O1SMmo4oJsbbCrWvG0H"
  //   const json = "{\"to\": \"" + deviceid + "\",\"data\": {\"message\": \"" + msg + "\",}}";
  //   let headers = new Headers({
  //     "Content-Type": "application/json",
  //     Authorization: "key=" + FIREBASE_API_KEY,
  //   })
  
  // //   axios.post(
  // //     'https://fcm.googleapis.com/fcm/send', 
  // //     {
  // //       method: "POST",
  // //       headers,
  // //       body: json,
  // //     }).then(function (response) {
  // //   onsole.log("ok",response)
  // // })
  // // .catch(function (error) {
       
  // // });
  //   let response = await  fetch("https://fcm.googleapis.com/fcm/send", {
  //     method: "POST",
  //     headers,
  //     body: json,
  //   })
  //   response = await response.json()
  //   //console.log("ok",response)

   
  // }
  const getCurrentDate=()=>{

      var currentTimeInMilliseconds=Date.now();
      return currentTimeInMilliseconds;
 }
  const SavePushNotificationLog = (res,device,message) =>{
    var current_date  =  "\/Date("+getCurrentDate()+")\/";
    const params = JSON.stringify({"PushNotificationLogItems":null,"PushNotificationLogItem":{"ID":0,
    "Match":{"ID":GLOBALS.matchDetails.Match.ID,"Title":null,"Description":null,"MatchDate":null,"Venue":null,"Sponsor":null,"NumberOfOvers":0,"NumberOfPlayers":0,"TeamA":null,"TeamACreationType":0,"TeamB":null,"TeamBCreationType":0,"SelectedQuestionSet":null,"Umpire":null,"UmpireUniqueCode":null,"CreatedOn":null,"LastUpdated":null,"IsVisible":false,"MatchWonFinalRemark":null,"CreatedBy":null},
    "DeviceID":device,"NotificationResponseMessage":"+"+res+"","DateTimeStamp":current_date,"QueryString":message,"PlayerType":0},"APIUserID":"NIC","APIKey":"123456","IPAddress":null});
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
        <View style={{flex:1}}>
          
         {(ShowHideBar) == 1 ? (
          
          <View style={{backgroundColor: '#fff',
          justifyContent: 'space-around'}}>
          
            <FlatList data={QuestionDeliverItems.QuestionsForViewer}
              keyExtractor={(item,index)=> index.toString()}
              renderItem={_renderItem}
              numColumns={numColumns}>

            </FlatList>
            </View>
         ):(ShowHideBar) == 2 ? (
          <View style={{backgroundColor: '#fff',
          justifyContent: 'space-around',flex:1}}>
           <Text>{ShowVideoPath}</Text>
          <Video 
          source={ShowVideoPath}
          style={styles.backgroundVideo} />
          </View>

         ):(
          
          <View style={styles.container}>
        
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
          
          <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,color:Colors.blue,padding:2}} >00</Text>
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

          
          <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,color:Colors.blue,padding:2}} >00</Text>
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
       
        
        
      <TouchableOpacity
    style={{
      paddingHorizontal: 10,
      alignSelf: "center",
      backgroundColor: "#FFF",
      elevation: 1,
      width: '90%',
      borderRadius: 16,
    }}
  ></TouchableOpacity>  
  
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
        

         <View style={{position: 'absolute',
  flex:0.1,
  left: 0,
  right: 0,
  bottom: -10,
  flexDirection:'row',
  justifyContent:'space-between',
  height:60,
  alignItems:'center',}}>
    <TouchableHighlight  onPress={() => ExitGame()} style={[styles.buttonBottomContainer, styles.loginButton]}  >
          <Text style={styles.loginText}>   End Game</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.buttonBottomContainer, styles.loginButton]}  >
          <Text style={styles.loginText}>   Extend Over</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => PlayGame()} style={[styles.buttonBottomContainer, styles.loginButton]}  >
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
    },
    coverImage: {
      width: 50,
      height: 50,
      borderRadius:50,
    
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
  
  });
export default GameWindow;