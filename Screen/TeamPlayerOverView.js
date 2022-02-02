import React, { useEffect,useRef,useState } from 'react';
import {Button,StyleSheet,View, FlatList,TouchableOpacity,Image,Text,TextInput,ScrollView,ImageBackground,SafeAreaView,Alert,TouchableHighlight } from 'react-native';
import GLOBALS from './helper/global'; 
import { Card } from 'react-native-paper';
import Colors from './helper/colors';
import axios from 'axios';
import Carousel from './component/Carousel';
import { dummyData } from './data/Data';

const  TeamPlayerOverView = ({ route,navigation }) =>  {
    const [MappedPlayerStatics, setMappedPlayerStaticsData] = useState();
    const { TeamWinitemId } = route.params;
    const  {TeamWinitemName}  = route.params;
    const { TeamLossitemID } = route.params;
    const  {TeamLossitemName}  = route.params;
    const  {BattingStatus} = route.params;
    const  {TeamA1Status} = route.params;
    const  {TeamB1Status} = route.params;
    const  {TossDesion} = route.params;
    const  {SeletedTeamWon} = route.params;
    useEffect(() => {
      GetMappedPlayerStaticsData(GLOBALS.matchDetails.Match.ID);
    }, []); 
    const GetMappedPlayerStaticsData =(matchid) =>
  {
    axios.get(GLOBALS.BASE_URL +'GetMappedPlayersStatistics'+'/'+GLOBALS.API_USERID+'/'+GLOBALS.API_KEY+'/'+matchid)
    .then(function (response) {
      if(response.data.ResponseCode =='0'){
      //  console.log("check list",response.data.PlayersStatistics);
      setMappedPlayerStaticsData(response.data.PlayersStatistics);
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
        height: 500,
        elevation: 1,
        width: '96%',
        borderRadius: 16,
      }}
    >
        <View
      style={{
        flexDirection: "row",
        alignSelf:'center',
        alignItems: "center",
        flex:1,
      }}
    >
             <Text style={{fontSize:16,fontWeight:'700',marginLeft:10,color:Colors.blackcolor,alignSelf:'center'}} >{BattingStatus}</Text>
    </View>
    <View>
            <Carousel data = {MappedPlayerStatics}/>
    </View>    
        <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        alignSelf:'center',
        flex:1,
      }}
    >
      <Text
        style={{
          fontFamily: "RobotoRegular",
          color: "#522289",
          fontSize: 16,
          flex:1,
          alignSelf:'center'
        }}
      >
        प्रायोजक 
      </Text>

      <Text
        style={{
          fontFamily: "RobotoRegular",
          color: "#522289",
          marginRight:20,
          flex:1,
          textAlign:'right',
          fontSize: 16,
        }}
      >
        {GLOBALS.matchDetails.Match.Sponsor}
      </Text>
    </View>

        
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => { navigation.navigate('PlayerDevice',{
                        WinTeanitemId: TeamWinitemId,
                        WinTeamitemName:TeamWinitemName,
                        LossTeamitemID: TeamLossitemID,
                        LossTeamitemName:TeamLossitemName,
                        BattingStatus:BattingStatus,
                        TossDesion:TossDesion,
                        Teama1Status:TeamA1Status,
                        Teamb1Status:TeamB1Status,
                        SeletedTeamWon:SeletedTeamWon,
                    }); }}>
          <Text style={styles.loginText}>Skip Intro</Text>
        </TouchableHighlight>
       

        
       
       </TouchableOpacity>
    )
    
   }
  
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
    loginButton: {
      backgroundColor: "#9CD85C",
    },
    loginText: {
      color: 'white',
    },
    buttonContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf:'center',
      marginBottom:20,
      width:250,
      alignContent:'center',
      borderRadius:30,
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
export default TeamPlayerOverView;