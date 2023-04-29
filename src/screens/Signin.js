import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../components/CustomButton'
import colors from '../config/colors'
import { useNavigation } from '@react-navigation/native'
import { collection, query, where, getDoc, getDocs } from "firebase/firestore";
import { db } from '../../firebaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Signin = () => {
    const navigation = useNavigation()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const [user, setUser] = useState()

    const login = async () => {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email), where("password", "==", password));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.docs[0].data())
        setUser(querySnapshot.docs[0].data())

        await AsyncStorage.setItem(
            'USER_NAME',
            querySnapshot.docs[0].data().name,
        );


        await AsyncStorage.setItem(
            'USER_EMAIL',
            querySnapshot.docs[0].data().email,
        );
    }


    useEffect(() => {
        if (user != null) {
            navigation.navigate("Main")
        }
    }, [user])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
            <TextInput
                onChangeText={(text) => setEmail(text)}
                placeholder='Enter Email'
                style={styles.input} />
            <TextInput
                onChangeText={(text) => setPassword(text)}
                placeholder='Enter Password'
                style={styles.input} />
            <CustomButton
                onClick={() => login()}
                bg={colors.orange}
                color={colors.light}
                title="Sign In" />
            <TouchableOpacity style={styles.signup} onPress={() => navigation.navigate("SignUp")}>
                <Text>Dont have an account? <Text style={{ color: colors.orange, fontSize: 15, textDecorationLine: "underline" }} >SIGN UP</Text></Text>
            </TouchableOpacity>
        </View>
    )
}

export default Signin

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        gap: 20
    },
    title: {
        marginTop: 70,
        fontSize: 40,
        marginBottom: 30
    },
    input: {
        width: Dimensions.get("window").width * 0.8,
        borderWidth: 1,
        borderColor: "gray",
        padding: 8,
        borderRadius: 10
    },
    signup: {
        position: "absolute",
        top: 600
    }
})