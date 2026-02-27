import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid } from 'react-native';
import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { useTranslation } from 'react-i18next';
import { useNavigation } from "@react-navigation/native";
import { Home } from "../navigations/routes";


export default function WelcomeScreen() {
    const { t } = useTranslation();
    const navigation = useNavigation();

    const requestPermissions = async () => {
        try {
            const res = await  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
            if (res === PermissionsAndroid.RESULTS.GRANTED) {
                requestToken();

            } else {
                console.log("Notification permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const requestToken = async () => {
        try{
            await messaging().registerDeviceForRemoteMessages();
            const token = await messaging().getToken();
            console.log("FCM Token => ", token);
        }catch(error){
            console.error(error);
        }
    };

    useEffect(() => {
        requestPermissions();
    }, []);

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
                onPress={() => {
                    // @ts-ignore
                    navigation.push(Home)
                }}
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