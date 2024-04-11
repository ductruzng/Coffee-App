import { Button, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { ScrollView } from 'react-native-gesture-handler'
import HeaderBar from '../compoments/HeaderBar'
import EmptyListAnimation from '../compoments/EmptyListAnimation'
import PaymentScreen from './PaymentScreen'
import PaymentFooter from '../compoments/PaymentFooter'
import CartItem from '../compoments/CartItem'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import CustomIcon from '../compoments/CustomIcon'
import LinearGradient from 'react-native-linear-gradient'


const CartScreen = ({ navigation, route }: any) => {
  const CartList = useStore((state: any) => state.CartList);
  const CartPrice = useStore((state: any) => state.CartPrice);
  const incrementCartItemQuantity = useStore(
    (state: any) => state.incrementCartItemQuantity,
  );
  const decrementCartItemQuantity = useStore(
    (state: any) => state.decrementCartItemQuantity,
  );
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const tabBarHeight = useBottomTabBarHeight();

  const buttonPressHandler = () => {
    navigation.push('Payment', { amount: CartPrice });
  };

  const incrementCartItemQuantityHandler = (id: string, size: string) => {
    incrementCartItemQuantity(id, size);
    calculateCartPrice();
  };

  const decrementCartItemQuantityHandler = (id: string, size: string) => {
    decrementCartItemQuantity(id, size);
    calculateCartPrice();
  };
  let ID = '';
  return (
    <View style={[styles.ScreenContainer, { marginBottom: 13 }]}>
      <HeaderBar
      navigation={navigation} title="Cart" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View
          style={[styles.ScrollViewInnerView]}>
          <View style={styles.ItemContainer}>

            {CartList.length == 0 ? (
              <EmptyListAnimation title={'Cart is Empty'} />
            ) : (
              <View style={styles.ListItemContainer}>
                {CartList.map((data: any) => (
                  <TouchableOpacity
                    onPress={(e) => {
                      e.stopPropagation()
                      navigation.push('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data.id}>
                    <View>
                      {data.prices.length != 1 ? (
                        <LinearGradient
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          colors={[COLORS.primaryDarkWhiteHex, COLORS.primaryDarkWhiteHex]}
                          style={styles.CartItemLinearGradient}>
                          <View style={styles.CartItemRow}>
                            <Image source={data.imagelink_square} style={styles.CartItemImage} />
                            <View style={styles.CartItemInfo}>
                              <View>
                                <Text style={styles.CartItemTitle}>{data.name}</Text>
                                <Text style={styles.CartItemSubtitle}>
                                  {data.special_ingredient}
                                </Text>
                              </View>
                              <View style={styles.CartItemRoastedContainer}>
                                <Text style={styles.CartItemRoastedText}>{data.roasted}</Text>
                              </View>
                            </View>
                          </View>
                          {
                          data.prices.map((dataa: any, index: any) => (
                            <View
                              key={index.toString()}
                              style={styles.CartItemSizeRowContainer}>
                              <View style={styles.CartItemSizeValueContainer}>
                                <View style={styles.SizeBox}>
                                  <Text
                                    style={[
                                      styles.SizeText,
                                      {
                                        fontSize:
                                          dataa.type == 'Bean' ? FONTSIZE.size_12 : FONTSIZE.size_16,
                                      },
                                    ]}>
                                    {dataa.size}
                                  </Text>
                                </View>
                                <Text style={styles.SizeCurrency}>
                                  {data.currency}
                                  <Text style={styles.SizePrice}> {data.price}</Text>
                                </Text>
                              </View>
                              <View style={styles.CartItemSizeValueContainer}>
                                <TouchableOpacity
                                  style={styles.CartItemIcon}
                                  onPress={() => {
                                    decrementCartItemQuantityHandler(data.id, dataa.size);
                                  }}>
                                  <CustomIcon
                                    name="minus"
                                    color={COLORS.primaryWhiteHex}
                                    size={FONTSIZE.size_10}
                                  />
                                </TouchableOpacity>
                                <View style={styles.CartItemQuantityContainer}>
                                  <Text style={styles.CartItemQuantityText}>
                                    {dataa.quantity}
                                  </Text>
                                </View>
                                <TouchableOpacity
                                  style={styles.CartItemIcon}
                                  onPress={() => {
                                    incrementCartItemQuantityHandler(data.id, dataa.size);
                                  }}>
                                  <CustomIcon
                                    name="add"
                                    color={COLORS.primaryWhiteHex}
                                    size={FONTSIZE.size_10}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          ))}
                        </LinearGradient>
                      ) : (
                        <LinearGradient
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          colors={[COLORS.primaryDarkWhiteHex, COLORS.primaryDarkWhiteHex]}
                          style={styles.CartItemSingleLinearGradient}>
                          <View>
                            <Image
                              source={data.imagelink_square}
                              style={styles.CartItemSingleImage}
                            />
                          </View>
                          <View style={styles.CartItemSingleInfoContainer}>
                            <View>
                              <Text style={styles.CartItemTitle}>{data.name}</Text>
                              <Text style={styles.CartItemSubtitle}>{data.special_ingredient}</Text>
                            </View>
                            <View style={styles.CartItemSingleSizeValueContainer}>
                              <View style={styles.SizeBox}>
                                <Text
                                  style={[
                                    styles.SizeText,
                                    {
                                      fontSize:
                                        data.type == 'Bean' ? FONTSIZE.size_12 : FONTSIZE.size_16,
                                    },
                                  ]}>
                                  {data.prices[0].size}
                                </Text>
                              </View>
                              <Text style={styles.SizeCurrency}>
                                {data.prices[0].currency}
                                <Text style={styles.SizePrice}> {data.prices[0].price}</Text>
                              </Text>
                            </View>
                            <View style={styles.CartItemSingleQuantityContainer}>
                              <TouchableOpacity
                                style={styles.CartItemIcon}
                                onPress={() => {
                                  decrementCartItemQuantityHandler(data.id, data.prices[0].size);
                                }}>
                                <CustomIcon
                                  name="minus"
                                  color={COLORS.primaryWhiteHex}
                                  size={FONTSIZE.size_10}
                                />
                              </TouchableOpacity>
                              <View style={styles.CartItemQuantityContainer}>
                                <Text style={styles.CartItemQuantityText}>
                                  {data.prices[0].quantity}
                                </Text>
                              </View>
                              <TouchableOpacity
                                style={styles.CartItemIcon}
                                onPress={() => {
                                  incrementCartItemQuantityHandler(data.id, data.prices[0].size);
                                }}>
                                <CustomIcon
                                  name="add"
                                  color={COLORS.primaryWhiteHex}
                                  size={FONTSIZE.size_10}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </LinearGradient>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

        </View>
      </ScrollView>
      <View style={{ marginBottom: tabBarHeight - 15 }}>
        {CartList.length != 0 ? (
          <PaymentFooter
            buttonPressHandler={buttonPressHandler}
            buttonTitle="Pay"
            price={{ price: CartPrice, currency: '$' }}
          />
        ) : (
          <></>
        )}
      </View>

    </View>
  );
};

export default CartScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
  CartItemLinearGradient: {
    flex: 1,
    gap: 12,
    padding: 12,
    borderRadius: 25
  },
  CartItemImage: {
    height: 130,
    width: 130,
    borderRadius: 25

  },
  CartItemRow: {
    flexDirection: 'row',
    flex: 1,
    gap: 12
  },
  CartItemInfo: {
    flex: 1,
    paddingVertical: 4,
    justifyContent: "space-between"
  },
  CartItemTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 18,
    color: COLORS.primaryBlackHex
  },
  CartItemSubtitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 12,
    color: COLORS.primaryBlackHex
  },
  CartItemRoastedContainer: {
    height: 50,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,

  },
  CartItemRoastedText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: 10,
    color: COLORS.primaryBlackHex
  },
  CartItemSizeRowContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  CartItemSizeValueContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  SizeBox: {
    backgroundColor: '#d0d0d0',
    height: 40,
    width: 90,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: 'center',

  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryBlackHex
  },
  SizeCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
    fontSize: 18
  },
  SizePrice: {
    color: COLORS.primaryBlackHex

  },
  CartItemIcon: {
    backgroundColor: COLORS.primaryOrangeHex,
    padding: 12,
    borderRadius: 10
  },
  CartItemQuantityContainer: {
    backgroundColor: 'white',
    width: 80,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    paddingVertical: 4
  },
  CartItemQuantityText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryBlackHex,
    fontSize: 16
  },
  CartItemSingleLinearGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
    borderRadius: 25
  },
  CartItemSingleImage: {
    height: 150,
    width: 150,
    borderRadius: BORDERRADIUS.radius_20,
  },
  CartItemSingleInfoContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-around',
  },
  CartItemSingleSizeValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  CartItemSingleQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});