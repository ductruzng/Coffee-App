import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useStore } from '../store/store';
import HeaderBar from '../compoments/HeaderBar';
import EmptyListAnimation from '../compoments/EmptyListAnimation';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import FavoritesItemCard from '../compoments/FavoritesItemCard';
import ImageBGInfor from '../compoments/ImageBGInfor';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../compoments/CustomIcon';

const FavoritesScreen = ({ navigation }: any) => {
  const FavoritesList = useStore((state: any) => state.FavouritesList);
  const tabBarHeight = useBottomTabBarHeight();
  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList,
  );
  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };
  return (
    <View style={[styles.ScreenContainer,]}>
      <HeaderBar navigation={navigation} title="Favourites" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View
          style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
          <View style={styles.ItemContainer}>

            {FavoritesList.length == 0 ? (
              <EmptyListAnimation title={'No Favourites'} />
            ) : (
              <View style={styles.ListItemContainer}>
                {FavoritesList.map((data: any) => (
                  <TouchableOpacity
                    onPress={(e) => {
                      e.stopPropagation()
                      navigation.push('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data.id}>
                    <View style={styles.CardContainer}>
                      <View>

                        <ImageBackground
                          source={data.imagelink_portrait}
                          style={styles.ItemBGImage}>

                          <View style={styles.ImageHeaderBarContainerWithoutBack}>

                            <TouchableOpacity onPress={() => {
                              ToggleFavourite(data.favourite, data.type, data.id)

                            }}>
                              <CustomIcon
                                name='like'
                                color={data.favourite ? COLORS.primaryRedHex : COLORS.primaryWhiteHex}
                                size={22} />
                            </TouchableOpacity>

                          </View>

                          <View style={styles.ImageInfoOuterContainer}>
                            <View style={styles.ImageInfoInnerContainer}>
                              <View style={styles.InfoContainerRow} >
                                <View>

                                  <Text style={styles.ItemTitleText}>{data.name}</Text>
                                  <Text style={styles.ItemSubtitleText}>
                                    {data.special_ingredient}
                                  </Text>
                                </View>
                                <View style={styles.ItemPropertiesContainer}>
                                  <View style={styles.ProperFirst}>
                                    <CustomIcon
                                      name={data.type == 'Bean' ? 'bean' : 'beans'}
                                      size={data.type == 'Bean' ? FONTSIZE.size_18 : FONTSIZE.size_24}
                                      color={COLORS.primaryOrangeHex} />
                                    <Text style={[styles.PropertyTextFirst, {
                                      marginTop: data.type == "Bean" ?
                                        SPACING.space_4 + SPACING.space_2 :
                                        0
                                    }]}>
                                      {data.type}
                                    </Text>
                                  </View>
                                  <View style={styles.ProperFirst}>
                                    <CustomIcon
                                      name={data.type == 'Bean' ? 'location' : 'drop'}
                                      size={FONTSIZE.size_16}
                                      color={COLORS.primaryOrangeHex}
                                    />
                                    <Text style={styles.PropertyTextLast}>{data.ingredients}</Text>
                                  </View>
                                </View>
                              </View>
                              <View style={styles.InfoContainerRow}>
                                <View style={styles.RatingContainer}>
                                  <CustomIcon
                                    name='star'
                                    color={COLORS.primaryYellowHex}
                                    size={FONTSIZE.size_20} />
                                  <Text style={styles.RatingText}>{data.average_rating}</Text>
                                  <Text style={styles.RatingCountText}>({data.ratings_count})</Text>

                                </View>
                                <View style={styles.RoastedContainer}>
                                  <Text style={styles.RoastedText}>{data.roasted}</Text>
                                </View>
                              </View>
                            </View>
                          </View>

                        </ImageBackground>
                      </View>
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
                          {data.description}
                        </Text>
                      </LinearGradient>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FavoritesScreen


const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
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
  },
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

});