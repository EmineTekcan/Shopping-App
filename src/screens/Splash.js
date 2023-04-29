import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../config/colors'
import { useNavigation } from '@react-navigation/native'

const Splash = () => {
    const navigation = useNavigation()

    setTimeout(function () {
        navigation.navigate("Main")
    }, 1500);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>WELCOME</Text>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.blue,
        justifyContent: "center"
    },
    title: {
        alignSelf: "center",
        fontSize: 40,
        color: colors.light
    }
})