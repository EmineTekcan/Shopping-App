import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import colors from '../config/colors'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { deleteAddress, updateAddress } from '../redux/slices/AddressSlice'

const Addresses = () => {
  const navigation = useNavigation()
  const { data } = useSelector(state => state.address)
  const isFocused = useIsFocused()
  const dispatch = useDispatch()

  const defaultAddress = async (item) => {
    try {
      await AsyncStorage.setItem(
        'DEFAULT_ADDRESS',
        ' ' + item.state + "," + item.city + "," + item.pincode + "," + item.type + "," + item.id
      );
    } catch (error) {
      console.log(error)
    }
    navigation.goBack()
  }

  const deleteItem = async()=>{
    await AsyncStorage.removeItem("DEFAULT_ADDRESS")
  }
  console.log(data)

  return (
    <View style={styles.container}>
      <Header
        title={"Addresses"}
        leftIcon={require('../images/back.png')}
        onClickLeftIcon={() => navigation.goBack()}
      />
      <FlatList
        data={data}
        keyExtractor={(_, index) => index}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => defaultAddress(item)}
              style={styles.address}>
              <View style={styles.left}>
                <Text style={styles.txt}>State: {item.state}</Text>
                <Text style={styles.txt}>City: {item.city}</Text>
                <Text style={styles.txt}>Pincode: {item.pincode}</Text>
              </View>
              <View style={{ width: "60%", alignItems: "flex-end" }}>
                <Text style={styles.right}>{item.type}</Text>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <TouchableOpacity onPress={() => navigation.navigate("AddAddress", {
                    type: "edit",
                    data: item
                  })}>
                    <Image style={{ width: 30, height: 30 }} source={require('../images/edit-tool.png')} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    dispatch(deleteAddress(item.id))
                   deleteItem()
                  }} >
                    <Image style={{ width: 30, height: 30 }} source={require('../images/trash.png')} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )
        }}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("AddAddress",{type:"add"})}
        style={styles.addBtn}>
        <Text style={{ fontSize: 35, color: colors.light }}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Addresses

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  addBtn: {
    width: 50,
    height: 50,
    backgroundColor: colors.orange,
    position: "absolute",
    right: 20,
    bottom: 20,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  address: {
    margin: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  right: {
    backgroundColor: colors.green,
    width: '46%',
    color: colors.light,
    fontSize: 15,
    borderRadius: 6,
    marginBottom: 6,
    paddingHorizontal: 25
  },
  txt: {
    fontSize: 17
  }
})