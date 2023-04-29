import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import CustomButton from '../components/CustomButton'
import colors from '../config/colors'
import { db } from '../../firebaseConfig'
import { doc, setDoc, getDoc, where, query, collection, getDocs } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage'

const EditProfile = () => {
    const navigation = useNavigation()
    const route = useRoute()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [password, setPassword] = useState("")

    const [id,setId]=useState("")

    useEffect(()=>{
         getUser();
    })

    const updateUser = async () => {
        const citiesRef = collection(db, "users");
        await setDoc(doc(citiesRef, id), {
            name:name,
            email:email,
            password:password,
            mobile:mobile
        });
        navigation.goBack()
    }

    const getUser= async ()=>{
        const q = query(collection(db, "users"), where("email", "==", route.params.email));

        const querySnapshot = await getDocs(q);
        const user=querySnapshot.docs[0].data();
        setId(querySnapshot.docs[0].ref.id)
        setName(user.name)
        setEmail(user.email)
        setMobile(user.mobile)
        setPassword(user.password)
    }

    return (
        <View style={styles.container}>
            <Header
                title={"Edit Profile"}
                leftIcon={require('../images/back.png')}
                onClickLeftIcon={() => navigation.goBack()} />
            <TextInput
                onChangeText={(text) => setName(text)}
                value={name}
                style={styles.input} placeholder='Enter name' />
            <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input} placeholder='Enter email' />
            <TextInput
                value={mobile}
                onChangeText={(text) => setMobile(text)}
                inputMode='numeric'
                style={styles.input} placeholder='Enter mobile' />
            <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={styles.input} placeholder='Enter password' />
            <CustomButton
                bg={colors.orange}
                color={colors.light}
                title={'Save User'}
                onClick={() => updateUser()}
            />
        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        gap: 20
    },
    input: {
        width: "80%",
        borderWidth: 1,
        borderColor: "gray",
        padding: 10,
        borderRadius: 8
    }
})