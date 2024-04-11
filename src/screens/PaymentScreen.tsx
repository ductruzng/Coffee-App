import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import GradientBGIcon from '../compoments/GradientBGIcon';
import { COLORS, FONTFAMILY } from '../theme/theme';
import CustomIcon from '../compoments/CustomIcon';
import PaymentMethod from '../compoments/PaymentMethod';
import PaymentFooter from '../compoments/PaymentFooter';
import LinearGradient from 'react-native-linear-gradient';
import { useStore } from '../store/store';
import PopUpAnimation from '../compoments/PopUpAnimation';

const PaymentList = [
  {
    name: 'Wallet',
    icon: 'icon',
    isIcon: true,
  },
  {
    name: 'Google Pay',
    icon: require('../assets/app_images/gpay.png'),
    isIcon: false,
  },
  {
    name: 'Apple Pay',
    icon: require('../assets/app_images/applepay.png'),
    isIcon: false,
  },
  {
    name: 'Amazon Pay',
    icon: require('../assets/app_images/amazonpay.png'),
    isIcon: false,
  },
];

const PaymentScreen = ({ navigation, route }: any) => {
  const [paymentMode, setPaymentMode] = useState('Credit Card')
  const [showAnimation, setShowAnimation] = useState(false)
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const addToOrderHistoryListFromCart = useStore((state: any) => state.addToOrderHistoryListFromCart);

  const buttonPressHandler = () => {
    setShowAnimation(true)
    addToOrderHistoryListFromCart()
    calculateCartPrice()
    setTimeout(() => {
      setShowAnimation(false)
      navigation.navigate('History')
    }, 2000)
  }
  return (
    <View style={styles.ScreenContainer}>
      <View style={styles.HeaderContainer}>
        <TouchableOpacity onPress={() => {
          navigation.pop()
        }}>
          <CustomIcon
            name='left'
            color={COLORS.primaryBlackHex}
            size={16} />
        </TouchableOpacity>
        <Text style={styles.HeaderText}>Payments</Text>
        <View style={styles.EmptyView}>
        </View>
      </View>
      {showAnimation ? (
        <PopUpAnimation
          styte={styles.LottieAnimation}
          source={require('../lottie/successful.json')} />
      ) : (
        <></>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View style={styles.PaymentOptionContainer}>
          <TouchableOpacity onPress={() => {
            setPaymentMode('Credit Card')
          }}>
            <View style={[styles.CreditCardContainer, {
              borderColor: paymentMode == 'Credit Card'
                ? COLORS.primaryOrangeHex
                : COLORS.primaryGreyHex
            }]}>
              <Text style={styles.CreditCardTitle}>Credit Card</Text>
              <View style={styles.CreditCardBG}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={[COLORS.primaryDarkWhiteHex, COLORS.primaryDarkWhiteHex]}
                  style={styles.LinearGradientStyle}>
                  <View style={styles.CreditCardRow}>
                    <CustomIcon
                      name='chip'
                      size={40}
                      color={COLORS.primaryOrangeHex} />
                    <CustomIcon
                      name='visa'
                      size={60}
                      color={COLORS.primaryBlackHex} />
                  </View>

                  <View style={styles.CreditCardNumberContainer}>
                    <Text style={styles.CreditCardNumber}>3878</Text>
                    <Text style={styles.CreditCardNumber}>5435</Text>
                    <Text style={styles.CreditCardNumber}>5467</Text>
                    <Text style={styles.CreditCardNumber}>8652</Text>

                  </View>
                  <View style={styles.CreditCardRow}>
                    <View style={styles.CreditCardNameContainer}>
                      <Text style={styles.CreditCardNameSubtitle}>Card Holder Name</Text>
                      <Text style={styles.CreditCardNameTitle}>Nguyen Duc Trung</Text>
                    </View>
                    <View style={styles.CreditCardRow}>
                      <View style={styles.CreditCardDateContainer}>
                        <Text style={styles.CreditCardNameSubtitle}>Expiry Date</Text>
                        <Text style={styles.CreditCardNameTitle}>20/02</Text>
                      </View>
                    </View>
                  </View>

                </LinearGradient>
              </View>
            </View>
          </TouchableOpacity>
          {PaymentList.map((data: any) => (
            <TouchableOpacity
              onPress={() => {
                setPaymentMode(data.name)
              }}
              key={data.name}>
              <PaymentMethod
                paymentMode={paymentMode}
                name={data.name}
                icon={data.icon}
                isIcon={data.isIcon} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <PaymentFooter
        buttonPressHandler={buttonPressHandler}
        buttonTitle={`Pay with ${paymentMode} `}
        price={{ price: route.params.amount, currency: '$' }}
      />
    </View>
  )
}

export default PaymentScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  ScrollViewFlex: {
    flexGrow: 1
  },
  HeaderContainer: {
    paddingHorizontal: 24,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 20,
    color: COLORS.primaryBlackHex,

  },
  EmptyView: {
    height: 36,
    width: 36
  },
  PaymentOptionContainer: {
    padding: 15,
    gap: 15
  },
  CreditCardContainer: {
    padding: 10,
    gap: 10,
    borderRadius: 30,
    borderWidth: 3,

  },
  CreditCardTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 14,
    color: COLORS.primaryBlackHex,
    marginLeft: 10
  },
  CreditCardBG: {
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: 25,
  },
  LinearGradientStyle: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 36,
    borderRadius: 25
  },
  CreditCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'

  },
  CreditCardNumberContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  CreditCardNameContainer: {
    alignItems: 'flex-start',

  },
  CreditCardNumber: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 18,
    color: COLORS.primaryBlackHex,
    letterSpacing: 4
  },
  CreditCardNameSubtitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: 12,
    color: COLORS.primaryLightGreyHex,
  },
  CreditCardNameTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 18,
    color: COLORS.primaryBlackHex,
  },
  CreditCardDateContainer: {
    alignItems: 'flex-end'
  },
  LottieAnimation: {
    flex: 1,

  }

})

