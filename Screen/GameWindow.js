import React, { useEffect,useRef,useState } from 'react';
import {Button,StyleSheet,View, FlatList,TouchableOpacity,Image,Text,TextInput,ScrollView,ImageBackground,SafeAreaView,Alert } from 'react-native';
import GLOBALS from './helper/global'; 
import { Card } from 'react-native-paper';
import Colors from './helper/colors';
import axios from 'axios';
import { Directions } from 'react-native-gesture-handler';
import RBSheet from "react-native-raw-bottom-sheet";
const  GameWindow = ({ route,navigation }) =>  {
  const refRBSheetTeamBat1 = useRef();
  const refRBSheetTeamBat2 = useRef();
  const refRBSheetTeamBoll1 = useRef();
  const refRBSheetTeamBoll2 = useRef();
  const [TeamAData, setTeamAData] = useState([]);
  const [TeamBData, setTeamBData] = useState([]);
  const [Bat1IDData, setBatData1ID] = useState();
  const [Bat1NameData, setBatData1Name] = useState();
  const [Bat1PhotoData, setBatData1Photo] = useState();
  const [Bat2IDData, setBatData2ID] = useState();
  const [Bat2NameData, setBatData2Name] = useState();
  const [Bat2PhotoData, setBatData2Photo] = useState();
  const [Boll1IDData, setBollData1ID] = useState();
  const [Boll1NameData, setBollData1Name] = useState();
  const [Boll1PhotoData, setBollData1Photo] = useState();
  const [Boll2IDData, setBollData2ID] = useState();
  const [Boll2NameData, setBollData2Name] = useState();
  const [Boll2PhotoData, setBollData2Photo] = useState();
    const { WinTeanitemId } = route.params;
    const  {WinTeamitemName}  = route.params;
    const { LossTeamitemID } = route.params;
    const  {LossTeamitemName}  = route.params;
    const  {TossDesion} = route.params;
    const  {TeamA1Status} = route.params;
    const  {TeamB1Status} = route.params;
   
    var batteamname,bowlteamname;
    useEffect(() => {
      console.log(TeamA1Status,TeamB1Status);
      if (TeamA1Status == true) {
        GetTeamAData(GLOBALS.matchDetails.Match.ID,GLOBALS.matchDetails.Match.TeamA.ID);
        GetTeamBData(GLOBALS.matchDetails.Match.ID,GLOBALS.matchDetails.Match.TeamB.ID);
        console.log("TeamA"+GLOBALS.matchDetails.Match.TeamA.ID);
        console.log("TeamB"+GLOBALS.matchDetails.Match.TeamB.ID);
      }else {
        GetTeamAData(GLOBALS.matchDetails.Match.ID,GLOBALS.matchDetails.Match.TeamB.ID);
        GetTeamBData(GLOBALS.matchDetails.Match.ID,GLOBALS.matchDetails.Match.TeamA.ID);
        console.log("TeamB"+GLOBALS.matchDetails.Match.TeamB.ID);
        console.log("TeamA"+GLOBALS.matchDetails.Match.TeamA.ID);
      }
      if (TeamB1Status == true) {
       
      }else {
        
      }
     
      
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
      
    }, []); 
    
    const getBattingPlayer1Details=(playerid,name,photo) => {
      setBatData1ID(playerid);
      setBatData1Name(name);
      setBatData1Photo(photo);
      refRBSheetTeamBat1.current.close();
    }
    const getBattingPlayer2Details= (playerid,name,photo) =>{
      setBatData2ID(playerid);
      setBatData2Name(name);
      setBatData2Photo(photo);
      refRBSheetTeamBat2.current.close();
    }
    const getBollPlayer1Details =(playerid,name,photo) =>{
      setBollData1ID(playerid);
      setBollData1Name(name);
      setBollData1Photo(photo);
      refRBSheetTeamBoll1.current.close();
    }
    const getBollPlayer2Details =(playerid,name,photo) =>
    {
      setBollData2ID(playerid);
      setBollData2Name(name);
      setBollData2Photo(photo);
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
      onPress={()=> getBattingPlayer2Details(item.ID,item.Name,item.Photo)} 
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
    const Item2 = ({ item, onPress, backgroundColor, textColor }) => (
      <TouchableOpacity
      onPress={()=> getBollPlayer1Details(item.ID,item.Name,item.Photo)} 
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
    const Item3 = ({ item, onPress, backgroundColor, textColor }) => (
      <TouchableOpacity
      onPress={()=> getBollPlayer2Details(item.ID,item.Name,item.Photo)} 
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
        <Image  source={{uri:Bat1PhotoData}}    style={{width:60,height:60,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:10,padding:2}} />
        <View style={{flexDirection:'column'}}>
        {(Bat1IDData) == "" ? (
           <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,flex:1,color:Colors.blue,padding:2}} >  Batsman 1</Text>
        ) : (
          <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,flex:1,color:Colors.blue,padding:2}} >  {Bat1NameData}</Text>
        )}
       
          <Text style={{fontSize:12,fontWeight:'700',marginLeft:10,flex:1,color:Colors.blue,padding:2}} >Batsman(Striker)</Text>
         
          <View style={styles.btnSecondary}>
                            <TouchableOpacity onPress={() => refRBSheetTeamBat1.current.open()} >
                                <Text style={{ fontWeight: "bold", marginHorizontal: 5, alignItems: 'stretch',color:'#ffffff' }} >
                                    Select Bats</Text>
                            </TouchableOpacity>
                        </View>
         

          </View>
          
          <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,flex:1,color:Colors.blue,padding:2}} >00</Text>
          </View>
          
          <View style={{flex:1, flexDirection:'row'}}>
        <Image  source={{uri:Bat2PhotoData}}    style={{width:60,height:60,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:10,padding:2}} />
        <View style={{flexDirection:'column'}}>
        {(Bat2IDData) == "" ? (
        <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,flex:1,color:Colors.blue,padding:2}} >Batsman 2 </Text>
        ) : (
          <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,flex:1,color:Colors.blue,padding:2}} > {Bat2NameData}</Text>
        )}
          <Text style={{fontSize:12,fontWeight:'700',marginLeft:10,flex:1,color:Colors.blue,padding:2}} >Batsman(Non-Striker)</Text>
         
          <View style={styles.btnSecondary}>
                            <TouchableOpacity  onPress={() => refRBSheetTeamBat2.current.open()} >
                                <Text style={{ fontWeight: "bold", marginHorizontal: 5, alignItems: 'stretch',color:'#ffffff' }} >
                                    Select Bats</Text>
                            </TouchableOpacity>
                        </View>
         

          </View>
          
          <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,flex:1,color:Colors.blue,padding:2}} >00</Text>
          </View>
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
        
        <View style={{flex:1,marginTop:30 }}>
       
       <View style={{flexDirection:'row'}}>
         
       <Image  source={{ uri:GLOBALS.matchDetails.Match.TeamB.Logo}}  style={{width:60,height:60,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:10,padding:2}} />
       <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,flex:1,color:Colors.blackcolor,padding:2}} >{bowlteamname}</Text>
       <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,flex:1,color:Colors.Marooncolor,padding:2}} >Bowling</Text>
    
     </View>

     <View style={{flex:1, flexDirection:'row'}}>
     <Image  source={{uri:Boll1PhotoData}}    style={{width:60,height:60,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:10,padding:2}} />
     <View style={{flexDirection:'column'}}>
     {(Boll1IDData) == "" ? (
     <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,flex:1,color:Colors.blue,padding:2}} >Bowler</Text>
     ) : ( 
     <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,flex:1,color:Colors.blue,padding:2}} >{Boll1NameData}</Text>
     )}
       <Text style={{fontSize:12,fontWeight:'700',marginLeft:10,flex:1,color:Colors.blue,padding:2}} >Bowler</Text>
      
       <View style={styles.btnSecondary}>
                         <TouchableOpacity  onPress={() => refRBSheetTeamBoll1.current.open()} >
                             <Text style={{ fontWeight: "bold", marginHorizontal: 5, alignItems: 'stretch',color:'#ffffff' }} >
                                 Select Bats</Text>
                         </TouchableOpacity>
                     </View>
      

       </View>
       
       <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,flex:1,color:Colors.blue,padding:2}} >00</Text>
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
       
       <View style={{flex:1, flexDirection:'row'}}>
     <Image  source={{uri:Boll2PhotoData}}    style={{width:60,height:60,justifyContent:'flex-start',left:0,alignContent:'flex-start',margin:10,padding:2}} />
     <View style={{flexDirection:'column'}}>
     {(Boll2IDData) == "" ? (
       <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,flex:1,color:Colors.blue,padding:2}} >Fielder</Text>
     ) : (
      <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,flex:1,color:Colors.blue,padding:2}} >{Boll2NameData}</Text>
     )}
       <Text style={{fontSize:12,fontWeight:'700',marginLeft:10,flex:1,color:Colors.blue,padding:2}} >Fielder</Text>
      
       <View style={styles.btnSecondary}>
                         <TouchableOpacity   onPress={() => refRBSheetTeamBoll2.current.open()} >
                             <Text style={{ fontWeight: "bold", marginHorizontal: 5, alignItems: 'stretch',color:'#ffffff' }} >
                                 Select Bats</Text>
                         </TouchableOpacity>
                     </View>
      

       </View>
       
       <Text style={{fontSize:18,fontWeight:'700',marginLeft:10,flex:1,color:Colors.blue,padding:2}} >00</Text>
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