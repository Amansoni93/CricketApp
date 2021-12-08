import React, { useEffect,useRef,useState } from 'react';
import {Button,StyleSheet,View, FlatList,TouchableOpacity,Image,Text,TextInput,ScrollView,ImageBackground,SafeAreaView} from 'react-native';
import GLOBALS from './helper/global'; 
import { Card } from 'react-native-paper';
import Colors from './helper/colors';
import { Picker } from '@react-native-picker/picker';
const  PlayerList = ({ navigation }) =>  {
  const [selectedTeamA, setSelectedTossTeamAValue] = useState();
  const [selectedTeamB, setSelectedTossTeamBValue] = useState();
  const setSelectedTossTeamA  = (tossvalue) => {

    console.log("Team A"+tossvalue);
    setSelectedTossTeamAValue(tossvalue);

  }
  const setSelectedTossTeamB =(TeamBTossValue) =>
  {
    console.log("Team B"+TeamBTossValue);
    setSelectedTossTeamBValue(TeamBTossValue);
  }

 return (
    <View style={styles.container}>
    <ImageBackground source={require('./images/main_bg.png')}  resizeMode="cover" style={styles.image}> 
      <View style={{flex:1,flexDirection:'row',marginLeft:2,marginRight:2}}>
        <Text style={{fontSize:16,fontWeight:'700',marginLeft:10,textAlign:'left',flex:1,color:Colors.blackcolor}}>{GLOBALS.matchDetails.Match.TeamA.Name}</Text>
        <Text style={{fontSize:16,fontWeight:'700',marginRight:10,textAlign:'right',alignItems:'flex-end',flex:1,color:Colors.blackcolor}}>{GLOBALS.matchDetails.Match.TeamB.Name}</Text>
      </View>
      <View style={{alignItems:'center'}}>
      <Image source={require('./images/coin_head.gif')} style={{width: 100, height: 100 }} />
        </View>
      <View style={{flexDirection:'row'}}>
        <Text style={{color:Colors.blackcolor,alignItems:'center'}}>Select Captain from  Both Team and then click 'Call Toss'</Text>
        </View>
        <View style={{alignItems:'center'}}>
        <Text style={{color:'#e1e655',alignItems:'center',alignContent:'center'}}>Match ID :{GLOBALS.matchDetails.Match.ID}</Text>
        </View>
        <View style={{alignItems:'center'}}>
        <Text style={{color:Colors.white,alignItems:'center',alignContent:'center'}}>यदि आप बाये और दाये साइडबार में खिलाड़ियों की सूची देखने में असमर्थ है , तो इस विंडो के शीर्ष पर REFRESH बटन पर क्लिक करे </Text>
        </View>
    <View style={{flexDirection:'row',flex:3,margin:5}}>
        <View style={{flex:1,flexDirection:'row',margin:2}}>
        <SafeAreaView style={{flex:1}}>
        <FlatList data={GLOBALS.matchDetails.Match.TeamA.Players}
          renderItem={({item,index}) =>(
          <View >
                  <Card onPress={{}} style={{backgroundColor:'#a68460'}} >
                  
                    <View style={{ borderBottomColor: 'black',borderBottomWidth: 1,}}  />
                    <View style={{flex:1,flexDirection:'row',padding:5,marginLeft:5}}>
                      <Image  source={{ uri: 'http://10.132.36.133/Service/'+item.Photo,
}}   style={styles.coverImage} resizeMode="contain"/>
                      <View style={{flex:1}}>
                        <Text style={{fontSize:16,fontWeight:'700',textAlign:'center'}}>{item.Name}</Text>
                        <Image  source={require('./images/Edit_Icon.png')} resizeMode="contain"   style={styles.editImage}/>
                      </View>
                    </View>
                
                  </Card>
          </View>
     )}>
 
    </FlatList>
       <View style={{flexDirection:'row',backgroundColor:Colors.white}}>
           <Text style={{fontSize:16,fontWeight:'700',textAlign:'center',color:Colors.blackcolor}}>Select Captain from  Team A</Text>
        </View>
        <View style={{flexDirection:'row',backgroundColor:'#34ebd5'}}>
        <Picker selectedValue={selectedTeamA} style={styles.input} onValueChange={(itemValue, itemIndex) => setSelectedTossTeamA(itemValue)} >
              <Picker.Item label="Call Toss" value="Call Toss" />
              <Picker.Item label="HEAD" value="HEAD" />
              <Picker.Item label="TAIL" value="TAIL" />
            </Picker>
        </View>
        </SafeAreaView>
    </View>
    <View style={{flex:1,flexDirection:'row',margin:2}}>
      <SafeAreaView style={{flex:1}}>
    <FlatList data={GLOBALS.matchDetails.Match.TeamB.Players}
       renderItem={({item,index}) =>(
      <View >
        <Card onPress={{}} style={{backgroundColor:'#687082'}} >
        
        <View style={{ borderBottomColor: 'black',borderBottomWidth: 1,    }}  />
        <View style={{flex:1,flexDirection:'row',padding:5,marginLeft:5}}>
        <Image  source={{
          uri: 'http://10.132.36.133/Service/'+item.Photo,
        }}   style={styles.coverImage}/>
        <View style={{flex:1}}>
        <Text style={{fontSize:16,fontWeight:'700',textAlign:'center',color:'#000000'}}>{item.Name}</Text>
           <Image  source={require('./images/Edit_Icon.png')} resizeMode="contain"   style={styles.editImage}/>
           </View>
        </View>
        
     </Card>
      </View>
     
    )}>

    </FlatList>
    <View style={{flexDirection:'row',backgroundColor:Colors.white}}>
           <Text style={{fontSize:16,fontWeight:'700',textAlign:'center',color:Colors.blackcolor}}>Select Captain From Team B </Text>
        </View>
        <View style={{flexDirection:'row',backgroundColor:'#34ebd5'}} >
        <Picker selectedValue={selectedTeamB} style={styles.input} onValueChange={(itemValue, itemIndex) => setSelectedTossTeamB(itemValue)} >
        <Picker.Item label="Call Toss" value="Call Toss" />
              <Picker.Item label="HEAD" value="HEAD" />
              <Picker.Item label="TAIL" value="TAIL" />
            </Picker>
        </View>
        </SafeAreaView>
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
      width: 60,
      height: 60,
      margin:2,
    },
    editImage: {
      width: 30,
      height: 30,
      margin:2,
      alignItems: 'flex-end',
      justifyContent:'flex-end',
      position:'relative'
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