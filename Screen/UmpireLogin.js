import React, { useEffect,useState } from 'react';
import {
  Button,
  StyleSheet,
  View,SafeAreaView,
  ImageBackground,
  Image,Text,TouchableOpacity,TextInput,Alert 
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from './helper/colors';
import axios from 'axios';
import GLOBALS from './helper/global'; 
const UmpireLogin =({ navigation })=> {
    const [data, setData] = useState({
        matchid: '',
        umpireid:'',
        otp: '',
        users: [],
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidOTP: true,
    });
    
    const textMatchInputChange = (value) => {
        if (value.lenght == 10) {
            setData({
                ...data,
                matchid: value,
            });
        } else {
            setData({
                ...data,
                matchid: value,
            });
        }
    }
    const textUmpireInputChange = (value) => {
        if (value.lenght == 10) {
            setData({
                ...data,
                umpireid: value,
            });
        } else {
            setData({
                ...data,
                umpireid: value,
            });
        }
    }
    const textOtpChange = (value) => {
        if (value.lenght == 10) {
            setData({
                ...data,
                otp: value,
            });
        } else {
            setData({
                ...data,
                otp: value,
            });
        }
    }
    const OtpHandle = (match_id, umpire_id,otp) =>
    {
        axios.get(GLOBALS.BASE_URL +'GetMatchByID'+'/'+GLOBALS.API_USERID+'/'+GLOBALS.API_KEY+'/'+match_id)
          .then(function (response) {
                    if(response.data.ResponseCode =='0'){

                        GLOBALS.matchDetails = response.data;
                        navigation.navigate('PlayerHome');
                        
                    } else if(response.data.ResponseCode =='1'){
                        Alert.alert(
                            response.data.ResponseMessageEnglish,
                            response.data.ResponseMessageHindi,
                            [
                              {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                              },
                              { text: "OK", onPress: () => console.log("OK Pressed") }
                            ]
                        );
                    }
                    
                   
                })
                .catch(function (error) {
                    console.log(error);
                });
    }
    return (
    <SafeAreaView style={{ flex: 1,backgroundColor: Colors.white }}>
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome!</Text>
            </View>
            <View style={styles.footer}>
                <Text style={styles.text_footer}>Login</Text>
                <View style={{ marginTop: 20 }}>
               

                    <View style={styles.inputContainer}>
                        <Icon name="send-to-mobile" size={20} color={Colors.light} style={styles.inputiCon}></Icon>
                        <TextInput placeholder="Enter  Match ID" keyboardType = 'numeric' maxLength={10} style={styles.input} onChangeText={(value) => textMatchInputChange(value)} ></TextInput>
                        {data.check_textInputChange ?
                            <Animatable.View animation="bounceIn" />
                            : null
                        }
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon name="send-to-mobile" size={20} color={Colors.light} style={styles.inputiCon}></Icon>
                        <TextInput placeholder="Enter  Umpire ID" keyboardType = 'numeric' maxLength={10} style={styles.input} onChangeText={(value) => textUmpireInputChange(value)} ></TextInput>
                        {data.check_textInputChange ?
                            <Animatable.View animation="bounceIn" />
                            : null
                        }
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon name="send-to-mobile" size={20} color={Colors.light} style={styles.inputiCon}></Icon>
                        <TextInput placeholder="OTP" keyboardType = 'numeric' maxLength={10} style={styles.input} onChangeText={(value) => textOtpChange(value)} ></TextInput>
                        {data.check_textInputChange ?
                            <Animatable.View animation="bounceIn" />
                            : null
                        }
                    </View>
                    
                   
                  <View style={{ marginVertical: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                       
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={styles.btnSecondary}>
                            <TouchableOpacity onPress={() => OtpHandle(data.matchid,data.umpireid,data.otp)}>
                                <Text style={{ fontWeight: "bold", marginHorizontal: 5, alignItems: 'stretch' }} >
                                    Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

    </View>
    </View>
    </View>
    
    </ScrollView>
    </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    inputContainer: {
        flexDirection: "row",
        marginTop: 20
    },
    inputiCon: {
        marginTop: 15,
        position: 'absolute',

    },
    line: {
        height: 1,
        width: 30,
        backgroundColor: Colors.light
    },
    input: {
        color: Colors.light,
        paddingLeft: 30,
        borderBottomWidth: 1,
        flex: 1,
        fontSize: 18,

    },
    btnPrimary: {
        backgroundColor: Colors.primary,
        height: 50,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    btnSecondary: {
        height: 50,
        borderWidth: 1,
        borderColor: Colors.light,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        flexDirection: 'row',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
    }, errormsg: {
        color: 'red'
    }

})
export default  UmpireLogin;