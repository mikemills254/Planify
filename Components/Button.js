import { View, Text, Pressable, StyleSheet} from 'react-native'
import React, { useState } from 'react'
import Ionic from "react-native-vector-icons/Ionicons"


const Button = ({onPress, text, type = 'PRIMARY', Icon, bgColor, fgColor, clicked}) => {
  return (
    <Pressable 
      clicked = {clicked}
      onPress={onPress} 
      style={
        [
          styles.CustomButton, 
          styles[`CustomButton_${type}`],
          bgColor ? {backgroundColor: bgColor} : {}
          ]}>
      <Text style={
        [
          styles.text,
          styles[`text_${type}`],
          fgColor ? {color: fgColor} : {}
        ]}>
          {text}
          <Ionic name={Icon} size={20}/>
      </Text>
      
    </Pressable>
  )
}

const styles = StyleSheet.create({
    CustomButton: {
        backgroundColor: '#00ADB5',
        width: "80%",
        padding: 15,
        marginVertical: 5,
        alignItems: "center",
        borderRadius: 10,
        marginHorizontal: "10%",
      },
      text: {
        fontWeight: "bold",
        color: "white",
        alignItems: 'center',
        justifyContent: 'center',
      },
      CustomButton_PRIMARY: {
        backgroundColor: '#00ADB5',
      },
      CustomButton_TERTIARY: {
        backgroundColor: "white",
      },
      CustomButton_SECONDARY: {
        width: "47%",
        marginHorizontal: 10,
      },
      text_TERTIARY: {
        color: "gray"
      },
      text_SECONDARY: {
        color: "black"
      },
})

export default Button