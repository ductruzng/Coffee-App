import 'react-native-gesture-handler';
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from './src/screens/LoginScreen'
import SignUpScreen from './src/screens/SignUpScreen'
import PaymentScreen from './src/screens/PaymentScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import TabNavigator from './src/navigators/TabNavigator'
import WellcomeScreen from './src/screens/WelcomeScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import ProfileScreen from './src/screens/ProfileScreen';
import AddressScreen from './src/screens/AddressScreen';
import AddAddressScreen from './src/screens/AddAddressScreen';

const Stack = createNativeStackNavigator()

const App = () => {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer >
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          
          <Stack.Screen
            name='Welcome'
            component={WellcomeScreen} />
          <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{ animation: 'slide_from_bottom' }} />
          <Stack.Screen
            name='SignUp'
            component={SignUpScreen}
            options={{ animation: 'slide_from_right' }} />
          <Stack.Screen
            name='Tab'
            component={TabNavigator}
            options={{ animation: 'slide_from_bottom' }} />
          <Stack.Screen
            name='Details'
            component={DetailsScreen}
            options={{ animation: 'slide_from_bottom' }} />
          <Stack.Screen
            name='Payment'
            component={PaymentScreen}
            options={{ animation: 'slide_from_bottom' }} />
          <Stack.Screen
            name='Profile'
            component={ProfileScreen}
            options={{ animation: 'slide_from_bottom' }}
          />
          <Stack.Screen
            name='Address'
            component={AddressScreen}
            options={{ animation: 'slide_from_bottom' }}
          />
          <Stack.Screen
            name='AddAddress'
            component={AddAddressScreen}
            options={{ animation: 'slide_from_bottom' }}
          />


        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({})