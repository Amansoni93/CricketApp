import React, { useEffect,useState } from 'react';
import {
  Button,
  StyleSheet,
  View,SafeAreaView,
  ImageBackground,
  Image,Text,TouchableOpacity,TextInput,Alert,ScrollView,Dimensions 
} from 'react-native';
import GLOBALS from './helper/global'; 
import Colors from './helper/colors';
const colors = {
  themeColor:"#4263ec",
  white:"#fff",
  background:'#f4f6fc',
  greynish:'#a4a4a4',
  tint:'#2b49c3'

}
import Icon from 'react-native-vector-icons/MaterialIcons';
const PlayerHome =({ navigation }) => {

    return(
      <ImageBackground source={require('./images/back2.png')} style={{height:'100%',width:'100%'}}> 
      <View style={{flexDirection:'row',marginTop:20,alignItems:'center',paddingHorizontal:10}}>
      
             <Icon name="dehaze" backgroundColor="#3b5998" size={30} style={{color:colors.white}} />
           
             <View style={{flexDirection:'row'}}>
             <Icon name="account-circle" backgroundColor="#3b5998" size={30} style={{color:colors.white,marginLeft:290}} />
             
             
             </View>
          
      </View>
    
    <TouchableOpacity
    onPress={() => { navigation.navigate('PlayerList'); }}
    style={{
      paddingHorizontal: 10,
      alignSelf: "center",
      marginTop: 50,
      backgroundColor: "#FFF",
      height: 240,
      elevation: 1,
      width: '90%',
      borderRadius: 16,
    }}
  >
       <View
        style={{
        flexDirection: "row",
        marginTop: 15,
      
        alignItems: "center",
        alignContent:'space-between',
        justifyContent:'space-between'
      }}
    >
     
        <Image
               source={{ uri: GLOBALS.matchDetails.Match.TeamA.Logo}}
               style={{ width: 50,
                height: 50,
                borderRadius:20,alignSelf:'flex-start'}}
            />
      <Image
               source={{ uri: GLOBALS.matchDetails.Match.TeamB.Logo}}
               style={{width: 50,
                height: 50,
                borderRadius:20,alignSelf:'flex-end',alignItems:'flex-end',justifyContent:'flex-end',alignContent:'flex-end'}}
            />
      
     
    </View>
    <View
      style={{
        flexDirection: "row",
        alignSelf: "center",
        alignContent:'space-between',
        justifyContent:'space-between',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontFamily: "RobotoBold",
          color: Colors.blackcolor,
          fontSize: 20,
          flexWrap: 'wrap',
          alignContent:'center',
          flex:1,
          textAlign:'left',
         justifyContent:'space-between'
        }}
      >
       {GLOBALS.matchDetails.Match.TeamA.Name} 
      </Text>

      <Text
        style={{
          fontSize: 20,
          color: Colors.blackcolor,
          flexWrap: 'wrap',
          justifyContent:'space-between',
          alignContent:'space-between',
          textAlign:'center',
          alignItems:'center',
          

        }}
      >
        
       VS
      </Text>
      <Text
        style={{
          fontFamily: "RobotoBold",
          color: Colors.blackcolor,
          fontSize: 20,
          flexWrap: 'wrap',
          flex:1,
          justifyContent:'space-between',
          alignContent:'space-between',
          textAlign:'right'
        }}
      >
          {GLOBALS.matchDetails.Match.TeamB.Name}
      </Text>
    </View>

 

    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        flex:1,
        justifyContent:'space-between',
        alignContent:'space-between'
      }}
    >
      <Text
        style={{
          fontFamily: "RobotoRegular",
          color: "#522289",
          fontSize: 16,
        }}
      >
        प्रायोजक 
      </Text>

      <Text
        style={{
          fontFamily: "RobotoRegular",
          color: "#522289",
          fontSize: 16,
        }}
      >
         {GLOBALS.matchDetails.Match.Sponsor}
      </Text>
    </View>

    

    <Text
      style={{
        fontSize: 17,
        marginRight: -5,
        marginVertical: 3,
        color: "#a2a2db",
      }}
    >
      - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    </Text>

    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent:'space-between',
        alignContent:'space-between'
      }}
    >
      <Text
        style={{
          fontFamily: "RobotoRegular",
          color: Colors.blackcolor,
          fontSize: 16,
        }}
      >
        Venue 
      </Text>
      <Text
        style={{
          fontFamily: "RobotoBold",
          color: Colors.blackcolor,
        
          fontSize: 16,
        }}
      >
        {GLOBALS.matchDetails.Match.Venue}
      </Text>
    </View>
  </TouchableOpacity>
  </ImageBackground>
    );
}
const deviceWidth = Math.round(Dimensions.get('window').width);
const offset = 40;
const radius = 20;
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    cardContainer: {
      backgroundColor: '#a29bfe',
      height: 200,
      borderRadius: 10,
  
      shadowColor: '#000',
      shadowOffset: {
        width: 5,
        height: 5,
      },
      shadowOpacity: 0.75,
      shadowRadius: 5,
      elevation: 9,
    },
    imageStyle: {
      height: 130,
      width: deviceWidth - offset,
      borderTopLeftRadius: radius,
      borderTopRightRadius: radius,
      opacity: 0.9,
      alignContent: 'center',
      alignSelf: 'center',
    },
    titleStyle: {
      fontSize: 20,
      fontWeight: '800',
    },
    titleendStyle: {
      fontSize: 20,
      fontWeight: '800',
      alignSelf:'flex-end',
      justifyContent:'flex-end',
      alignContent:'flex-end',
    },
    categoryStyle: {
      fontWeight: '200',
    },
    infoStyle: {
      marginHorizontal: 10,
      marginVertical: 5,
    },
    iconLabelStyle: {
      flexDirection: 'row',
      marginTop: 10,
    },
    coverImage: {
      width: 50,
      height: 50,
      borderRadius:20,
    },
    coverRightImage: {
      width: 100,
      height: 80,
      margin:10,
      left:80,
    },
    vsImage: {
      width: 50,
      height: 50,
      left:40,
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
    imageText: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
    },
    centerimage:{
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width:40,
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
  
export default PlayerHome;