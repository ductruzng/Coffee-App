import { useEffect } from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { COLORS, FONTFAMILY } from "../theme/theme";

const WellcomeScreen = (props: any) => {
    const { navigation } = props;
    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.replace('Login');
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLORS.primaryOrangeHex}/>
            <Image
                style={{ width: 250, height: 250 }}
                source={require('../assets/app_images/Logo.png')}
                resizeMode="contain"></Image>
            <Text style={styles.TextHeader}>Welcome to T-Coffee</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryOrangeHex
    },
    TextHeader: {
        fontSize: 32,
        fontFamily: FONTFAMILY.poppins_extrabold,
        color: COLORS.primaryWhiteHex
    }
})

export default WellcomeScreen;