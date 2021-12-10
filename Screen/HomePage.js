import React, { useEffect,useState } from 'react';
import {
  Button,
  StyleSheet,
  View,
  ImageBackground,
  Image,Text,TouchableOpacity
} from 'react-native';
import { Card } from 'react-native-paper';
import Colors from './helper/colors';
const  HomePage = ({ navigation }) =>  {
    return (
    
        <View style={styles.container}>
          
         <ImageBackground source={require('./images/splash.png')}  resizeMode="cover" style={styles.image}> 
         <View style={{right:5,top:5,marginTop: -5,position: 'absolute'}}>
            <TouchableOpacity onPress={{}}>
                <View >
                      <Image source={require('./images/lang.png')} style={{height:50,width:50}} />
                </View>
            </TouchableOpacity>
          </View>
          <Image source={require('./images/batsman_icon.png')}   resizeMode="cover" style={styles.centerimage}/>
          <View style={{width: '100%', 
      height: 50, 
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',
      bottom: 150}} >
          <View style={styles.inputContainer}>
              < Card style={{ flex: 1, flexDirection: 'row',
        flexWrap: 'wrap', justifyContent: 'flex-end',height:100,marginHorizontal:10,borderRadius: 5,backgroundColor:'#616161', }} >
                  
                        <TouchableOpacity onPress={() => { navigation.navigate('employerDrawble', { itemId: 'Tally', otherParam: 'anything you want here',  });}}>
                          <Image source={require('./images/Sports.png')}
            style = {styles.cardcenterimage} ></Image>
            
                          <Text style={{ color: Colors.white, fontWeight: "bold", fontSize: 16,marginTop:15,paddingLeft: 10,textAlign:'center',textTransform:'uppercase',justifyContent:'center'}} >चलाये</Text>
                        </TouchableOpacity>
                    
              </Card>
          <Card  style={{ flex: 1,backgroundColor:'#616161', justifyContent: 'center',height:100,marginHorizontal:10 }}>
              
                    <TouchableOpacity onPress={() => { navigation.navigate('UmpireLogin', { itemId: 'Mason', otherParam: 'anything you want here',  });}}>
                      <Image source={require('./images/hat.png')}
         style = {styles.cardcenterimage}   ></Image>
                      <Text style={{ color: Colors.white, fontWeight: "bold", fontSize: 16, marginTop:15,paddingLeft: 15,textAlign:'center' }}  >अंपायर</Text>
                    </TouchableOpacity>
                
          </Card>
          </View>
          <View style={styles.inputContainer}>
          <Card style={{ flex: 1, flexDirection: 'row',
    flexWrap: 'wrap',backgroundColor:'#616161',justifyContent: 'center',height:100,marginHorizontal:10,borderRadius: 5, }} >
              
                    <TouchableOpacity onPress={() => { navigation.navigate('employerDrawble', { itemId: 'Tally', otherParam: 'anything you want here',  });}}>
                      <Image source={require('./images/users.png')}
         style = {styles.cardcenterimage} ></Image>
         
                      <Text style={{ color: Colors.white, fontWeight: "bold", fontSize: 16,marginTop:15,paddingLeft: 10,textAlign:'center',textTransform:'uppercase'}} >दर्शक </Text>
                    </TouchableOpacity>
                 
          </Card>
          <Card  style={{ flex: 1, justifyContent: 'center',height:100,marginHorizontal:10, backgroundColor:'#616161',}}>
              
                    <TouchableOpacity onPress={() => { navigation.navigate('employerDrawble', { itemId: 'Mason', otherParam: 'anything you want here',  });}}>
                      <Image source={require('./images/graph.png')}
         style = {styles.cardcenterimage}   ></Image>
                      <Text style={{ color: Colors.white, fontWeight: "bold", fontSize: 16, marginTop:15,paddingLeft: 15,textAlign:'center' }}  >पिछले  परिणाम </Text>
                    </TouchableOpacity>
                
          </Card>
          </View>
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
        height:80
      },
      cardcenterimage:{
        marginTop:10,
        padding:10,
        alignItems: 'center',
        justifyContent: 'center',
        width:40,
        borderRadius:10,
        alignSelf:'center',
        height:50
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