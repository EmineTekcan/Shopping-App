import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { useNavigation } from '@react-navigation/native'
import { color } from 'react-native-reanimated'
import colors from '../../config/colors'
import { useDispatch, useSelector } from 'react-redux'
import { addProducts } from '../../redux/slices/ProductsSlice'

const Home = () => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.product.products)
  const navigation = useNavigation()

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getProducts();
    getCategories();
  }, [])

  const getProducts = () => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        setProducts(json)
        json.map((item) => {
          item.quantity = 1
        })
        dispatch(addProducts(json))
      })
  }

  const getCategories = () => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(json => setCategories(json))
  }

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../../images/menu.png')}
        rightIcon={require('../../images/shopping-bag.png')}
        title="Shopping App"
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
        onClickRightIcon={()=>navigation.navigate("Card")}
        isShowCard={true}
      />

      <FlatList
        data={products}
        keyExtractor={(_, index) => index}
        renderItem={({ item, index }) => {
          return (
            <Pressable
              onPress={() => navigation.navigate("ProductDetail", { data: item })}
              style={styles.productItem} >
              <Image style={styles.productImage} source={{ uri: item.image }} />
              <View>
                <Text style={styles.title} >{item.title.length > 30 ? item.title.substr(0, 30) + " ..." : item.title}</Text>
                <Text style={styles.desc} >{item.description.length > 50 ? item.description.substr(0, 50) : item.description}</Text>
                <View style={styles.prices}>
                  <Text style={styles.oldPrice}>{"$" + (item.price * 0.9).toFixed(2)}</Text>
                  <Text style={styles.price} >{"$" + item.price}</Text>
                </View>
              </View>
            </Pressable>
          )
        }}
      />
    </View>
  )
}

export default Home

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    gap: 10,
    alignItems: "center"
  },
  price: {
    fontSize: 20,
    fontStyle: "italic"
  },
  oldPrice: {
    fontSize: 15,
    color: "red",
    fontStyle: "italic",
    textDecorationLine: "line-through"
  },
  categories: {
    width: width * 0.9,
    height: height * 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: width * 0.04
  },
  category: {
    width: width * 0.15,
    borderRadius: 10,
    borderColor: "red",
    borderWidth: 1,
    padding: width * 0.02,
    backgroundColor: "#fff"
  }
})