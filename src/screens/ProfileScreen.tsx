import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomIcon from '../compoments/CustomIcon'
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

const ProfileScreen = ({ navigation }: any) => (
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
            <Text style={styles.TextHeader}>Proflile</Text>

            <Text></Text>
        </View>
        <ScrollView >
            <TouchableOpacity style={styles.item}>
                <Image
                    style={styles.icon}
                    source={require('../assets/icons/iconU.png')} />
                <Text style={styles.TextItem}>User</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
                <Image
                    style={styles.icon}
                    source={require('../assets/icons/bag_icon.png')} />
                <Text style={styles.TextItem}>Order</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{navigation.navigate('Address')}}
            style={styles.item}>
                <Image
                    style={styles.icon}
                    source={require('../assets/icons/location_icon.png')} />
                <Text style={styles.TextItem}>Address</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
                <Image
                    style={styles.icon}
                    source={require('../assets/icons/credit_card_icon.png')} />
                <Text style={styles.TextItem}>Payment</Text>
            </TouchableOpacity>
        </ScrollView>
    </View>
)

export default ProfileScreen

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
    icon: {
        height: 25,
        width: 25
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical:10
    },
    TextItem: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryBlackHex,
        marginStart: 20
    }
})