import React, { useEffect,useState } from 'react';
import {
  Button,
  StyleSheet,
  View,SafeAreaView,
  ImageBackground,
  Image,Text,TouchableOpacity,TextInput,Alert 
} from 'react-native';
import GLOBALS from './helper/global'; 
import Colors from './helper/colors';
const PlayerHome =({ navigation }) => {

    return(
        <View style={styles.container}>
          
        <ImageBackground source={require('./images/main_bg.png')}  resizeMode="cover" style={styles.image}> 
        <View>
        <Image source={require('./images/main_logo.png')} resizeMode="contain" style={styles.centerimage} />
        </View>
        <View>
        <Image source={require('./images/rope_horizontal.png')} resizeMode="contain" style={styles.centerimage} />
       
        </View>
        <View>
        <Text style={{color:'#000'}}>{GLOBALS.matchDetails.Match.TeamA.Name}</Text>
        </View>
        </ImageBackground>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    centerimage:{
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width:'30%',
      alignSelf:'flex-start',
      height:80,
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
  
export default PlayerHome;