import { FlatList, StyleSheet, Text, View, Pressable, Image, Dimensions } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/Header'

const Wishlist = () => {

  const { data } = useSelector((state) => state.wishlist)

  return (
    <View style={styles.container}>
      <Header title="Wishlist Items" />
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

export default Wishlist
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
})