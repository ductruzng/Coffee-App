import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../theme/theme';
import LottieView from 'lottie-react-native';

interface PopUpAnimationProps {
    styte: any;
    source: any;

}

const PopUpAnimation: React.FC<PopUpAnimationProps> = ({
    styte,
    source,

}) => {
    return (
        <View style={styles.LottieAnimationContainer}>
            <LottieView
                style={styte}
                source={source}
                autoPlay
                loop={false} />
        </View>
    )
}

export default PopUpAnimation

const styles = StyleSheet.create({
    LottieAnimationContainer: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: COLORS.primaryWhiteRGBA,
        justifyContent: 'center'
    }
})