import { ImageProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ImageBGInfor from './ImageBGInfor';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTFAMILY } from '../theme/theme';

interface FavoritesItemCardProps {
    id: string;
    name: string;
    type: string;
    imagelink_portrait: ImageProps;
    ingredients: string;
    special_ingredient: string;
    average_rating: number;
    ratings_count: string;
    roasted:string;
    description: string;
    favourite: boolean;
    ToggleFavouriteItem: any
}

const FavoritesItemCard: React.FC<FavoritesItemCardProps> = ({
    id,
    name,
    type,
    imagelink_portrait,
    ingredients,
    special_ingredient,
    average_rating,
    description,
    favourite,
    ToggleFavouriteItem,
    ratings_count,
    roasted
    
}) => {
    return (
        <View style={styles.CardContainer}>
            <ImageBGInfor 
              EnablebackHandler={false}
              Imagelink_portrait={imagelink_portrait}
              type={type}
              id={id}
              favourite={favourite}
              name={name}
              special_ingredient={special_ingredient}
              ingredients={ingredients}
              average_rating={average_rating}
              ratings_count={ratings_count}
              roasted={roasted}
              ToggleFavourite={ToggleFavouriteItem}/>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={[
                    COLORS.primaryDarkWhiteHex,
                    COLORS.primaryDarkWhiteHex
                ]}
                style={styles.ContainerLinearGradient}>
                <Text style={styles.DescriptionTitle}>
                    Description
                </Text>
                <Text style={styles.DescriptionText}>
                    {description}
                </Text>
            </LinearGradient>
        </View>
    )
}

export default FavoritesItemCard

const styles = StyleSheet.create({
    CardContainer: {
        borderRadius: 25,
        overflow: 'hidden'
    },
    ContainerLinearGradient: {
        gap: 10,
        padding: 20

    },
    DescriptionTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: 16,
        color: COLORS.primaryBlackHex
    },
    DescriptionText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: 14,
        color: COLORS.primaryBlackHex
    }
})