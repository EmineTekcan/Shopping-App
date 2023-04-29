import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import Header from '../components/Header'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { addItemToCart, deleteItemFromCard } from '../redux/slices/CartSlice'
import CustomButton from '../components/CustomButton'
import colors from '../config/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Checkout = () => {
  const navigation = useNavigation()

  const { data } = useSelector((state) => state.card)

  const [items, setItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [itemQuan, setItemQuan] = useState(items.length)
  const [type, setType] = useState(0)
  const [address, setAddress] = useState("Please Select Address")

  const isFocused=useIsFocused()

  const getDefaultAddress=async ()=>{
    const address= await AsyncStorage.getItem("DEFAULT_ADDRESS")
    setAddress(address)
  }

  const dispatch = useDispatch()

  useEffect(() => {
    setTotal()
    setItems(data)
  }, [data])

  useLayoutEffect(() => {
    setTotal()
    setItems(data)
  })

  useEffect(()=>{
    getDefaultAddress()
  },[isFocused])

  const setTotal = () => {
    let total = 0;
    let quantity = 0;
    items.map(item => {
      total += item.price * item.quantity
      quantity += item.quantity
    })
    setTotalPrice(total.toFixed(2))
    setItemQuan(quantity)
  }
  return (
    <View style={styles.container}>
      <Header
        onClickLeftIcon={() => navigation.goBack()}
        leftIcon={require('../images/back.png')}
        title="Checkout"
      />
      <View style={{ padding: 10 }}>
        <Text style={styles.title}>Added Items</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(_, index) => index}
        renderItem={({ item, index }) => {
          return (
            <Pressable
              onPress={() => navigation.navigate("ProductDetail", { data: item })}
              style={styles.productItem} >
              <Image style={styles.productImage} source={{ uri: item.image }} />
              <View>
                <Text style={styles.title} >{item.title.length > 30 ? item.title.substr(0, 30) + " ..." : item.title}</Text>
                <Text style={styles.desc} >{item.description.length > 50 ? item.description.substr(0, 50) + " ..." : item.description}</Text>
                <View style={styles.prices}>
                  <Text style={styles.oldPrice}>{"$" + (item.price * 0.9).toFixed(2)}</Text>
                  <Text style={styles.price} >{"$" + item.price}</Text>
                </View>
                <View style={styles.setQuantityStyle}>
                  <TouchableOpacity
                    style={styles.quanBtn}
                    onPress={() => dispatch(deleteItemFromCard(item))}
                  >
                    <Text style={{ fontWeight: "bold" }}>-</Text>
                  </TouchableOpacity>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }} >{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.quanBtn}
                    onPress={() => dispatch(addItemToCart(item))}
                  >
                    <Text style={{ fontWeight: "bold" }}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Pressable>
          )
        }}
      />
      <View style={styles.settings}>
        <View style={styles.totalView}>
          <Text>Total</Text>
          <Text>{"$" + totalPrice}</Text>
        </View>

        <Text style={{ fontSize: 16, fontWeight: "400" }}>Select Payment Mode</Text>

        <TouchableOpacity onPress={() => setType(0)} style={styles.select}>
          <Image style={styles.image} source={type == 0 ? require('../images/radio-fill.png') : require('../images/radio.png')} />
          <Text style={styles.type}>Credit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setType(1)} style={styles.select}>
          <Image style={styles.image} source={type == 1 ? require('../images/radio-fill.png') : require('../images/radio.png')} />
          <Text style={styles.type}>Debit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setType(2)} style={styles.select}>
          <Image style={styles.image} source={type == 2 ? require('../images/radio-fill.png') : require('../images/radio.png')} />
          <Text style={styles.type}>UPI</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setType(3)} style={styles.select}>
          <Image style={styles.image} source={type == 3 ? require('../images/radio-fill.png') : require('../images/radio.png')} />
          <Text style={styles.type}>Cash on Delivery</Text>
        </TouchableOpacity>
        <View style={styles.styleAddress}>
          <Text 
          style={{ fontSize: 16, fontWeight: "400" }}>Address</Text>
          <Text
          onPress={()=>navigation.navigate("Addresses")}
           style={{ fontSize: 16, fontWeight: "400", textDecorationLine:"underline",color:colors.blue }}
           >Edit Address</Text>
        </View>
        <Text style={{ fontSize: 16, fontWeight: "400" }}>
          {address}</Text>
        <CustomButton bg={colors.green} title="Pay & Order" color={colors.light} />
      </View>
    </View>
  )
}

export default Checkout
const { width, height } = Dimensions.get("window")
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
  },
  productItem: {
    width: width,
    height: height * 0.2,
    marginTop: height * 0.01,
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: width * 0.02,
    gap: 10
  },
  productImage: {
    width: "30%",
    height: "90%",
    resizeMode: "contain",
  },
  title: {
    fontSize: 16,
    fontWeight: "600"
  },
  desc: {
    width: "83%"
  },
  prices: {
    flexDirection: "row",
    alignItems: "center"
  },
  price: {
    fontSize: 20,
    fontStyle: "italic",
    marginLeft: 10
  },
  oldPrice: {
    fontSize: 15,
    color: "red",
    fontStyle: "italic",
    textDecorationLine: "line-through"
  },
  setQuantityStyle: {
    flexDirection: "row",
    gap: 8,
    marginTop: 5
  },
  quanBtn: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    width: width * 0.09,
  },
  settings: {
    width: width * 0.9,
    height: height * 0.6,
    marginHorizontal: 20,
    gap: 8
  },
  totalView: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#454545",
    borderBottomWidth: 0.3,
    alignItems: "center",
    height: 50
  },
  select: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 15,
    alignItems: "center"
  },
  image: {
    width: 30,
    height: 30
  },
  type: {
    fontSize: 16
  },
  styleAddress:{
    flexDirection:"row",
    justifyContent:"space-between"
  }
})