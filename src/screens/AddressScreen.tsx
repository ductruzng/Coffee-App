import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomIcon from '../compoments/CustomIcon'
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme'
import PaymentFooter from '../compoments/PaymentFooter'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AddressScreen = ({ navigation }: any) => {

  const [loginInfo, setLoginInfo] = useState({})
  const [userInfo, setUserInfo] = useState({})

  React.useEffect(() => {
    getUserInfo();

  }, []);

  const getUserInfo = async () => {
    try {
      const value = await AsyncStorage.getItem('loginInfo')
      if (value != null) {
        setLoginInfo(JSON.parse(value))
      }
    } catch (e) {
      console.log(e)
    }
    let url_check_login = 'http://192.168.0.101:3000/users?email=' + loginInfo.email
    fetch(url_check_login)
      .then(res => res.json())
      .then(async (res_login) => {
        await setUserInfo(res_login)
      })

  }


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}>
          <CustomIcon
            name={'left'}
            color={COLORS.primaryBlackHex}
            size={22} />
        </TouchableOpacity>
        <Text style={styles.TextHeader}>My Address</Text>

        <Text></Text>
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.TextH2}>Address</Text>
        {userInfo.length > 1 ? (
          <View style={styles.containerAddress}>
            <Text style={styles.TextBold}>{userInfo[1]?.contact?.fullName}</Text>
            <Text style={styles.TextSemi}>{userInfo[1]?.contact?.location} {userInfo[1]?.contact?.city}</Text>
            <Text style={styles.TextSemi}>{userInfo[1]?.contact?.phone}</Text>
          </View>
        ) : (
          <></>
        )}

      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddAddress')
        }}
        style={styles.Button}>
        <Text style={styles.ButtonText}>Add Address</Text>

      </TouchableOpacity>
    </View>
  )
}

export default AddressScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: COLORS.primaryWhiteHex
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 30
  },
  TextHeader: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryBlackHex
  },
  input: {
    borderRadius: 5,
    fontFamily: FONTFAMILY.poppins_light,
    backgroundColor: '#ededed',
    marginVertical: 1,
    paddingStart: 15
  },
  TextH2: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex
  },
  Button: {
    marginVertical: 20,
    backgroundColor: COLORS.primaryBlackHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 5
  },
  ButtonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 18,
    color: 'white'
  },
  TextBold: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 18,
    color: COLORS.primaryBlackHex
  },
  containerAddress: {
    borderWidth: 1,
    borderColor: COLORS.secondaryLightGreyHex,
    padding: 10
  },
  TextSemi: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: 14,
    color: COLORS.primaryGreyHex
  }
})