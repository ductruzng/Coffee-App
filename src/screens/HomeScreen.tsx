import { Button, Dimensions, Platform, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler'
import HeaderBar from '../compoments/HeaderBar'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import CustomIcon from '../compoments/CustomIcon'
import CoffeeCart from '../compoments/CoffeeCart'
import Toast from 'react-native-simple-toast';
const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const getCoffeeList = (category: string, data: any) => {
  if (category == 'All') {
    return data;
  } else {
    let coffeelist = data.filter((item: any) => item.name == category);
    return coffeelist;
  }
};
const HomeScreen = ({ navigation }: any) => {
  const CoffeeList = useStore((state: any) => state.CoffeeList)
  const BeanList = useStore((state: any) => state.BeanList)

  // const [BeanList, setBeanList] = useState([]);
  const addToCart = useStore((state: any) => state.addToCart)
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice)
  const [catagories, setCategorise] = useState(
    getCategoriesFromData(CoffeeList)
  )
  const [searchText, setSearchText] = useState('')
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: catagories[0],
  })
  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, CoffeeList)
  )
  const tabBarHeight = useBottomTabBarHeight()
  const ListRef: any = useRef<FlatList>()

  const searchCoffee = (search: string) => {
    if (search != '') {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      })
      setCategoryIndex({ index: 0, category: catagories[0] })
      setSortedCoffee(
        [...CoffeeList.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLocaleLowerCase())
        ),
        ])
    }
  }

  const resetSearchCoffee = () => {
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    })
    setCategoryIndex({ index: 0, category: catagories[0] })
    setSortedCoffee([...CoffeeList])
    setSearchText('')

  }
  const CoffeeAddToCart = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    prices
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices
    })
    calculateCartPrice();
    ToastAndroid.showWithGravity(
      `${name} is Added to Cart`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,)
  }
  // React.useEffect(() => {
  //   const getBeanList = async () => {
  //     let url_api= 'http://192.168.1.234:3000/Beans'

  //     fetch(url_api)
  //         .then(res => res.json())
  //         .then( function (res_login) {
  //           setBeanList(res_login)
  //         })

  //   };
  //   getBeanList();
  // }, []);
  return (
    <View style={styles.screenContainer}>
      {/* App Header */}
      <HeaderBar
        navigation={navigation}
        title='Home' />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>

        <Text style={styles.screenTitle}>
          Find the best{'\n'}coffee for you
        </Text>

        {/* Search Input */}

        <View style={styles.inputContainerCompoment}>
          <CustomIcon
            style={styles.inputIcon}
            name='search'
            size={FONTSIZE.size_18}
            color={searchText.length > 0 ?
              COLORS.primaryOrangeHex :
              COLORS.primaryLightGreyHex} />
          <TextInput
            placeholder='Find Your Coffee...'
            value={searchText}
            onChangeText={text => {
              setSearchText(text)
              searchCoffee(text)
            }}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.textInputContainer}
          ></TextInput>
          {searchText.length > 0 ? (
            <TouchableOpacity onPress={() =>
              resetSearchCoffee()}>
              <CustomIcon
                style={styles.inputIcon}
                name='close'
                size={FONTSIZE.size_16}
                color={COLORS.primaryLightGreyHex} />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>

        {/* Category Scroller */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollViewStyle}>
          {catagories.map((data, index) => (
            <View
              key={index.toString()}
              style={styles.categoryScrollViewContainer}>
              <TouchableOpacity
                onPress={() => {
                  ListRef?.current?.scrollToOffset({
                    animated: true,
                    offset: 0
                  })
                  setCategoryIndex({ index: index, category: catagories[index] });
                  setSortedCoffee([...getCoffeeList(catagories[index], CoffeeList)])
                }}
                style={styles.categoryScrollViewItem}>
                <Text style={[
                  styles.categoryText,
                  categoryIndex.index == index ?
                    { color: COLORS.primaryOrangeHex }
                    :
                    {}
                ]}>{data}
                </Text>
                {categoryIndex.index == index ? (
                  <View style={styles.activeCategory} />
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Coffee FlatList */}
        <FlatList
          ref={ListRef}
          horizontal
          ListEmptyComponent={
            <View style={styles.emptyListContainer}>
              <Text style={styles.categoryText}>No Coffee Avaliable</Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          contentContainerStyle={styles.flatListContainer}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return <TouchableOpacity
              onPress={() => navigation.push('Details', {
                index: item.index,
                id: item.id,
                type: item.type,
                imagelink_square: item.imagelink_square,
                prices: item.prices,

              })
              }>
              <CoffeeCart
                id={item.id}
                index={item.index}
                type={item.type}
                roasted={item.roasted}
                imagelink_square={item.imagelink_square}
                name={item.name}
                special_ingredient={item.special_ingredient}
                average_rating={item.average_rating}
                price={item?.prices[2]}
                buttonPressHandler={CoffeeAddToCart}
              />
            </TouchableOpacity>
          }} />

        <Text style={styles.coffeeBeansTitle}>Coffee Beans</Text>
        {/* Beans FlatList */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={BeanList}
          contentContainerStyle={[styles.flatListContainer, { marginBottom: tabBarHeight }]}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return <TouchableOpacity
              onPress={() => {
                navigation.push('Details', {
                  index: item.index,
                  id: item.id,
                  type: item.type
                })
              }
              }>
              <CoffeeCart
                id={item.id}
                index={item.index}
                type={item.type}
                roasted={item.roasted}
                imagelink_square={item.imagelink_square}
                name={item.name}
                special_ingredient={item.special_ingredient}
                average_rating={item.average_rating}
                price={item.prices[2]}
                buttonPressHandler={CoffeeAddToCart}
              />
            </TouchableOpacity>
          }} />
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  scrollViewFlex: {
    flexGrow: 1
  },
  screenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryBlackHex,
    paddingLeft: SPACING.space_30,
  },
  inputContainerCompoment: {
    flexDirection: 'row',
    marginLeft: SPACING.space_30,
    marginRight: SPACING.space_30,
    marginTop: SPACING.space_10,
    marginBottom: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EBF0FF',
    justifyContent: 'center',
  },
  inputIcon: {
    marginHorizontal: SPACING.space_10,

  },
  textInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 2.5,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryDarkBlueHex,


  },
  categoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
  },
  categoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,


  },
  activeCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: BORDERRADIUS.radius_10,

  },
  categoryScrollViewItem: {
    alignItems: 'center'
  },
  categoryText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: '#9098B1',
  },
  flatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,


  },
  coffeeBeansTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryBlackHex,
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,

  },
  emptyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 31.5 * 3.6
  }

})