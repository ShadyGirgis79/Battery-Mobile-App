import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Home, Welcome } from "../navigations/routes";
import SwipeToActionButton from '../components/SwipeToActionButton';


export default function WelcomeScreen() {
    const { t } = useTranslation();
    const navigation = useNavigation();

    const handleJoinNow = () => {
        // @ts-ignore
        navigation.push(Home)
    };

    return (
        <ImageBackground
            source={require('../assets/images/background.jpg')}
            style={styles.backgroundImage}
        >
            {/* Center Content */}
            <View style={styles.centerContainer}>
                <Text style={styles.welcomeText}>
                    {t("welcome")}
                </Text>
            </View>
            
            <TouchableOpacity
                onPress={handleJoinNow}
                style={styles.bottomContainer}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}>
                    {t("open")}
                </Text>
            </TouchableOpacity>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
    },

    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    welcomeText: {
        width: '80%',
        fontSize: 32,
        //fontWeight: '700',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
    },

    bottomContainer: {
        borderWidth: 2,
        borderColor: '#FFFFFF',   // change color if needed
        borderRadius: 30,
        paddingVertical: 14,
        paddingHorizontal: 40,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 60,
    },

    buttonText: {
        fontSize: 20,
        color: '#FFFFFF',
        fontFamily: 'Poppins-Medium',
    }
    
});