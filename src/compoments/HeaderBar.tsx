import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import GradientBGIcon from './GradientBGIcon'
import ProfilePic from './ProfilePic'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface HeaderBarProps {
    title?: string,
    navigation: any
}

const HeaderBar: React.FC<HeaderBarProps> = ({ title, navigation }) => {
    return (
        <View style={styles.headerContainer}>
            <GradientBGIcon
                name='menu'
                color={COLORS.primaryLightGreyHex}
                size={FONTSIZE.size_16} />
            <Text style={styles.headerText}>{title}</Text>
            <TouchableOpacity
                onPress={() => { navigation.navigate('Profile') }}>
                <ProfilePic />

            </TouchableOpacity>
        </View>
    )
}

export default HeaderBar

const styles = StyleSheet.create({
    headerContainer: {
        paddingLeft: SPACING.space_30,
        paddingRight: SPACING.space_30,
        paddingBottom: SPACING.space_10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        
    },
    headerText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_20,
        color: COLORS.primaryBlackHex
    }
})