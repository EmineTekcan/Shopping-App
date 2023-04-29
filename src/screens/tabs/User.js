import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Header from '../../components/Header'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import colors from '../../config/colors'
import CustomButton from '../../components/CustomButton'


const User = () => {

  const navigation = useNavigation()

  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  console.log(userName)


  useLayoutEffect(() => {
    getUser()
  })

  const getUser = async () => {

    let name = await AsyncStorage.getItem("USER_NAME")
    let email = await AsyncStorage.getItem("USER_EMAIL")
    
    if (name == null && email == null) {
      setUserName("")
      setUserEmail("")
    }
    setUserName(name)
    setUserEmail(email)

  }

  const logOut = async () => {
    AsyncStorage.removeItem('USER_NAME')
    AsyncStorage.removeItem('USER_EMAIL')
    setUserName(null)
    setUserEmail(null)
    navigation.navigate("SignIn")
  }
  return (
    <View style={styles.container}>
      <Header title="Profile" />
      <Image style={styles.image} source={require('../../images/profile.png')} />
      <Text style={styles.name}>{userName}</Text>
      <Text style={styles.email}>{userEmail}</Text>
      {userName === null ? (
        <View>
          <Text style={{
            alignSelf: "center",
            fontSize: 25
          }}>Please Sign In</Text>
          <CustomButton bg={colors.green} title={"Sign In"} color={colors.light} onClick={()=>navigation.navigate("SignIn")}/>
        </View>
      ) : (<View>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfile", {
            email: userEmail
          })}
          style={styles.btn}>
          <Text style={styles.btnText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Addresses")}
          style={styles.btn}>
          <Text style={styles.btnText} >Address</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => logOut()} style={styles.btn}>
          <Text style={styles.btnText}>Log Out</Text>
        </TouchableOpacity>
      </View>)}
    </View>
  )
}

export default User

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 20
  },
  name: {
    alignSelf: "center",
    marginTop: 10,
    fontSize: 20,
    fontWeight: "600"
  },
  email: {
    fontSize: 16,
    alignSelf: "center"
  },
  btn: {
    alignSelf: "center",
    marginTop: 20,
    width: "80%",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    justifyContent: "center"
  },
  btnText: {
    fontSize: 18,
    color: "#212A3E"
  }
})