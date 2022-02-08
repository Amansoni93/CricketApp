import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')


const CarouselItemQuestion = ({ item }) => {
    return (
        <View style={styles.cardView}>
            <Image style={styles.image} source={{ uri: item.QuestionImage }} />
            <View style={styles.textView}>
                <Image style={styles.itemTitle} source={{ uri: item.Player.Photo }}/>
                {/* <Text> {item.Answer}</Text> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardView: {
        flex: 1,
        width: width - 20,
        height: height / 2,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },

    textView: {
        position: 'absolute',
        bottom: 10,
        margin: 10,
        right: 5,
        height:60,
        width:60,
        borderRadius:5
    },
    image: {
        width: width - 20,
        height: height / 3,
        borderRadius: 10
    },
    itemTitle: {
        position: 'absolute',
      top: 0,
      right: 0,
      width: 40,
      height: 40,
      borderRadius:10,
    },
    itemDescription: {
        color: 'black',
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 5
    }
})

export default CarouselItemQuestion;