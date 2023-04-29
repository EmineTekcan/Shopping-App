import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CustomButton = ({ bg, title, onClick, color }) => {
    return (
        <Pressable
            style={[styles.container,{backgroundColor:bg}]}
            onPress={onClick}
        >
            <Text style={{ color: color, fontSize:20, fontWeight:"500" }}>{title}</Text>
        </Pressable>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width * 0.6,
        alignSelf: "center",
        height: 50,
        justifyContent:"center",
        alignItems:"center",
        marginTop:30,
        borderRadius:8
    },
})