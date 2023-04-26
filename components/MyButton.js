import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function MyButton({onPress, text, bgColor, fgColor}) {
    const func = () => onPress()

    return (
        <View style={{margin: 5}}>
            <TouchableOpacity style={[styles.button, {backgroundColor: bgColor}]} onPress={func}>
                <Text style={{color: fgColor, fontWeight: 'bold', fontSize: 14}}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderWidth: 0,
      borderRadius: 10,
    },
  });