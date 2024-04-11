import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTFAMILY, SPACING } from '../theme/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setPasswordVisibility] = useState(true);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!isPasswordVisible);
    };

    const handleLogin = async () => {
        if (validate()) {

            let url_check_login = 'http://192.168.0.101:3000/users?email=' + email

            fetch(url_check_login)
                .then(res => res.json())
                .then(async (res_login) => {
                    if (res_login.length == 0) {
                        setEmailError('Wrong Email');
                        return
                    } else {
                        let objU = res_login[0]


                        if (objU.password != password) {
                            setPasswordError('Wrong Password ');
                            return
                        } else {
                            try {
                                if (rememberMe) {
                                    await AsyncStorage.setItem("loginInfo", JSON.stringify(objU));
                                    await AsyncStorage.setItem("remember", JSON.stringify('check'));
                                }
                                await AsyncStorage.setItem("loginInfo", JSON.stringify(objU));

                                setEmail('')
                                setPassword('')
                                ToastAndroid.showWithGravity(
                                    'Đăng nhập thành công',
                                    ToastAndroid.SHORT,
                                    ToastAndroid.CENTER)
                                navigation.navigate('Tab')


                            } catch (e) {
                                console.log(e)
                            }
                        }
                    }
                })

        }

    };

    const validate = () => {
        let isValid = true
        if (!validateEmail(email)) {
            setEmailError('Invalid email format');
            isValid = false
        } else {
            setEmailError('');
        }

        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            isValid = false

        } else {
            setPasswordError('');
        }

        return isValid
    }


    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    React.useEffect(() => {
        const getRememberMe = async () => {
            const check = await AsyncStorage.getItem('remember');
            const loginInfoStr = await AsyncStorage.getItem('loginInfo');
            if (check != null) {
                setRememberMe(true);
                if (loginInfoStr) {
                    const loginInfoObj = JSON.parse(loginInfoStr);
                    setEmail(loginInfoObj.email);
                    setPassword(loginInfoObj.password);
                }
            }
        };
        getRememberMe();
    }, []);

    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image
                    style={{ height: 150, width: 150 }}
                    source={require('../assets/app_images/Logo.png')}
                />
                <Text style={styles.textH}>Welcome to T-Coffee</Text>
                <Text style={styles.textP}>Sign in to continue</Text>
            </View>
            <View style={styles.containerInput}>
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
                <View style={styles.checkboxContainer}>
                    <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} style={styles.checkbox}>
                        {rememberMe ? (
                            <Image source={require('../assets/icons/select.png')} style={styles.checkboxIcon} />
                        ) : (
                            <Image source={require('../assets/icons/square.png')} style={styles.checkboxIcon} />
                        )}
                        <Text style={styles.checkboxLabel}>Remember Me</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>

                <View>
                    <TouchableOpacity onPress={() => { }}>
                        <Text style={styles.textForgot}>Forgot Password?</Text>
                    </TouchableOpacity>


                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}>
                        <Text style={styles.textB}>Don’t have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={styles.textForgot}>Resigster</Text>
                        </TouchableOpacity>

                    </View>

                </View>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: 16,
        paddingRight: 16,

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
        marginTop: 60,
    },
    cartInput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#9098B1',
        paddingEnd: 7

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
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    checkboxLabel: {
        fontFamily: FONTFAMILY.poppins_light,
        fontSize: 12,
        color: '#223263',
    },
    errorText: {
        marginBottom: 5,
        fontFamily: FONTFAMILY.poppins_light,
        color: "red"

    }
});
