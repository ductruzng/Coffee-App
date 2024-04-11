import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { ScrollView } from 'react-native-gesture-handler'
import HeaderBar from '../compoments/HeaderBar'
import EmptyListAnimation from '../compoments/EmptyListAnimation'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import PopUpAnimation from '../compoments/PopUpAnimation'
import LinearGradient from 'react-native-linear-gradient'


const OrderHistoryScreen = ({ navigation }: any) => {
  const OrderHistoryList = useStore((state: any) => state.OrderHistoryList)
  const tabBarHeight = useBottomTabBarHeight()
  const [showAnimation, setShowAnimation] = useState(false)

  const navigationHandler = ({ index, id, type }: any) => {
    navigation.push('Details', {
      index,
      id,
      type
    })
  }
  const buttonPressHandler = () => {
    setShowAnimation(true)
    setTimeout(() => {
      setShowAnimation(false)
    },2000)
  }

  return (
    <View style={styles.ScreenContainer}>
      <HeaderBar navigation={navigation} title="Order History" />
      {showAnimation ? (
        <PopUpAnimation
          styte={styles.LottieAnimation}
          source={require('../lottie/download.json')} />
      ) : (
        <></>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View style={[styles.ScrollViewInnerView,
        { marginBottom: tabBarHeight }]}>
          <View style={styles.ItemContainer}>
            {OrderHistoryList.length == 0 ? (
              <EmptyListAnimation title={'No Order History'} />
            ) : (
              <View style={styles.ListItemContainer}>
                {OrderHistoryList.map((data: any, index: any) => (
                  <View
                    key={index.toString()}
                    style={styles.CardContainer}>
                    <View style={styles.CardHeader}>
                      <View>
                        <Text style={styles.HeaderTitle}>Order Time</Text>
                        <Text style={styles.HeaderSubtitle}>{data.OrderDate}</Text>
                      </View>
                      <View style={styles.PriceContainer}>
                        <Text style={styles.HeaderTitle}>Total Amount</Text>
                        <Text style={styles.HeaderPrice}>$ {data.CartListPrice}</Text>
                      </View>
                    </View>
                    <View style={styles.ListContainer}>
                      {
                        data.CartList.map((data: any, index: any) => (
                          <TouchableOpacity
                            onPress={() => {
                              navigationHandler({
                                index: data.index,
                                id: data.id,
                                type: data.type
                              })
                            }}
                            key={index.toString() + data.id}>
                            <LinearGradient
                              start={{ x: 0, y: 0 }}
                              end={{ x: 1, y: 1 }}
                              colors={[COLORS.primaryDarkWhiteHex, COLORS.primaryDarkWhiteHex]}
                              style={styles.CardLinearGradient}>
                              <View style={styles.CardInfoContainer}>
                                <View style={styles.CardImageInfoContainer}>
                                  <Image source={data.imagelink_square}
                                    style={styles.Image} />
                                  <View>
                                    <Text style={styles.CardTitle}>{data.name}</Text>
                                    <Text style={styles.CardSubTitle}>{data.special_ingredient}</Text>
                                  </View>
                                </View>
                                <View>
                                  <Text style={styles.CardCurrency}>$
                                    <Text style={styles.CardPrice}>{data.ItemPrice}</Text>
                                  </Text>
                                </View>
                              </View>
                              {data.prices.map((data: any, index: any) => (
                                <View
                                  key={index.toString()}
                                  style={styles.CardTableRow}>
                                  <View style={styles.CardTableRow}>
                                    <View style={styles.SizeBoxLeft}>
                                      <Text style={[styles.SizeText, {
                                        fontSize: data.type == 'Bean'
                                          ? 12 : 16
                                      }]}>{data.size}</Text>
                                    </View>
                                    <View style={styles.PriceBoxRight}>
                                      <Text style={styles.PriceCurrence}>
                                        {data.currency}
                                        <Text style={styles.Price}> {data.price}</Text>

                                      </Text>

                                    </View>
                                  </View>
                                  <View style={styles.CardTableRow}>
                                    <Text style={styles.CardQuantityPriceText}>
                                      X
                                      <Text style={styles.Price}>{data.quantity}</Text>
                                    </Text>
                                    <Text style={styles.CardQuantityPriceText}>
                                      $ {(data.quantity * data.price).toFixed(2).toString()}

                                    </Text>
                                  </View>
                                </View>
                              ))}
                            </LinearGradient>

                          </TouchableOpacity>
                        ))
                      }
                    </View>
                  </View>
                ))}
              </View>
            )}

          </View>
          {OrderHistoryList.length > 0
            ? <TouchableOpacity 
            onPress={()=>{
              buttonPressHandler()
            }}
            style={styles.DownloadButton}>
              <Text style={styles.ButtonText}>Download</Text>

            </TouchableOpacity>
            : <></>}
        </View>
      </ScrollView>
    </View>
  )
}

export default OrderHistoryScreen

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
  LottieAnimation: {
    height: 250
  },
  CardContainer: {
    gap: 10
  },
  CardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    alignItems: 'center'
  },
  HeaderTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 16,
    color: COLORS.primaryBlackHex,
  },
  HeaderSubtitle: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: 16,
    color: COLORS.primaryLightGreyHex
  },
  PriceContainer: {
    alignItems: 'flex-end'
  },
  HeaderPrice: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 18,
    color: COLORS.primaryOrangeHex
  },
  ListContainer: {
    gap: 20
  },
  CardLinearGradient: {
    gap: 20,
    padding: 20,
    borderRadius: 25,

  },
  CardInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  CardImageInfoContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  Image: {
    height: 90,
    width: 90,
    borderRadius: 15,
  },
  CardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 18,
    color: COLORS.primaryBlackHex
  },
  CardSubTitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: 12,
    color: COLORS.secondaryLightGreyHex

  },
  CardCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 20,
    color: COLORS.primaryOrangeHex

  },
  CardPrice: {
    color: COLORS.primaryBlackHex
  },
  CardTableRow: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  SizeBoxLeft: {
    backgroundColor: '#d0d0d0',
    height: 45,
    flex: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: COLORS.primaryBlackHex
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryBlackHex
  },
  PriceBoxRight: {
    backgroundColor: '#d0d0d0',
    height: 45,
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: COLORS.primaryBlackHex
  },
  PriceCurrence: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 18,
    color: COLORS.primaryOrangeHex,

  },
  Price: {
    color: COLORS.primaryBlackHex,
  },
  CardQuantityPriceText: {
    flex: 1,
    textAlign: 'center',
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 18,
    color: COLORS.primaryOrangeHex,

  },
  DownloadButton: {
    margin: 20,
    backgroundColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: 62,
    borderRadius: 20
  },
  ButtonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 18,
    color: 'white'
  }

})
