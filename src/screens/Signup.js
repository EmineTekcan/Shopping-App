import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import CustomButton from '../components/CustomButton'
import colors from '../config/colors'
import { useNavigation } from '@react-navigation/native'
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig'

const Signup = () => {

    const navigation = useNavigation()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const addUser = async () => {
        if (password == confirmPassword) {
            try {
                const docRef = await addDoc(collection(db, "users"), {
                    name: name,
                    email: email,
                    mobile: mobile,
                    password: password
                });
                console.log("Document written with ID: ", docRef.id);
                navigation.navigate("SignIn")
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder='Enter Name'
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Enter Email'
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Enter Mobile'
                value={mobile}
                onChangeText={(text) => setMobile(text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Enter Password'
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Enter Confirm Password'
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
            />
            <CustomButton
                bg={colors.green}
                title="Sign Up"
                color={colors.light}
                onClick={()=>addUser()}
            />
            <Text style={styles.login}>Already a user? <Text onPress={() => navigation.navigate("SignIn")} style={{ color: colors.green, fontSize: 15, textDecorationLine: "underline" }} >LOGIN</Text></Text>
        </View>
    )
}

export default Signup

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
    },
    input: {
        width: Dimensions.get("window").width * 0.8,
        borderWidth: 1,
        borderColor: "gray",
        padding: 8,
        borderRadius: 10
    },
    login: {
        position: "absolute",
        top:600,
    }
})