import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next, Translation } from 'react-i18next';
import * as RNLocalize from "react-native-localize";
import { I18nManager } from 'react-native';

import arabic from './lang/arabic.json';
import english from './lang/english.json';
import deutsch from './lang/deutsch.json';

const deviceLanguage = RNLocalize.getLocales()[0].languageCode;

const resources = {
    en: { translation: english },
    ar: { translation: arabic },
    de: { translation: deutsch },
};


i18n.use(initReactI18next).init({
    resources,
    lng: deviceLanguage ?? 'en',
    fallbackLng: 'en',
});

const getLanguage = async () => {
    try {
        const storedLanguage = await AsyncStorage.getItem('language');
        if (storedLanguage) {
            console.log('Stored Language:', storedLanguage);
            I18nManager.forceRTL(storedLanguage === 'ar');
            I18nManager.allowRTL(storedLanguage === 'ar');
            i18n.changeLanguage(storedLanguage);
        }
    } catch (error) {
        console.error('Error fetching language from AsyncStorage:', error);
    }
};

getLanguage();