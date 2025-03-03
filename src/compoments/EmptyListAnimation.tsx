import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import { COLORS, FONTFAMILY } from '../theme/theme';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface EmptyListAnimationProps {
    title: string;
}
const EmptyListAnimation: React.FC<EmptyListAnimationProps> = ({ title }) => {
    return (
        <View style={styles.EmptyCartContainer}>
            <LottieView
                style={styles.LottieStyle}
                source={require('../lottie/coffeecup.json')}
                autoPlay
                loop />
                <Text style={styles.LottieText}>
                    {title}
                </Text>
        </View>
    )
}

export default EmptyListAnimation

const styles = StyleSheet.create({
    EmptyCartContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    LottieStyle: {
        height: 300
    },
    LottieText:{
        fontFamily:FONTFAMILY.poppins_medium,
        fontSize:16,
        color:COLORS.primaryOrangeHex,
        textAlign:'center'
    }
})