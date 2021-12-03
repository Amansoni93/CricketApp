import React, { useEffect,useState } from 'react';
import {
  Button,
  StyleSheet,
  View,
  ImageBackground,
  Image,Text,TouchableOpacity
} from 'react-native';
import { Card } from 'react-native-paper';
const  HomePage = ({ navigation }) =>  {
    return (
    
        <View style={styles.container}>
          
         <ImageBackground source={require('./images/splash.png')}  resizeMode="cover" style={styles.image}> 
         <View style={{right:5,top:5,marginTop: -5,position: 'absolute'}}>
            <TouchableOpacity onPress={{}}>
                <View >
                      <Image source={require('./images/lang.png')} style={{height:60,width:60}} />
                </View>
            </TouchableOpacity>
          </View>
          <Image source={require('./images/batsman_icon.png')}   resizeMode="cover" style={styles.centerimage}/>
          <View style={styles.inputContainer}>
          <Card style={{ flex: 1, flexDirection: 'row',
    flexWrap: 'wrap', justifyContent: 'center',height:100,marginHorizontal:10,borderRadius: 5,backgroundColor:'#616161', }} >
              
                    <TouchableOpacity onPress={() => { navigation.navigate('employerDrawble', { itemId: 'Tally', otherParam: 'anything you want here',  });}}>
                      <Image source={require('./images/Sports.png')}
         style = {{ width: 60, height: 60, resizeMode: 'contain', position: 'absolute'}} ></Image>
         
                      <Text style={{ color: '#0030a1', fontWeight: "bold", fontSize: 16,marginTop:15,paddingLeft: 10,textAlign:'center',textTransform:'uppercase'}} >चलाये</Text>
                    </TouchableOpacity>
                 
          </Card>
          <Card  style={{ flex: 1,backgroundColor:'#616161', justifyContent: 'center',height:100,marginHorizontal:10 }}>
              
                    <TouchableOpacity onPress={() => { navigation.navigate('UmpireLogin', { itemId: 'Mason', otherParam: 'anything you want here',  });}}>
                      <Image source={require('./images/hat.png')}
         style = {{width: 60, height: 60, resizeMode: 'contain', position: 'absolute'}}   ></Image>
                      <Text style={{ color: '#0030a1', fontWeight: "bold", fontSize: 16, marginTop:15,paddingLeft: 15,textAlign:'center' }}  >ampire</Text>
                    </TouchableOpacity>
                
          </Card>
          </View>
          <View style={styles.inputContainer}>
          <Card style={{ flex: 1, flexDirection: 'row',
    flexWrap: 'wrap',backgroundColor:'#616161',justifyContent: 'center',height:100,marginHorizontal:10,borderRadius: 5, }} >
              
                    <TouchableOpacity onPress={() => { navigation.navigate('employerDrawble', { itemId: 'Tally', otherParam: 'anything you want here',  });}}>
                      <Image source={require('./images/users.png')}
         style = {{ width: 60, height: 60, resizeMode: 'contain', position: 'absolute'}} ></Image>
         
                      <Text style={{ color: '#0030a1', fontWeight: "bold", fontSize: 16,marginTop:15,paddingLeft: 10,textAlign:'center',textTransform:'uppercase'}} >दर्शक </Text>
                    </TouchableOpacity>
                 
          </Card>
          <Card  style={{ flex: 1, justifyContent: 'center',height:100,marginHorizontal:10, backgroundColor:'#616161',}}>
              
                    <TouchableOpacity onPress={() => { navigation.navigate('employerDrawble', { itemId: 'Mason', otherParam: 'anything you want here',  });}}>
                      <Image source={require('./images/graph.png')}
         style = {{width: 60, height: 60, resizeMode: 'contain', position: 'absolute'}}   ></Image>
                      <Text style={{ color: '#0030a1', fontWeight: "bold", fontSize: 16, marginTop:15,paddingLeft: 15,textAlign:'center' }}  >पिछले  परिणाम </Text>
                    </TouchableOpacity>
                
          </Card>
          </View>
         
           
          </ImageBackground> 
        </View>
        );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      centerimage:{
        alignItems: 'center',
        justifyContent: 'center',
        width:'30%',
        alignSelf:'center',
        height:150
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
    
    export default HomePage;