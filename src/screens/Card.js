import { FlatList, StyleSheet, Text, View, Pressable, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/Header'
import { useNavigation } from '@react-navigation/native'
import { addItemToCart } from '../redux/slices/CartSlice'
import { deleteItemFromCard } from '../redux/slices/CartSlice'
import CheckoutLayout from '../components/CheckoutLayout'

const Card = () => {

  const { data } = useSelector((state) => state.card)

  const [items, setItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [itemQuan, setItemQuan]=useState(items.length)

  const navigation = useNavigation()
  const dispatch = useDispatch()

  useEffect(() => {
    setTotal()
    setItems(data)
  }, [data])

  useLayoutEffect(() => {
    setTotal()
    setItems(data)
  })

  const setTotal = () => {
    let total = 0;
    let quantity=0;
    items.map(item => {
      total += item.price * item.quantity
      quantity +=item.quantity
    })
    setTotalPrice(total.toFixed(2))
    setItemQuan(quantity)
  }
  return (
    <View style={styles.container}>
      <Header
        title="Card Items"
        leftIcon={require('../images/back.png')}
        onClickLeftIcon={() => navigation.goBack()}
      />
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
      {itemQuan < 1 && (
        <Text style={styles.noTxt}>No Items in Cart</Text>
      )}
      {totalPrice == 0 ? null : <CheckoutLayout
        items={itemQuan}
        totalPrice={totalPrice} />}
    </View>
  )
}

export default Card
const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
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
  noTxt:{
    alignSelf:"center",
    position:"absolute",
    top:Dimensions.get("window").height*0.5,
    fontSize:20
  }
})
