import { Alert, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import CustomButton from '../components/CustomButton'
import colors from '../config/colors'
import { useDispatch } from 'react-redux'
import { addItemToWishlist } from '../redux/slices/WishlistSlice'
import { addItemToCart } from '../redux/slices/CartSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AskForLoginModal from '../components/AskForLoginModal'
import { collection, query, where, getDoc, getDocs } from "firebase/firestore";
import { db } from '../../firebaseConfig'

const ProductDetail = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false)
    const [user, setUser]=useState(false)

    useEffect(()=>{
        getData()
    })

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('USER_NAME')
            console.log(value)
            if (value !== null) {
                console.log("true")
                setUser(true)
            } else {
                setUser(false)
            }
        } catch (e) {
            console.log(e)
        }
    }



    return (
        <View style={styles.container} >
            <Header
                leftIcon={require('../images/back.png')}
                onClickLeftIcon={() => navigation.goBack()}
                onClickRightIcon={() => navigation.navigate("Card")}
                rightIcon={require('../images/shopping-bag.png')}
                title="Product Detail"
                isShowCard={true}
            />

            <View style={styles.contain}>
                <Image style={styles.image} source={{ uri: route.params.data.image }} />
                <Text style={styles.title} >{route.params.data.title}</Text>
                <Text style={styles.desc} >{route.params.data.description}</Text>
                <View style={styles.prices}>
                    <Text style={styles.oldPrice} >{"$" + (route.params.data.price * 0.9).toFixed(2)}</Text>
                    <Text style={styles.price} >{"$" + route.params.data.price}</Text>
                </View>
                <CustomButton
                    bg={colors.orange}
                    title="Add To Cart"
                    color={colors.light}
                    onClick={() => {
                        if (user) {
                            dispatch(addItemToCart(route.params.data))
                        } else {
                            console.log(getData())
                            setModalVisible(true)
                        }
                    }
                    }
                />
            </View>
            <TouchableOpacity
                onPress={() => {
                    if (user) {
                        dispatch(addItemToWishlist(route.params.data))
                    } else {
                        setModalVisible(true)
                    }
                }}
                style={styles.wishlistBtn} >
                <Image style={styles.wishlistImage} source={require('../images/heart-fill.png')} />
            </TouchableOpacity>

            <AskForLoginModal
                modalVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                onClickSignIn={() => {
                    setModalVisible(false)
                    navigation.navigate("SignIn")
                }}
                onClickSignUp={() => {
                    setModalVisible(false)
                    navigation.navigate("SignUp")
                }}
            />
        </View>
    )
}

export default ProductDetail

const { height, width } = Dimensions.get("window")

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    image: {
        width: "70%",
        height: height * 0.3,
        resizeMode: "center",
        alignSelf: "center",
    },
    contain: {
        marginHorizontal: width * 0.02,
        marginVertical: width * 0.02,
    },
    title: {
        fontSize: 18,
        marginTop: 10,
        fontWeight: 600
    },
    desc: {
        fontSize: 16,
        fontWeight: "300"
    },
    prices: {
        flexDirection: "row",
        gap: 10,
        marginTop: 20
    },
    oldPrice: {
        color: "red",
        fontSize: 24,
        textDecorationLine: "line-through"
    },
    price: {
        fontSize: 18
    },
    wishlistBtn: {
        position: "absolute",
        right: width * 0.06,
        top: height * 0.13,
        padding: 10,
        borderRadius: height * 0.26,
        backgroundColor: colors.pink
    },
    wishlistImage: {
        height: 25,
        width: 24,
        tintColor: "white"
    }
})