import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/Header'
import { TextInput } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const Search = () => {
  const products = useSelector((state) => state.product)

  const [search, setSearch] = useState('')
  const [oldData, setOldData] = useState(products.data)
  const [searchList, setSearchList] = useState(oldData)
  const navigation = useNavigation()

  const filterData = (text) => {
    let newData = oldData.filter((item) => {
      return item.title.toLowerCase().match(text.toLowerCase());
    })
    setSearchList(newData)
  }


  return (
    <View style={styles.container}>
      <Header title="Search Items" />
      <View style={styles.searchView}>
        <View style={styles.input}>
          <TouchableOpacity
            onPress={() => filterData(search)}
          >
            <Image style={styles.icon} source={require('../../images/find.png')} />
          </TouchableOpacity>
          <TextInput
          value={search}
            onChangeText={(text) => {
              setSearch(text);
              filterData(text)
            }}
            placeholder='Search items here ...' />
        </View>
        {
          search !== '' && (<TouchableOpacity onPress={() => {
            setSearch('');
            setSearchList(oldData)
          }}>
            <Image style={styles.icon} source={require('../../images/close.png')} />
          </TouchableOpacity>)
        }
      </View>

      <FlatList
        data={searchList}
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
                  <Text style={styles.oldPrice}>{"$"+(item.price * 0.9).toFixed(2)}</Text>
                  <Text style={styles.price} >{"$"+item.price}</Text>
                </View>
              </View>
            </Pressable>
          )
        }}
      />
    </View>
  )
}

export default Search

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  searchView: {
    width: "90%",
    height: 60,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10
  },
  icon: {
    width: 30,
    height: 30
  },
  input: {
    flexDirection: "row",
    gap: 8,
    width: "75%"
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