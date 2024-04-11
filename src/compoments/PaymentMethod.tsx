import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTFAMILY } from '../theme/theme';
import CustomIcon from './CustomIcon';

interface PaymentMethodProps {
    paymentMode: string;
    name: string;
    icon: any;
    isIcon: boolean;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
    paymentMode,
    name,
    icon,
    isIcon,
}) => {
    return (
        <View style={[styles.PaymentCardContainer, {
            borderColor: paymentMode == name
                ? COLORS.primaryOrangeHex
                : COLORS.primaryGreyHex
        }]}>
            {isIcon ? (
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={[COLORS.primaryDarkWhiteHex, COLORS.primaryDarkWhiteHex]}
                    style={styles.LinearGradientWallet}>
                    <View style={styles.WalletRow}>
                        <CustomIcon
                            name='wallet'
                            color={COLORS.primaryOrangeHex}
                            size={30} />
                        <Text style={styles.PaymentTitle}>
                            {name}
                        </Text>
                    </View>
                    <Text style={styles.PaymentPrice}>
                        $ 100.50
                    </Text>
                </LinearGradient>
            ) : (
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={[COLORS.primaryDarkWhiteHex, COLORS.primaryDarkWhiteHex]}
                    style={styles.LinearGradientRegular}>

                    <Image
                        source={icon}
                        style={styles.PaymentImage} />
                    <Text style={styles.PaymentTitle}>
                        {name}
                    </Text>
                </LinearGradient>
            )}
        </View>
    )
}

export default PaymentMethod

const styles = StyleSheet.create({
    PaymentCardContainer: {
        borderRadius: 30,
        backgroundColor: COLORS.primaryGreyHex,
        borderWidth: 3

    },
    LinearGradientWallet: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 24,
        gap: 24,
        borderRadius: 30
    },
    WalletRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
    },
    LinearGradientRegular: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        paddingHorizontal: 24,
        gap: 24,
        borderRadius: 30
    },
    PaymentTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: 16,
        color: COLORS.primaryBlackHex,
    },
    PaymentPrice: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: 16,
        color: COLORS.primaryGreyHex,
    },
    PaymentImage: {
        height: 30,
        width: 30,

    }
})