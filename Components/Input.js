import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import Iconic from 'react-native-vector-icons/Ionicons'

const Input = (
  {
    placeholder, 
    value, 
    onChangeText, 
    secureTextEntry, 
    caretHidden,
    onPress,
    Icon
  }) => {
    
  return (
    <View style={styles.Container}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        caretHidden={caretHidden}
        style={styles.Input}
      />
      <Iconic name={Icon} size={15} color='#00ADB5' onPress={onPress}/>
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  Container: {
    borderWidth: 1,
    borderColor: '#00ADB5',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    width: "80%",
    marginHorizontal: '10%',
    marginVertical: 5,
    borderRadius: 5
  },
  Input: {
    paddingLeft: 10,
    height: '100%',
    width: '90%',
    marginRight: 10
  }
})