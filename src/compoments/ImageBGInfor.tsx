import { ImageBackground, ImageProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import GradientBGIcon from './GradientBGIcon';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';

interface ImageBGInforProps {
    EnablebackHandler: boolean;
    Imagelink_portrait: ImageProps;
    type: string;
    id: string;
    favourite: boolean;
    name: string;
    special_ingredient: string;
    ingredients: string;
    average_rating: number;
    ratings_count: string;
    roasted: string;
    BackHandler?: any;
    ToggleFavourite: any
}
const ImageBGInfor: React.FC<ImageBGInforProps> = ({
    EnablebackHandler,
    Imagelink_portrait,
    type,
    id,
    favourite,
    name,
    special_ingredient,
    ingredients,
    average_rating,
    ratings_count,
    roasted,
    ToggleFavourite,
    BackHandler
}) => {
    return (
        <View>

            <ImageBackground
                source={Imagelink_portrait}
                style={styles.ItemBGImage}>
                {EnablebackHandler ? (
                    <View style={styles.ImageHeaderBarContainerWithBack}>
                        <TouchableOpacity onPress={() => {
                            BackHandler();
                        }}>
                            <CustomIcon
                                name='left'
                                color={COLORS.primaryWhiteHex}
                                size={22} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            ToggleFavourite(favourite, type, id)
                        }}>
                            <CustomIcon
                                name='like'
                                color={favourite ? COLORS.primaryRedHex : COLORS.primaryWhiteHex}
                                size={22} />
                        </TouchableOpacity>

                    </View>
                ) : (
                    <View style={styles.ImageHeaderBarContainerWithoutBack}>

                        <TouchableOpacity onPress={() => {
                            ToggleFavourite(favourite, type, id)

                        }}>
                            <CustomIcon
                                name='like'
                                color={favourite ? COLORS.primaryRedHex : COLORS.primaryWhiteHex}
                                size={22} />
                        </TouchableOpacity>

                    </View>
                )}
                <View style={styles.ImageInfoOuterContainer}>
                    <View style={styles.ImageInfoInnerContainer}>
                        <View style={styles.InfoContainerRow} >
                            <View>

                                <Text style={styles.ItemTitleText}>{name}</Text>
                                <Text style={styles.ItemSubtitleText}>
                                    {special_ingredient}
                                </Text>
                            </View>
                            <View style={styles.ItemPropertiesContainer}>
                                <View style={styles.ProperFirst}>
                                    <CustomIcon
                                        name={type == 'Bean' ? 'bean' : 'beans'}
                                        size={type == 'Bean' ? FONTSIZE.size_18 : FONTSIZE.size_24}
                                        color={COLORS.primaryOrangeHex} />
                                    <Text style={[styles.PropertyTextFirst, {
                                        marginTop: type == "Bean" ?
                                            SPACING.space_4 + SPACING.space_2 :
                                            0
                                    }]}>
                                        {type}
                                    </Text>
                                </View>
                                <View style={styles.ProperFirst}>
                                    <CustomIcon
                                        name={type == 'Bean' ? 'location' : 'drop'}
                                        size={FONTSIZE.size_16}
                                        color={COLORS.primaryOrangeHex}
                                    />
                                    <Text style={styles.PropertyTextLast}>{ingredients}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.InfoContainerRow}>
                            <View style={styles.RatingContainer}>
                                <CustomIcon
                                    name='star'
                                    color={COLORS.primaryYellowHex}
                                    size={FONTSIZE.size_20} />
                                <Text style={styles.RatingText}>{average_rating}</Text>
                                <Text style={styles.RatingCountText}>({ratings_count})</Text>

                            </View>
                            <View style={styles.RoastedContainer}>
                                <Text style={styles.RoastedText}>{roasted}</Text>
                            </View>
                        </View>
                    </View>
                </View>

            </ImageBackground>
        </View>
    )
}

export default ImageBGInfor

const styles = StyleSheet.create({
    ItemBGImage: {
        width: '100%',
        aspectRatio: 1,
        justifyContent: 'space-between'
    },
    ImageHeaderBarContainerWithBack: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    ImageHeaderBarContainerWithoutBack: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    ImageInfoOuterContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingVertical: SPACING.space_24,
        paddingHorizontal: SPACING.space_30,
        backgroundColor: COLORS.primaryWhiteRGBA,
        borderTopLeftRadius: BORDERRADIUS.radius_20 * 2,
        borderTopRightRadius: BORDERRADIUS.radius_20 * 2,
    },
    ImageInfoInnerContainer: {
        justifyContent: 'space-between',
        gap: SPACING.space_15,
    },
    InfoContainerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    ItemTitleText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_24,
        color: COLORS.primaryBlackHex
    },
    ItemSubtitleText: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_12,
        color: COLORS.primaryBlackHex
    },
    ItemPropertiesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.space_20,

    },
    ProperFirst: {
        height: 55,
        width: 55,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryWhiteHex,
        borderRadius: BORDERRADIUS.radius_15,

    },
    PropertyTextFirst: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryBlackHex
    },
    PropertyTextLast: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryBlackHex,
        marginTop: 6
    },
    RatingContainer: {
        flexDirection: 'row',
        gap: SPACING.space_10,
        alignItems: 'center',
    },
    RatingText: {
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryBlackHex,
        fontFamily: FONTFAMILY.poppins_semibold,

    },
    RatingCountText: {
        fontSize: FONTSIZE.size_12,
        color: COLORS.primaryBlackHex,
        fontFamily: FONTFAMILY.poppins_regular,

    },
    RoastedContainer: {
        height: 55,
        width: 55 * 2 + SPACING.space_20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryWhiteHex,
        borderRadius: BORDERRADIUS.radius_15,
    },
    RoastedText: {
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryBlackHex,
        fontFamily: FONTFAMILY.poppins_regular,
    },


})