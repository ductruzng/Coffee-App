import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import ImageBGInfor from '../compoments/ImageBGInfor'
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme'
import PaymentFooter from '../compoments/PaymentFooter'
import HeaderBar from '../compoments/HeaderBar'

const DetailsScreen = ({ navigation, route }: any) => {
  const ItemOfIndex = useStore((state: any) =>
    route.params.type == 'Coffee' ? state.CoffeeList : state.BeanList,
  )[route.params.index];
  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList,
  );
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  const [price, setPrice] = useState(ItemOfIndex.prices[0]);
  const [fullDesc, setFullDesc] = useState(false);

  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };

  const BackHandler = () => {
    navigation.pop();
  };

  const addToCarthandler = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    price,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices: [{ ...price, quantity: 1 }],
    });
    calculateCartPrice();
    navigation.navigate('Cart');
  };
  return (
    <View style={styles.ScreenContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <ImageBGInfor
          EnablebackHandler={true}
          Imagelink_portrait={ItemOfIndex.imagelink_square}
          type={ItemOfIndex.type}
          id={ItemOfIndex.id}
          favourite={ItemOfIndex.favourite}
          name={ItemOfIndex.name}
          special_ingredient={ItemOfIndex.special_ingredient}
          ingredients={ItemOfIndex.ingredients}
          average_rating={ItemOfIndex.average_rating}
          ratings_count={ItemOfIndex.ratings_count}
          roasted={ItemOfIndex.roasted}
          BackHandler={BackHandler}
          ToggleFavourite={ToggleFavourite}
        />

        <View style={styles.FooterInfoArea}>
          <Text style={styles.InfoTitle}>Description</Text>
          {fullDesc ? (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc(prev => !prev);
              }}>
              <Text style={styles.DescriptionText}>
                {ItemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc(prev => !prev);
              }}>
              <Text numberOfLines={3} style={styles.DescriptionText}>
                {ItemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
          <Text style={styles.InfoTitle}>Size</Text>
          <View style={styles.SizeOuterContainer}>
            { ItemOfIndex.prices.map((data: any) => (
              <TouchableOpacity
                key={data.size}
                onPress={() => {
                  setPrice(data);
                }}
                style={[
                  styles.SizeBox,
                  {
                    borderColor:
                      data.size == price.size
                        ? COLORS.primaryOrangeHex
                        : COLORS.primaryDarkGreyHex,
                  },
                ]}>
                <Text
                  style={[
                    styles.SizeText,
                    {
                      fontSize:
                        ItemOfIndex.type == 'Bean'
                          ? FONTSIZE.size_14
                          : FONTSIZE.size_16,
                      color:
                        data.size == price.size
                          ? COLORS.primaryOrangeHex
                          : COLORS.secondaryDarkGreyHex,
                    },
                  ]}>
                  {data.size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <PaymentFooter
          price={price}
          buttonTitle="Add to Cart"
          buttonPressHandler={() => {
            addToCarthandler({
              id: ItemOfIndex.id,
              index: ItemOfIndex.index,
              name: ItemOfIndex.name,
              roasted: ItemOfIndex.roasted,
              imagelink_square: ItemOfIndex.imagelink_square,
              special_ingredient: ItemOfIndex.special_ingredient,
              type: ItemOfIndex.type,
              price: price,
            });
          }}
        />
      </ScrollView>
    </View>
  );
};

export default DetailsScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: 'white',

  },
  ScrollViewFlex: {
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  FooterInfoArea: {
    padding: 20,
  },
  InfoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryBlackHex,
    marginBottom: 10
  },
  DescriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex,
    marginBottom: 15
  },
  SizeOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20
  },
  SizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkWhiteHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 10,
    borderWidth: 2

  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,

  }

})