import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../config/colors'
import { useNavigation } from '@react-navigation/native'

const CheckoutLayout = ({totalPrice,items}) => {

        const navigation=useNavigation()
  return (
    <View style={styles.container}>
        <View style={{justifyContent:'center', alignItems:"center"}}>
            <Text>Items: <Text> {items}</Text></Text>
            <Text>Total: <Text style={{fontSize:16, color:colors.pink}}>{totalPrice}</Text></Text>
        </View>
        <TouchableOpacity 
        onPress={()=>navigation.navigate("Checkout")}
        style={styles.btn}>
            <Text style={styles.txt}>Checkout</Text>
        </TouchableOpacity>
    </View>
  )
}

export default CheckoutLayout

const styles = StyleSheet.create({
    container:{
        height:70,
        position:"absolute",
        bottom:0,
        width:Dimensions.get("window").width,
        borderTopWidth:1,
        borderTopColor:"gray",
        justifyContent:"space-around",
        alignItems:"center",
        flexDirection:"row"
    },
    btn:{
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:colors.orange,
        width:Dimensions.get("window").width*0.3,
        padding:10,
        borderRadius:10
    },
    txt:{
        color:colors.light,
        fontSize:16
    }
})