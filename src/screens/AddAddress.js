import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import CustomButton from '../components/CustomButton'
import colors from '../config/colors'
import { addAddress, updateAddress } from '../redux/slices/AddressSlice'
import { useDispatch } from 'react-redux'
import * as Crypto from 'expo-crypto';


const AddAddress = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const route = useRoute()

    const [addressType, setAddressType] = useState(route.params.type == 'edit' ? route.params.data.type : 'Home')
    const [state, setState] = useState(route.params.type == 'edit' ? route.params.data.state : '')
    const [city, setCity] = useState(route.params.type == 'edit' ? route.params.data.city : '')
    const [pincode, setPincode] = useState(route.params.type == 'edit' ? route.params.data.pincode : '')

    return (
        <View style={styles.container}>
            <Header
                title={route.params.type == "edit" ? 'Edit Address' : 'Add New Address'}
                leftIcon={require('../images/back.png')}
                onClickLeftIcon={() => navigation.goBack()}
            />
            <View style={{ gap: 20, marginTop: 20, marginHorizontal: 20 }}>
                <TextInput
                    style={styles.input}
                    placeholder='Enter State'
                    onChangeText={(text) => setState(text)}
                    value={state}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Enter City'
                    onChangeText={(text) => setCity(text)}
                    value={city}
                />
                <TextInput
                    style={styles.input}
                    keyboardType='number-pad'
                    placeholder='Enter Pincode'
                    onChangeText={(text) => setPincode(text)}
                    value={pincode}
                />
                <View style={styles.buttons}>
                    <TouchableOpacity
                        onPress={() => setAddressType("Home")}
                        style={styles.type}
                    >
                        <Image style={{ width: 30, height: 30 }} source={addressType == "Home" ? require('../images/radio-fill.png') : require('../images/radio.png')} />
                        <Text>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setAddressType("Office")}
                        style={styles.type}>
                        <Image style={{ width: 30, height: 30 }} source={addressType == "Office" ? require('../images/radio-fill.png') : require('../images/radio.png')} />
                        <Text>Office</Text>
                    </TouchableOpacity>
                </View>
                <CustomButton
                    bg={colors.orange}
                    color={colors.light}
                    title={"Save Address"}
                    onClick={() => {
                        route.params.type == 'edit' ?
                            (
                                dispatch(updateAddress({
                                    state: state,
                                    city: city,
                                    pincode: pincode,
                                    type: addressType,
                                    id:route.params.data.id
                                }))
                            ) : (dispatch(addAddress({
                                state: state,
                                city: city,
                                pincode: pincode,
                                type: addressType,
                                id: Crypto.randomUUID()
                            })))

                        navigation.goBack()
                    }}
                />
            </View>
        </View>
    )
}

export default AddAddress

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    input: {
        borderWidth: 1,
        borderColor: "gray",
        padding: 8,
        borderRadius: 10
    },
    type: {
        padding: 10,
        borderWidth: 1,
        borderColor: "gray",
        width: "45%",
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 10
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})