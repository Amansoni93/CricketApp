import React, { useEffect,useState } from 'react';
import {
  Button,
  StyleSheet,
  View,
  ImageBackground,ScrollView,
  Image,Text,TouchableOpacity,StatusBar
} from 'react-native';
import { Card } from 'react-native-paper';
import Colors from './helper/colors';

import Icon from 'react-native-vector-icons/MaterialIcons';
 
const colors = {
  themeColor:"#4263ec",
  white:"#fff",
  background:'#f4f6fc',
  greynish:'#a4a4a4',
  tint:'#2b49c3'

}
const tasks =[{
  id:1,
  task:"चलाये",
  icon:'military-tech',
  theme:'#008b8b',
  stamp:'Todat 8 pm',
  

},
{
  id:2,
  task:"अंपायर",
  icon:'emoji-people',
  theme:'#37003c',
  stamp:'Todat 8 pm',
  
},
{
  id:3,
  task:"दर्शक",
  icon:'people',
  theme:'#fed132',
  stamp:'Todat 8 pm',

},
{
  id:4,
  task:"पिछले  परिणाम",
  icon:'trending-up',
  theme:'#008b8b',
  stamp:'Todat 8 pm',
  
}];
const Task = ({task,icon,theme,stamp,openpage}) => {
   return (
    <TouchableOpacity onPress={() => { openpage}}>
                        
     <View style={{backgroundColor:colors.white,flexDirection:'row',marginHorizontal:16,marginVertical:4,borderRadius:20,paddingVertical:20,paddingHorizontal:14,alignItems:'center',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <Icon name={icon}  size={30} style={{color:theme,marginRight:5}} />
        {/* <Image source={icon}
           style={colors.theme} ></Image> */}
        <View >
          <Text style={{fontSize:16}}>{task}</Text>
          <Text style={{color:colors.greynish}}>{stamp}</Text>
        </View>
        </View>
     </View>
     </TouchableOpacity>
   );
}

const  HomePage = ({ navigation }) =>  {
    return (
    
      <View style={{flex:1,backgroundColor:colors.themeColor}}> 
           <StatusBar barStyle="light-content" backgroundColor={colors.themeColor}/>
           <View style={{backgroundColor:colors.themeColor}}>
             <View style={{padding:16,flexDirection:'row',justifyContent:'space-between'}}>
             <Icon name="dehaze" backgroundColor="#3b5998" size={30} style={{color:colors.white}} />
             <View style={{padding:16,}}>
              <Text style={{color:Colors.white,fontSize:30}}>{"C.A.A.T"}</Text> 
              </View>
             <View style={{flexDirection:'row'}}>
             <Icon name="notifications-none" backgroundColor="#3b5998" size={30} style={{color:colors.white}} />
             <Icon name="account-circle" backgroundColor="#3b5998" size={30} style={{color:colors.white}} />
             
             </View>
             </View>
             {/* <View style={{padding:16,}}>
              <Text style={{color:Colors.white,fontSize:30}}>{"Hello,\n C.A.A.T"}</Text> 
              <View style={{paddingHorizontal:16,paddingVertical:6,flexDirection:'row',justifyContent:'space-between',backgroundColor:colors.tint,borderRadius:20,marginVertical:20,alignItems:'center' }}>
              <Icon name="search" backgroundColor="#3b5998" size={30} style={{color:colors.white}}/>
              <View style={{flexDirection:'row'}}>
             
              <Icon name="tune" backgroundColor="#3b5998" size={30} style={{color:colors.white}} />
              </View>
              </View>
             </View> */}

</View>
{/* <View style={{padding:20,flexDirection:'row',justifyContent:'flex-end',backgroundColor:colors.background,alignItems:'center'}}>
  <Text style={{fontSize:24}} >Tasks</Text>
  <Icon name="add" backgroundColor={colors.background} size={30} style={styles.inputiCon,{justifyContent:'flex-end',borderRadius:20,marginHorizontal:8}} />
</View> */}
<ScrollView style={{backgroundColor:colors.background}} >
<TouchableOpacity onPress={() => { navigation.navigate('UmpireLogin', { itemId: 'Mason', otherParam: 'anything you want here',  });}}>
                        
                        <View style={{backgroundColor:colors.white,flexDirection:'row',marginHorizontal:16,marginVertical:4,borderRadius:20,paddingVertical:20,paddingHorizontal:14,alignItems:'center',justifyContent:'space-between'}}>
                           <View style={{flexDirection:'row',alignItems:'center'}}>
                           <Icon name='military-tech'  size={30} style={{color:'#008b8b',marginRight:5}} />
                           {/* <Image source={icon}
                              style={colors.theme} ></Image> */}
                           <View >
                             <Text style={{fontSize:16}}>चलाये</Text>
                           
                           </View>
                           </View>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate('UmpireLogin', { itemId: 'Tally', otherParam: 'anything you want here',  });}}>
                        
                        <View style={{backgroundColor:colors.white,flexDirection:'row',marginHorizontal:16,marginVertical:4,borderRadius:20,paddingVertical:20,paddingHorizontal:14,alignItems:'center',justifyContent:'space-between'}}>
                           <View style={{flexDirection:'row',alignItems:'center'}}>
                           <Icon name='emoji-people'  size={30} style={{color:'#37003c',marginRight:5}} />
                           {/* <Image source={icon}
                              style={colors.theme} ></Image> */}
                           <View >
                             <Text style={{fontSize:16}}>अंपायर</Text>
                            
                           </View>
                           </View>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { openpage}}>
                        
                        <View style={{backgroundColor:colors.white,flexDirection:'row',marginHorizontal:16,marginVertical:4,borderRadius:20,paddingVertical:20,paddingHorizontal:14,alignItems:'center',justifyContent:'space-between'}}>
                           <View style={{flexDirection:'row',alignItems:'center'}}>
                           <Icon name='people'  size={30} style={{color:'#fed132',marginRight:5}} />
                           {/* <Image source={icon}
                              style={colors.theme} ></Image> */}
                           <View >
                             <Text style={{fontSize:16}}>दर्शक</Text>
                            
                           </View>
                           </View>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { openpage}}>
                        
                        <View style={{backgroundColor:colors.white,flexDirection:'row',marginHorizontal:16,marginVertical:4,borderRadius:20,paddingVertical:20,paddingHorizontal:14,alignItems:'center',justifyContent:'space-between'}}>
                           <View style={{flexDirection:'row',alignItems:'center'}}>
                           <Icon name='trending-up'  size={30} style={{color:'#008b8b',marginRight:5}} />
                           {/* <Image source={icon}
                              style={colors.theme} ></Image> */}
                           <View >
                             <Text style={{fontSize:16}}>पिछले  परिणाम</Text>
                             
                           </View>
                           </View>
                        </View>
                        </TouchableOpacity>
</ScrollView>

       
  
         
           
        
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
        height:40
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
        marginBottom: 10,
        padding: 20,
        color:"#0030a1",
        backgroundColor:"#0030a1"
      },
      space: {
        width: 10, 
        height: 10,
      },
    
    });
    
    export default HomePage;