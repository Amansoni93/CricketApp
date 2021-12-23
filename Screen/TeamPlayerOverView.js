import React, { useEffect,useRef,useState } from 'react';
import {Button,StyleSheet,View, FlatList,TouchableOpacity,Image,Text,TextInput,ScrollView,ImageBackground,SafeAreaView,Alert } from 'react-native';
import GLOBALS from './helper/global'; 
import { Card } from 'react-native-paper';
import Colors from './helper/colors';

const  TeamPlayerOverView = ({ route,navigation }) =>  {
    const { TeamBitemId } = route.params;
    const  {TeamAitemId}  = route.params;
    const  {BattingStatus} = route.params;
    
    return (
        <View style={styles.container}>
        <ImageBackground source={require('./images/main_bg.png')}  resizeMode="cover" style={styles.image}> 
        <View style={{flex:1,flexDirection:'row',marginLeft:2,marginRight:2}}>
               <Text style={{fontSize:16,fontWeight:'700',marginLeft:10,textAlign:'center',flex:1,color:Colors.blackcolor}} >{BattingStatus}</Text>
        </View>
        <View style={{flexDirection:'row',flex:1}}>
          <Text style={{fontSize:16,fontWeight:'700',marginLeft:10,textAlign:'center',color:Colors.white}}>
            Sponsored By
          </Text>
          <Text style={{fontSize:16,fontWeight:'700',marginLeft:10,textAlign:'center',color:Colors.blackcolor}}>{GLOBALS.matchDetails.Match.Sponsor}</Text>
          
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={styles.btnSecondary}>
                            <TouchableOpacity onPress={() => OtpHandle(data.matchid,data.umpireid,data.otp)}>
                                <Text style={{ fontWeight: "bold", marginHorizontal: 5, alignItems: 'stretch',color:'#ffffff' }} >
                                    Skip Intro</Text>
                            </TouchableOpacity>
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
export default TeamPlayerOverView;