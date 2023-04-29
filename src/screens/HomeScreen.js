import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Image, KeyboardAvoidingView, Keyboard } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Header from '../components/Header'
import Home from './tabs/Home'
import Search from './tabs/Search'
import Wishlist from './tabs/Wishlist'
import Notification from './tabs/Notification'
import User from './tabs/User'

const { width, height } = Dimensions.get("window")

const HomeScreen = () => {

    const [selectedTab, setSelectedTab] = useState(0)
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useLayoutEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); 
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);
    return (
        <View style={styles.container}>
            {selectedTab == 0 ? <Home /> : selectedTab == 1 ? <Search /> : selectedTab == 2 ? <Wishlist /> : selectedTab == 3 ? <Notification /> : <User />}
            {!isKeyboardVisible && (<KeyboardAvoidingView
                style={styles.bottomView}>

                <TouchableOpacity style={styles.bottomTab} onPress={() => setSelectedTab(0)} >
                    <Image style={styles.icon} source={selectedTab == 0 ? require('../images/home-fill.png') : require('../images/home.png')} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.bottomTab} onPress={() => setSelectedTab(1)}>
                    <Image style={styles.icon} source={require('../images/find.png')} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.bottomTab} onPress={() => setSelectedTab(2)}>
                    <Image style={styles.icon} source={selectedTab == 2 ? require('../images/heart-fill.png') : require('../images/heart.png')} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.bottomTab} onPress={() => setSelectedTab(4)}>
                    <Image style={styles.icon} source={selectedTab == 4 ? require('../images/user-fill.png') : require('../images/user.png')} />
                </TouchableOpacity>

            </KeyboardAvoidingView>)}
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bottomView: {
        position: "absolute",
        bottom: 0,
        width: width,
        height: height * 0.1,
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    bottomTab: {
        height: "100%",
        width: "20%",
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        width: 25,
        height: 25
    }
})