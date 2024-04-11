import { StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomIcon from '../compoments/CustomIcon'
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme'
import PaymentFooter from '../compoments/PaymentFooter'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AddAddressScreen = ({ navigation }: any) => {
    const [fullName, setFullName] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [city, setCity] = useState('');
    const [cityError, setCityError] = useState('');
    const [location, setLocation] = useState('');
    const [locationError, setLocationError] = useState('');
    const [loginInfo, setLoginInfo] = useState({});

    React.useEffect(() => {
        getLoginInfo();
    }, []);

    const getLoginInfo = async () => {
        try {
            const value = await AsyncStorage.getItem('loginInfo');
            if (value !== null) {
                setLoginInfo(JSON.parse(value));
            }
        } catch (e) {
            console.log(e);
        }
    };

    const validatePhoneNumber = (phoneNumber: string) => {
        const pattern = /^0\d{8}$/;
        return pattern.test(phoneNumber);
    };

    const validate = () => {
        let isValid = true;

        if (!validatePhoneNumber(phone)) {
            setPhoneError('Invalid phone format');
            isValid = false;
        } else {
            setPhoneError('');
        }

        if (fullName === '') {
            setFullNameError('Full name should not be empty');
            isValid = false;
        } else {
            setFullNameError('');
        }

        if (city === '') {
            setCityError('City should not be empty');
            isValid = false;
        } else {
            setCityError('');
        }

        if (location === '') {
            setLocationError('Location should not be empty');
            isValid = false;
        } else {
            setLocationError('');
        }

        return isValid;
    };

    const handleComplete = () => {
        const urlApi = 'http://192.168.0.101:3000/users?email=' + loginInfo.email;
        const contact = {
            fullName: fullName,
            phone: phone,
            city: city,
            location: location
        };

        if (validate()) {
            fetch(urlApi, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    email: loginInfo.email,
                    contact,

                }),
            }).then(res => {
                if (res.ok) {
                    ToastAndroid.showWithGravity('Thêm địa chỉ mới thành công', ToastAndroid.CENTER, ToastAndroid.SHORT);
                    setFullName('');
                    setPhone('');
                    setCity('');
                    setLocation('');
                    navigation.goBack();
                }
            }).catch(error => {
                console.error(error);
                ToastAndroid.showWithGravity('Có lỗi xảy ra. Vui lòng thử lại sau', ToastAndroid.CENTER, ToastAndroid.SHORT);
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <CustomIcon name={'left'} color={COLORS.primaryBlackHex} size={22} />
                </TouchableOpacity>
                <Text style={styles.TextHeader}>New Address</Text>
                <Text></Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.TextH2}>Contact</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor={COLORS.primaryLightGreyHex}
                    value={fullName}
                    onChangeText={text => setFullName(text)}
                />
                {fullNameError !== '' && <Text style={styles.errorText}>{fullNameError}</Text>}
                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    inputMode='numeric'
                    placeholderTextColor={COLORS.primaryLightGreyHex}
                    value={phone}
                    onChangeText={text => setPhone(text)}
                />
                {phoneError !== '' && <Text style={styles.errorText}>{phoneError}</Text>}
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.TextH2}>Address</Text>
                <TextInput
                    style={styles.input}
                    placeholder="City"
                    placeholderTextColor={COLORS.primaryLightGreyHex}
                    value={city}
                    onChangeText={text => setCity(text)}
                />
                {cityError !== '' && <Text style={styles.errorText}>{cityError}</Text>}
                <TextInput
                    style={styles.input}
                    placeholder="State/Province/Region"
                    placeholderTextColor={COLORS.primaryLightGreyHex}
                    value={location}
                    onChangeText={text => setLocation(text)}
                />
                {locationError !== '' && <Text style={styles.errorText}>{locationError}</Text>}
            </View>
            <TouchableOpacity style={styles.button} onPress={handleComplete}>
                <Text style={styles.buttonText}>Complete</Text>
            </TouchableOpacity>
        </View>
    );
};
export default AddAddressScreen

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
    button: {
        marginVertical: 20,
        backgroundColor: COLORS.primaryBlackHex,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 5
    },
    buttonText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: 18,
        color: 'white'
    },
    errorText: {
        marginBottom: 5,
        fontFamily: FONTFAMILY.poppins_light,
        color: "red"

    },
    inputContainer: {
        marginBottom: 20,
    },
})