import React, { useEffect,useRef,useState } from 'react';
import {Button,StyleSheet,View, FlatList,TouchableOpacity,Image,Text,TextInput,ScrollView,ImageBackground,SafeAreaView,Alert } from 'react-native';
import GLOBALS from './helper/global'; 
import { Card } from 'react-native-paper';
import Colors from './helper/colors';
import { Picker } from '@react-native-picker/picker';
import { render } from 'react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod';
import axios from 'axios';

var icon;
const  PlayerList = ({ navigation }) =>  {
  const [TeamAData, setTeamAData] = useState([]);
  const [TeamBData, setTeamBData] = useState([]);
  useEffect(() => {
    GetTeamAData(GLOBALS.matchDetails.Match.ID,GLOBALS.matchDetails.Match.TeamA.ID);
    GetTeamBData(GLOBALS.matchDetails.Match.ID,GLOBALS.matchDetails.Match.TeamB.ID);
    
  }, []);  
  const GetTeamAData =(matchid,teamID) =>
  {
    
    axios.get(GLOBALS.BASE_URL +'GetMappedPlayersByMatchAndTeam'+'/'+GLOBALS.API_USERID+'/'+GLOBALS.API_KEY+'/'+matchid+'/'+teamID)
    .then(function (response) {
      
      setTeamAData(response.data.Players);
      
      })
      .catch(function (error) {
              console.log(error);
          });
  }
  const GetTeamBData =(matchid,teamID) =>
  {
     axios.get(GLOBALS.BASE_URL +'GetMappedPlayersByMatchAndTeam'+'/'+GLOBALS.API_USERID+'/'+GLOBALS.API_KEY+'/'+matchid+'/'+teamID)
    .then(function (response) {
          
      setTeamBData(response.data.Players);
      
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
  const [selectedTossWonByID, setTossWonByID] = useState('');
  const [selectedTossWonByName, setTossWonByName] = useState('');
  const [selectedTossLossByID, setTossLossByID] = useState('');
  const [selectedTossLossByName, setTossLossByName] = useState('');
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
var tossCalledBy =0;
var tossWinner =0;
var ctr = 0;
var ID=0;

const setSelectedTossTeamA  = (tossvalue) => {
    if (TeamAStatus==1 && TeamBStatus ==1) {
      if(tossvalue ==1 || tossvalue ==2)
      {
        settosssetValue(0);
        
      //icon=require("./images/coin_flip.gif");
      ctr += 1;
      if(ctr==1){
              setTimeout(() => {
                var randomSelected = 0;
                var randomVal = getRandomNumberBetween(100, 300);
                console.log(randomVal);
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
                         console.log("ishead"+randomSelected);
                      }
                      else
                      {
                         icon=require("./images/coin_tail.gif");
                         settosssetValue(1);
                         console.log("ishead"+randomSelected);
                      }
      
                      if (tossWinner == 1)
                      {
                          ID = GLOBALS.matchDetails.Match.TeamA.ID;
                          setTossWonByName(GLOBALS.matchDetails.Match.TeamA.Name);
                          setTossWonByID(GLOBALS.matchDetails.Match.TeamA.ID);
                          console.log(GLOBALS.matchDetails.Match.TeamA.Name) ;
                      } else {
                          ID = GLOBALS.matchDetails.Match.TeamB.ID;
                          setTossLossByID(GLOBALS.matchDetails.Match.TeamB.ID);
                          setTossLossByName(GLOBALS.matchDetails.Match.TeamB.Name);
                            console.log(GLOBALS.matchDetails.Match.TeamB.Name) ;
                         
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
    console.log("Team A"+tossvalue);
    setSelectedTossTeamAValue(tossvalue);

  }
  const setSelectedTossTeamB =(TeamBTossValue) =>
  {
    if (TeamAStatus==1 && TeamBStatus ==1) {
    if(TeamBTossValue ==1 || TeamBTossValue ==2)
    {
      settosssetValue(0);
    //icon=require("./images/coin_flip.gif");
    ctr += 1;
    if(ctr==1){
            setTimeout(() => {
              var randomSelected = 0;
              var randomVal = getRandomNumberBetween(100, 300);
              console.log(randomVal);
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
                       console.log("ishead"+randomSelected);
                    }
                    else
                    {
                       icon=require("./images/coin_tail.gif");
                       settosssetValue(1);
                       console.log("ishead"+randomSelected);
                    }
    
                    if (tossWinner == 1)
                    {
                        ID = GLOBALS.matchDetails.Match.TeamA.ID;
                        setTossWonByName(GLOBALS.matchDetails.Match.TeamA.Name);
                        setTossWonByID(GLOBALS.matchDetails.Match.TeamA.ID);
                        console.log(GLOBALS.matchDetails.Match.TeamA.Name) ;
                    } else {
                        ID = GLOBALS.matchDetails.Match.TeamB.ID;
                        setTossLossByID(GLOBALS.matchDetails.Match.TeamB.ID);
                          setTossLossByName(GLOBALS.matchDetails.Match.TeamB.Name);
                          console.log(GLOBALS.matchDetails.Match.TeamB.Name) ;
                       
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
    console.log("Team B"+TeamBTossValue);
    setSelectedTossTeamBValue(TeamBTossValue);
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
        console.log("Check"+response.data.Player);
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
    <TouchableOpacity onPress={()=> getPlayerdetailsTeamA(item.ID,item.Name)} style={[styles.item]}>
    <Card    style={{backgroundColor:'#a68460', borderRadius: 8 ,borderRadius: 15,elevation:8 , shadowOffset: {width: 0, height: 0},
  shadowOpacity: 1,
  shadowRadius: 8,
  elevation: 8,}} >
  
  <Card.Content >
        <View style={{flex:1,flexDirection:'row',}}>
            <Image  source={{ uri: "http://10.132.36.133/Service/"+item.Photo,}}   style={styles.coverImage} />
        <View  style={{flex:1,alignContent:'flex-end',justifyContent:'flex-end',position:'relative'}}> 
           <Text style={{fontSize:16,fontWeight:'700',textAlign:'center',color:'#000000',flexDirection: 'column',justifyContent:'flex-end',flex:1,alignItems:'flex-end'}}>{item.Name}</Text>
          
         </View>
       </View>
      </Card.Content>
    </Card>
  </TouchableOpacity>
  );
  const Item1 = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={()=> getPlayerdetailsTeamB(item.ID,item.Name)} style={[styles.item]}>
     <Card  style={{backgroundColor:'#687082', borderRadius: 15,elevation:8 , shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,}} >
         <Card.Content>
        <View style={{flex:1,flexDirection:'row',}}>
        <Image  source={{
          uri: "http://10.132.36.133/Service/"+item.Photo,
        }}   style={styles.coverImage}/>
        <View style={{flex:1,alignContent:'flex-end',justifyContent:'flex-end',position:'relative'}}>
        <Text style={{fontSize:16,fontWeight:'700',textAlign:'center',flexDirection: 'column',color:'#000000',justifyContent:'flex-end',flex:1,alignItems:'flex-end'}}>{item.Name}</Text>
           {/* <Image  source={require('./images/Edit_Icon.png')} resizeMode="contain"   style={styles.editImage}/> */}
           </View>
        </View>
        </Card.Content>
     </Card>
  </TouchableOpacity>
  );
  const getCurrentDate=()=>{

   // var currentTimeInSeconds=Math.floor(Date.now()/1000); //unix timestamp in seconds
     var currentTimeInMilliseconds=Date.now();
     return currentTimeInMilliseconds;
}
  const SaveTossdetailsTeam  = (CaptionAID,CaptionBID,Message) =>
  {
    console.log(GLOBALS.matchDetails.Match.TeamA);
    console.log(GLOBALS.matchDetails.Match.TeamB);
    console.log(getCurrentDate());
    var current_date  =  "\/Date("+getCurrentDate()+")\/";
   

    const params = JSON.stringify({"TossResults":null,"TossResult":{
      "Match":{"ID":GLOBALS.matchDetails.Match.ID,"Title":GLOBALS.matchDetails.Match.Title,"Description":GLOBALS.matchDetails.Match.Description,"MatchDate":GLOBALS.matchDetails.Match.MatchDate,"Venue":GLOBALS.matchDetails.Match.Venue,"Sponsor":GLOBALS.matchDetails.Match.Sponsor,"NumberOfOvers":GLOBALS.matchDetails.Match.NumberOfOvers,"NumberOfPlayers":GLOBALS.matchDetails.Match.NumberOfPlayers,
      "TeamA":{"ID":GLOBALS.matchDetails.Match.TeamA.ID,"Name":GLOBALS.matchDetails.Match.TeamA.Name,"NickName":GLOBALS.matchDetails.Match.TeamA.NickName,"Coach":GLOBALS.matchDetails.Match.TeamA.Coach,"AboutTeam":GLOBALS.matchDetails.Match.TeamA.AboutTeam,"Logo":GLOBALS.matchDetails.Match.TeamA.Logo,"Class":GLOBALS.matchDetails.Match.TeamA.Class,"Topic":GLOBALS.matchDetails.Match.TeamA.Topic,"CreatedOn":GLOBALS.matchDetails.Match.TeamA.CreatedOn,"IsVisible":GLOBALS.matchDetails.Match.TeamA.IsVisible,"PreferredLanguage":GLOBALS.matchDetails.Match.TeamA.PreferredLanguage,
      "Players":GLOBALS.matchDetails.Match.TeamA.Players,
      "IsBatting":true,"CreatedBy":null},
      "TeamACreationType":GLOBALS.matchDetails.Match.TeamACreationType,
      "TeamB":{"ID":GLOBALS.matchDetails.Match.TeamB.ID,"Name":GLOBALS.matchDetails.Match.TeamB.Name,"NickName":GLOBALS.matchDetails.Match.TeamB.NickName,"Coach":GLOBALS.matchDetails.Match.TeamB.Coach,"AboutTeam":GLOBALS.matchDetails.Match.TeamB.AboutTeam,"Logo":GLOBALS.matchDetails.Match.TeamB.Logo,"Class":GLOBALS.matchDetails.Match.TeamB.Class,"Topic":GLOBALS.matchDetails.Match.TeamB.Topic,"CreatedOn":GLOBALS.matchDetails.Match.TeamB.CreatedOn,"IsVisible":GLOBALS.matchDetails.Match.TeamB.IsVisible,"PreferredLanguage":GLOBALS.matchDetails.Match.TeamB.PreferredLanguage,
      "Players":GLOBALS.matchDetails.Match.TeamB.Players,
      "IsBatting":false,"CreatedBy":null},
      "TeamBCreationType":GLOBALS.matchDetails.Match.TeamBCreationType,
      "SelectedQuestionSet":GLOBALS.matchDetails.Match.SelectedQuestionSet,
      "Umpire":GLOBALS.matchDetails.Match.Umpire,"UmpireUniqueCode":GLOBALS.matchDetails.Match.UmpireUniqueCode,"CreatedOn":GLOBALS.matchDetails.Match.CreatedOn,"LastUpdated":GLOBALS.matchDetails.Match.LastUpdated,"IsVisible":GLOBALS.matchDetails.Match.IsVisible,"MatchWonFinalRemark":GLOBALS.matchDetails.Match.MatchWonFinalRemark,
      "CreatedBy":GLOBALS.matchDetails.Match.CreatedBy},
      "TossCalledBy":{"ID":selectedTossWonByID,"Name":selectedTossWonByName,"NickName":null,"Coach":null,"AboutTeam":null,"Logo":null,"Class":null,"Topic":null,"CreatedOn":null,"IsVisible":false,"PreferredLanguage":0,"Players":null,"IsBatting":false,"CreatedBy":null},
      "TossWonBy":{"ID":selectedTossWonByID,"Name":selectedTossWonByName,"NickName":null,"Coach":null,"AboutTeam":null,"Logo":null,"Class":null,"Topic":null,"CreatedOn":null,"IsVisible":false,"PreferredLanguage":0,"Players":null,"IsBatting":false,"CreatedBy":null},
      "TossDate":current_date,"Decision":1,"TossRemark":selectedTossWonByName+" has won the toss and elected to Bowl first."},"APIUserID":"NIC","APIKey":"123456","IPAddress":null});

      console.log(params);
        axios.post(GLOBALS.BASE_URL +'SaveTossResult', params,{
            "headers": {
            "content-type": "application/json",
            },
            })
          .then(function (response) {

            console.log(response.data);

                    if(response.data.ResponseCode == 0 || response.data.ResponseCode=='0'){
                       
                       
                      navigation.navigate('TeamPlayerOverView', {
                        TeamWinitemId: selectedTossWonByID,
                        TeamWinitemName:selectedTossWonByName,
                        TeamLossitemID:selectedTossLossByID,
                        TeamLossitemName:selectedTossLossByName,
                        BattingStatus:selectedTossWonByName +" is going to Boll",
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
    <ImageBackground source={require('./images/main_bg.png')}  resizeMode="cover" style={styles.image}> 
      <View style={{flex:1,flexDirection:'row',marginLeft:2,marginRight:2}}>
        <Text style={{fontSize:16,fontWeight:'700',marginLeft:10,textAlign:'left',flex:1,color:Colors.blackcolor}}>{GLOBALS.matchDetails.Match.TeamA.Name}</Text>
        <Text style={{fontSize:16,fontWeight:'700',marginRight:10,textAlign:'right',alignItems:'flex-end',flex:1,color:Colors.blackcolor}}>{GLOBALS.matchDetails.Match.TeamB.Name}</Text>
      </View>
      {(selectedTossvalue) == 1 ? (
          <View  style={{flex:1,alignContent:'center',justifyContent:'center'}}>
             <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
             
                 <Image  source={icon}    style={{width:80,height:80,justifyContent:'center',alignContent:'center'}}/>
               
             </View>
             <View style={{flexDirection:'row',alignContent:'center',justifyContent:'space-between',margin:10}}>
               <TouchableOpacity onPress={ ()=> SaveTossdetailsTeam(selectTeamAPlayerID,selectTeamBPlayerID,selectedTossWonByName) }>
                   <Image  source={require("./images/batting_icon.png")}    style={{width:50,height:80,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:10,padding:10}} />
               </TouchableOpacity>
               
               <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
             <Text style={{color:Colors.blackcolor,alignItems:'center'}}>{selectedTossWonByName} has won the toss.</Text>
             </View>
             <TouchableOpacity onPress={ ()=> SaveTossdetailsTeam(selectTeamAPlayerID,selectTeamBPlayerID,selectedTossWonByName) }>
                   <Image  source={require("./images/bowling_icon.png")}    style={{width:50,height:80,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:10,padding:10}} />
               </TouchableOpacity>
             {/* <TouchableOpacity onPress={() => {
            navigation.navigate('TeamPlayerOverView', {
              TeamAitemId: selectTeamAPlayerID,
              TeamBitemId:selectTeamBPlayerID,
              BattingStatus:selectedTossWonByName +" is going to Boll",
          });  }}>
               <Image  source={require("./images/bowling_icon.png")}    style={{width:50,height:80,justifyContent:'flex-end',alignContent:'flex-end',margin:10,padding:10}} />
               </TouchableOpacity> */}
             </View>
             
          </View>
      ): (selectedTossvalue) ==0?(
         <View  style={{flexDirection:'row',alignContent:'center',justifyContent:'center'}}>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',alignContent:'center'}}>      
             <Image  source={require("./images/coin_flip.gif")}    style={{width:80,height:80,justifyContent:'center',alignContent:'center'}}/>

             </View>
        </View>
      ):(
        <View style={{flexDirection:'row'}}>
        <Text style={{color:Colors.blackcolor,alignItems:'center'}}>   Select Captain from  Both Team and then click 'Call Toss'</Text>
        </View>
      )}
      
        <View style={{alignItems:'center'}}>
        <Text style={{color:'#e1e655',alignItems:'center',alignContent:'center'}}>Match ID :{GLOBALS.matchDetails.Match.ID}</Text>
        </View>
       
    <View style={{flexDirection:'row',flex:3,margin:5}}>
        <View style={{flex:1,flexDirection:'row',padding:2,shadowColor:'#000', }}>
        <SafeAreaView style={{flex:1}}>
        
        <FlatList data={TeamAData}   contentContainerStyle={{padding:2}}
         renderItem={renderItem}
         keyExtractor={(item, index) => item.ID}
        />
        
    
       <View style={{flexDirection:'row',backgroundColor:Colors.white}}>
       {(TeamAStatus) == 1 ? ( 
         <View style={{flexDirection:'row'}}>
           <Image  source={{ uri: selectedIdPlayerTeamAImage,}}   style={styles.coverImage} />
           <Text style={{fontSize:16,fontWeight:'700',textAlign:'center',color:Colors.blackcolor,justifyContent:'center'}}> {selectedIdPlayerTeamA} (Caption) </Text>
           </View>
       ):(
        <Text style={{fontSize:16,fontWeight:'700',textAlign:'center',color:Colors.blackcolor,justifyContent:'center'}}>  Select Captain from  Team A</Text>
       )}
        </View>
        <View style={{flexDirection:'row',backgroundColor:'#34ebd5'}}>
        <Picker  style={styles.input} onValueChange={(itemValue, itemIndex) => setSelectedTossTeamA(itemValue)} >
              <Picker.Item label="Call Toss" value="0" />
              <Picker.Item label="HEAD" value="1" />
              <Picker.Item label="TAIL" value="2" />
            </Picker>
        </View>
        </SafeAreaView>
    </View>
    <View style={{flex:1,flexDirection:'row',padding:2,}}>
      <SafeAreaView style={{flex:1}}>
    <FlatList data={TeamBData}
        renderItem={renderItem1}
        keyExtractor={(item, index) => item.ID}
         />
     
    <View style={{flexDirection:'row',backgroundColor:Colors.white}}>
    {(TeamBStatus) == 1 ? ( 
       <View style={{flexDirection:'row'}}>
           <Image  source={{ uri: selectedIdPlayerTeamBImage,}}   style={styles.coverImage} />
           <Text style={{fontSize:16,fontWeight:'700',textAlign:'center',color:Colors.blackcolor,justifyContent:'center'}}>  {selectedIdPlayerTeamB} (Caption)  </Text>
           </View>
       ) : (
      <Text style={{fontSize:16,fontWeight:'700',textAlign:'center',color:Colors.blackcolor,justifyContent:'center'}}>  Select Captain From Team B </Text>
    )}
        </View>
        <View style={{flexDirection:'row',backgroundColor:'#34ebd5'}} >
        <Picker  style={styles.input} onValueChange={(itemValue, itemIndex) => setSelectedTossTeamB(itemValue)} >
        <Picker.Item label="Call Toss" value="0" />
              <Picker.Item label="HEAD" value="1" />
              <Picker.Item label="TAIL" value="2" />
            </Picker>
        </View>
        </SafeAreaView>
    </View>
    </View>
    </ImageBackground>
</View>
    
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