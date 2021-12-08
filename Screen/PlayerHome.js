import React, { useEffect,useState } from 'react';
import {
  Button,
  StyleSheet,
  View,SafeAreaView,
  ImageBackground,
  Image,Text,TouchableOpacity,TextInput,Alert,ScrollView 
} from 'react-native';
import GLOBALS from './helper/global'; 
import Colors from './helper/colors';
const PlayerHome =({ navigation }) => {

    return(
      
        <View style={styles.container}>
          <ImageBackground source={require('./images/main_bg.png')}  resizeMode="cover" style={styles.image}> 
          <Image source={require('./images/main_logo.png')} resizeMode="contain" style={styles.centerimage} />
          
          <View  style={{flex:1,flexDirection:'row'}}>
           <Image source={require('./images/rope_horizontal.png')} resizeMode="contain" style={{ alignItems: 'flex-start', justifyContent: 'flex-start',width:50,alignSelf:'flex-start',height:80,}} />
           <Image source={require('./images/rope.png')} resizeMode="contain" style={{ alignItems: 'flex-start',justifyContent: 'flex-start', width:20,top:36,alignSelf:'flex-start',height:80}} />
           <Image source={require('./images/rope_horizontal.png')} resizeMode="contain" style={{ alignItems: 'flex-start',justifyContent: 'flex-start', width:100,alignSelf:'flex-start',height:80,}} />
           <Image source={require('./images/rope.png')} resizeMode="contain" style={{ alignItems: 'flex-start',justifyContent: 'flex-start', width:20,top:36,alignSelf:'flex-start',height:80}} />
           <Image source={require('./images/rope_horizontal.png')} resizeMode="contain" style={{ alignItems: 'flex-start',justifyContent: 'flex-start', width:100,alignSelf:'flex-start',height:80,}} />
           <Image source={require('./images/rope.png')} resizeMode="contain" style={{ alignItems: 'flex-start',justifyContent: 'flex-start',width:20,top:36, alignSelf:'flex-start', height:80}} />
           <Image source={require('./images/rope_horizontal.png')} resizeMode="contain" style={{ alignItems: 'flex-start',justifyContent: 'flex-start',width:40,alignSelf:'flex-start',height:80,}} />
         </View>
        <View style={{flex:1,flexDirection:'row',padding:10,marginLeft:20}}>
            <ImageBackground style={styles.coverImage} source={require('./images/plank.png')}>
              <View style={styles.textView}>
               <Text style={{color:'#ffffff',fontSize:16}}>{GLOBALS.matchDetails.Match.TeamA.Name}</Text>
              </View>
        
            </ImageBackground>
            <ImageBackground style={styles.coverImage}source={require('./images/plank.png')}>
              <View style={styles.textView}>
              <Text style={{color:'#ffffff',fontSize:16}}>Vs</Text>
              </View>
           </ImageBackground>
           <ImageBackground style={styles.coverImage} source={require('./images/plank.png')}>
            <View style={styles.textView}>
            <Text style={{color:'#ffffff',fontSize:16}}>{GLOBALS.matchDetails.Match.TeamB.Name}</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={{flex:1,flexDirection:'row',padding:10,marginLeft:20,}}>
           <View style={{flex:1,flexDirection:'row'}}>
            <Text style={{color:Colors.white,flex:1}} > प्रायोजक :- </Text>
            <Text style={{color:'#ffffff',fontSize:16,flex:1 }}>{GLOBALS.matchDetails.Match.Sponsor}</Text>
           </View>
        
      <View style={{alignSelf:'flex-end',flex:1}}>
        <ImageBackground style={styles.coverImage} source={require('./images/landmark_board.png')}>
        <View style={styles.textView}>
        <Text style={{color:'#ffffff',fontSize:16}}>{GLOBALS.matchDetails.Match.Venue}</Text>
        </View>
        
      </ImageBackground>
      </View>
          </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',margin:10 }}>
                        <View style={styles.btnSecondary}>
                            <TouchableOpacity onPress={() => { navigation.navigate('PlayerList'); }} >
                               <Text style={{ fontWeight: "bold", marginHorizontal: 5, alignItems: 'stretch',color:'#ffffff' ,}} >
                                आगे बढ़ने के लिए यहाँ दबाइए</Text>
                            
                            </TouchableOpacity>
                        </View>
                    </View>
        
        </ImageBackground>
        </View>
       
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    coverImage: {
      width: 100,
      height: 80,
      margin:10,
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