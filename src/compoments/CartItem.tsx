import { Button, Image, ImageProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomIcon from './CustomIcon';
interface CartItemProps {
    id: string;
    name: string;
    imagelink_square: ImageProps;
    special_ingredient: string;
    roasted: string;
    prices: any;
    type: string;
    decrementCartItemQuantityHandler: any;
    incrementCartItemQuantityHandler: any;



}
const CartItem: React.FC<CartItemProps> = ({
    id,
    imagelink_square,
    special_ingredient,
    roasted,
    prices,
    type,
    decrementCartItemQuantityHandler,
    incrementCartItemQuantityHandler,
    name,
}) => {
    return (
        <View>
            {prices.length != 1 ? (
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={[COLORS.primaryDarkWhiteHex, COLORS.primaryDarkWhiteHex]}
                    style={styles.CartItemLinearGradient}>
                    <View style={styles.CartItemRow}>
                        <Image source={imagelink_square} style={styles.CartItemImage} />
                        <View style={styles.CartItemInfo}>
                            <View>
                                <Text style={styles.CartItemTitle}>{name}</Text>
                                <Text style={styles.CartItemSubtitle}>
                                    {special_ingredient}
                                </Text>
                            </View>
                            <View style={styles.CartItemRoastedContainer}>
                                <Text style={styles.CartItemRoastedText}>{roasted}</Text>
                            </View>
                        </View>
                    </View>
                    {prices.map((data: any, index: any) => (
                        <View
                            key={index.toString()}
                            style={styles.CartItemSizeRowContainer}>
                            <View style={styles.CartItemSizeValueContainer}>
                                <View style={styles.SizeBox}>
                                    <Text
                                        style={[
                                            styles.SizeText,
                                            {
                                                fontSize:
                                                    type == 'Bean' ? FONTSIZE.size_12 : FONTSIZE.size_16,
                                            },
                                        ]}>
                                        {data.size}
                                    </Text>
                                </View>
                                <Text style={styles.SizeCurrency}>
                                    {data.currency}
                                    <Text style={styles.SizePrice}> {data.price}</Text>
                                </Text>
                            </View>
                            <View style={styles.CartItemSizeValueContainer}>
                                <TouchableOpacity
                                    style={styles.CartItemIcon}
                                    onPress={() => {
                                        decrementCartItemQuantityHandler(id, data.size);
                                    }}>
                                    <CustomIcon
                                        name="minus"
                                        color={COLORS.primaryWhiteHex}
                                        size={FONTSIZE.size_10}
                                    />
                                </TouchableOpacity>
                                <View style={styles.CartItemQuantityContainer}>
                                    <Text style={styles.CartItemQuantityText}>
                                        {data.quantity}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.CartItemIcon}
                                    onPress={() => {
                                        incrementCartItemQuantityHandler(id, data.size);
                                    }}>
                                    <CustomIcon
                                        name="add"
                                        color={COLORS.primaryWhiteHex}
                                        size={FONTSIZE.size_10}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </LinearGradient>
            ) : (
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={[COLORS.primaryDarkWhiteHex, COLORS.primaryDarkWhiteHex]}
                    style={styles.CartItemSingleLinearGradient}>
                    <View>
                        <Image
                            source={imagelink_square}
                            style={styles.CartItemSingleImage}
                        />
                    </View>
                    <View style={styles.CartItemSingleInfoContainer}>
                        <View>
                            <Text style={styles.CartItemTitle}>{name}</Text>
                            <Text style={styles.CartItemSubtitle}>{special_ingredient}</Text>
                        </View>
                        <View style={styles.CartItemSingleSizeValueContainer}>
                            <View style={styles.SizeBox}>
                                <Text
                                    style={[
                                        styles.SizeText,
                                        {
                                            fontSize:
                                                type == 'Bean' ? FONTSIZE.size_12 : FONTSIZE.size_16,
                                        },
                                    ]}>
                                    {prices[0].size}
                                </Text>
                            </View>
                            <Text style={styles.SizeCurrency}>
                                {prices[0].currency}
                                <Text style={styles.SizePrice}> {prices[0].price}</Text>
                            </Text>
                        </View>
                        <View style={styles.CartItemSingleQuantityContainer}>
                            <TouchableOpacity
                                style={styles.CartItemIcon}
                                onPress={() => {
                                    decrementCartItemQuantityHandler(id, prices[0].size);
                                }}>
                                <CustomIcon
                                    name="minus"
                                    color={COLORS.primaryWhiteHex}
                                    size={FONTSIZE.size_10}
                                />
                            </TouchableOpacity>
                            <View style={styles.CartItemQuantityContainer}>
                                <Text style={styles.CartItemQuantityText}>
                                    {prices[0].quantity}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.CartItemIcon}
                                onPress={() => {
                                    incrementCartItemQuantityHandler(id, prices[0].size);
                                }}>
                                <CustomIcon
                                    name="add"
                                    color={COLORS.primaryWhiteHex}
                                    size={FONTSIZE.size_10}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            )}
        </View>
    )
}

export default CartItem

const styles = StyleSheet.create({
    CartItemLinearGradient: {
        flex: 1,
        gap: 12,
        padding: 12,
        borderRadius: 25
    },
    CartItemImage: {
        height: 130,
        width: 130,
        borderRadius: 25

    },
    CartItemRow: {
        flexDirection: 'row',
        flex: 1,
        gap: 12
    },
    CartItemInfo: {
        flex: 1,
        paddingVertical: 4,
        justifyContent: "space-between"
    },
    CartItemTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: 18,
        color: COLORS.primaryBlackHex
    },
    CartItemSubtitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: 12,
        color: COLORS.primaryBlackHex
    },
    CartItemRoastedContainer: {
        height: 50,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 15,

    },
    CartItemRoastedText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: 10,
        color: COLORS.primaryBlackHex
    },
    CartItemSizeRowContainer: {
        flex: 1,
        alignItems: 'center',
        gap: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    CartItemSizeValueContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    SizeBox: {
        backgroundColor: '#d0d0d0',
        height: 40,
        width: 90,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center',

    },
    SizeText: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryBlackHex
    },
    SizeCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryOrangeHex,
        fontSize: 18
    },
    SizePrice: {
        color: COLORS.primaryBlackHex

    },
    CartItemIcon: {
        backgroundColor: COLORS.primaryOrangeHex,
        padding: 12,
        borderRadius: 10
    },
    CartItemQuantityContainer: {
        backgroundColor: 'white',
        width: 80,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.primaryOrangeHex,
        alignItems: 'center',
        paddingVertical: 4
    },
    CartItemQuantityText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryBlackHex,
        fontSize: 16
    },
    CartItemSingleLinearGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        gap: 12,
        borderRadius: 25
    },
    CartItemSingleImage: {
        height: 150,
        width: 150,
        borderRadius: BORDERRADIUS.radius_20,
    },
    CartItemSingleInfoContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'space-around',
    },
    CartItemSingleSizeValueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    CartItemSingleQuantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },


})