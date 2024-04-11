import React, { useState } from 'react';
import { Image, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTFAMILY, SPACING } from '../theme/theme';

const SignUpScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [passwordA, setPasswordA] = useState('')
  const [isPasswordVisible, setPasswordVisibility] = useState(true);
  const [isPasswordAVisible, setPasswordAVisibility] = useState(true);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [passwordAError, setPasswordAError] = useState('')

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const togglePasswordAVisibility = () => {
    setPasswordAVisibility(!isPasswordAVisible)
  };

  const handleSignup = () => {
   
    let url_api = 'http://192.168.0.101:3000/users'

    if (validate()) {
      fetch(url_api, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName,
          email: email,
          password: passwordA
        }),
      })
        .then(res => {
          if (res.status == 201) {
            ToastAndroid.showWithGravity('Dang ky thanh cong', ToastAndroid.CENTER, ToastAndroid.SHORT)
            setFullName('')
            setEmail('')
            setPassword('')
            setPasswordA('')
            navigation.navigate('Login');
          }
        })
        .catch(e => {
          console.log(e)

        });
    }
  };

  const validate = () => {
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (fullName === '') {
      setFullNameError('Full name should not be empty');
      isValid = false;
    } else {
      setFullNameError('');
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (passwordA !== password && passwordA !== "") {
      setPasswordAError('Passwords do not match');
      isValid = false;
    } else {
      setPasswordAError('');
    }

    return isValid;
  };


  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          style={{ height: 150, width: 150 }}
          source={require('../assets/app_images/Logo.png')}
        />
        <Text style={styles.textH}>Let’s Get Started</Text>
        <Text style={styles.textP}>Create an new account</Text>
      </View>

      {/* Container input */}
      <View style={styles.containerInput}>

        {/* Full name Input */}

        <View style={styles.cartInput}>
          <Image style={{ margin: 10 }} source={require('../assets/icons/user_icon.png')} />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
          />
        </View>
        {fullNameError !== '' ? <Text style={styles.errorText}>{fullNameError}</Text> : <Text></Text>}

        {/* Email Input */}
        <View style={styles.cartInput}>
          <Image style={{ margin: 10 }} source={require('../assets/icons/email_icon.png')} />
          <TextInput
            style={styles.input}
            placeholder="Your Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        {emailError !== '' ? <Text style={styles.errorText}>{emailError}</Text> : <Text></Text>}

        {/* Password Input */}
        <View style={styles.cartInput}>
          <Image style={{ margin: 10 }} source={require('../assets/icons/lock_icon.png')} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            secureTextEntry={isPasswordVisible}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            {isPasswordVisible ? (
              <Image style={{ width: 25, height: 25 }} source={require('../assets/icons/hide.png')} />
            ) : (
              <Image style={{ width: 25, height: 25 }} source={require('../assets/icons/eye.png')} />
            )}
          </TouchableOpacity>

        </View>
        {passwordError !== '' ? <Text style={styles.errorText}>{passwordError}</Text> : <Text></Text>}

        {/* Password Again Input */}

        <View style={styles.cartInput}>
          <Image style={{ margin: 10 }} source={require('../assets/icons/lock_icon.png')} />
          <TextInput
            style={styles.input}
            placeholder="Password Again"
            value={passwordA}
            secureTextEntry={isPasswordAVisible}
            onChangeText={(text) => setPasswordA(text)}
          />
          <TouchableOpacity onPress={togglePasswordAVisibility}>
            {isPasswordAVisible ? (
              <Image style={{ width: 25, height: 25 }} source={require('../assets/icons/hide.png')} />
            ) : (
              <Image style={{ width: 25, height: 25 }} source={require('../assets/icons/eye.png')} />
            )}
          </TouchableOpacity>
        </View>
        {passwordAError !== '' ? <Text style={styles.errorText}>{passwordAError}</Text> : <Text></Text>}


        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>

        {/* Text Bottom */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
          <Text style={styles.textB}>Have an account?</Text>
          <TouchableOpacity onPress={() => { navigation.goBack() }}>
            <Text style={styles.textForgot}>Sign in</Text>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1
  },

  textH: {
    marginTop: 16,
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: 16,
    color: COLORS.primaryBlackHex,
    padding: SPACING.space_2
  },
  textP: {
    marginTop: 10,
    fontSize: 12,
    fontFamily: FONTFAMILY.poppins_light,

  },
  header: {
    alignItems: 'center'

  },
  input: {
    borderRadius: 5,
    fontFamily: FONTFAMILY.poppins_light,
    width: '80%'

  },
  containerInput: {
    marginTop: 20,
  },
  cartInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#9098B1',
    paddingEnd: 7,

  },
  button: {
    backgroundColor: COLORS.primaryOrangeHex,
    padding: 10,
    borderRadius: 5,
    height: 57,
    justifyContent: 'center',
    marginBottom: 20

  },
  buttonText: {
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: 16,
    color: 'white',
    textAlign: 'center',

  },
  textForgot: {
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: 12,
    color: COLORS.primaryBlackHex,
    textAlign: 'center',
    marginBottom: 10

  }, textB: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: 12,
    color: '#9098B1',
    marginRight: 5

  },
  errorText: {
    marginBottom: 5,
    fontFamily: FONTFAMILY.poppins_light,
    color: "red"

  }
});
