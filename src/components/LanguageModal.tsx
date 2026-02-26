import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  I18nManager,
  NativeModules,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const LanguageModal: React.FC<Props> = ({ visible, onClose }) => {
  const { i18n } = useTranslation();

  const changeLanguage = async (lang: string) => {

    await AsyncStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
    if (lang === 'ar') {
      I18nManager.forceRTL(true);
      I18nManager.allowRTL(true);
      NativeModules.DevSettings.reload();
    }
    onClose();
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Choose Language</Text>

          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => changeLanguage('en')}
          >
            <Text style={styles.languageText}>English</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => changeLanguage('ar')}
          >
            <Text style={styles.languageText}>Arabic</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => changeLanguage('de')}
          >
            <Text style={styles.languageText}>German</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={{ color: '#fff' }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LanguageModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  languageButton: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#3b5ea7',
    borderRadius: 10,
    marginBottom: 10,
  },
  languageText: {
    textAlign: 'center',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#3b5ea7',
    padding: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
});