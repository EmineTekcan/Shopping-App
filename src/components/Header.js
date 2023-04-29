import { Dimensions, StyleSheet, Image, TouchableOpacity, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../config/colors'
import { useSelector } from 'react-redux'

const { width, height } = Dimensions.get("window")

const Header = ({ title, leftIcon, rightIcon, onClickLeftIcon, onClickRightIcon, isShowCard }) => {

    const { data } = useSelector(state => state.card)

    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity style={styles.btn} onPress={onClickLeftIcon} >
                    <Image source={leftIcon} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.title} >{title}</Text>
                <TouchableOpacity style={styles.btn} onPress={onClickRightIcon} >
                    <Image source={rightIcon} style={[styles.icon, { width: 35, height: 35 }]} />
                </TouchableOpacity>
            </View>

            {isShowCard && (<View style={{
                position: "absolute",
                right: width * 0.02,
                top: height * 0.05,
                backgroundColor: "white",
                width: 20,
                height: 20,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
            }} >
                <Text style={{
                    color: "red",
                }}>{data.length}</Text>
            </View>)}
        </>

    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        width: width,
        height: height * 0.115,
        backgroundColor: colors.blue,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    btn: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        margin: width * 0.02,
        marginTop: height * 0.038
    },
    icon: {
        width: 26,
        height: 26,
        tintColor: colors.light
    },
    title: {
        fontSize: 20,
        marginTop: height * 0.02,
        color: colors.light
    }
})