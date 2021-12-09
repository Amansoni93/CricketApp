import React from 'react';
import {Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Image,
    Touchable,
    Dimensions}  from 'react-native';
import LinearGradient from  'react-native-linear-gradient'
import Icon  from 'react-native-vector-icons/MaterialIcons'
import * as Animatable from 'react-native-animatable';
const SplashScreen = ({navigation}) =>{
    return(
        <View style={styles.container}>
            <View style={styles.header}>
           <Animatable.Image 
           animation="bounceIn"
           source={require('./images/splash.png')} style= {styles.logo} resizeMode="stretch"/>
           
          </View>
          <Animatable.View style={styles.footer}
          animation="fadeInUpBig">
          <Text >Stay connected with everyone !</Text>
          <Text >Sign in with everyone !</Text>
          <View style={styles.button}>
          <TouchableOpacity onPress={()=>navigation.navigate('HomePage')}>
              <LinearGradient colors={['#08d4c4','#01ab9d']} style={styles.signin}><Text style={styles.textSign}>Get Start</Text>
              <Icon name='navigate-next' color='#fff' size={20}>
                  </Icon></LinearGradient>
          </TouchableOpacity>
          </View>
          </Animatable.View>
        </View>
    );
};
export  default SplashScreen;
const {height} = Dimensions.get("screen");
const height_logo  =  height * 0.28;

const styles =  StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#009387',
        
    },
    header:{
       flex:2,
       justifyContent:'center',
       alignItems:'center'

    },
    footer: {
        flex:1,
        backgroundColor:'#fff',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingVertical:50,
        paddingHorizontal:30,
    },
    logo:{
        alignItems: 'center',
        justifyContent: 'center',
        width:height_logo,
        alignSelf:'center',
        height:height_logo,
    },
    button:{
        alignItems:'center',
        marginTop:50
    },
    signin:{
        width:220,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
    textSign:{
         fontSize:18,
         fontWeight:'bold'
    }
});