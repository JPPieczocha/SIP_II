import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import landingStyles from './Styles'
import logoSafeDiet from "../../assets/logo.png";
import styles from '../common/styles'
import { useNavigation } from '@react-navigation/native';

export default function Landing() {
    const navigation = useNavigation();
    
    function goToLogin(){
        navigation.navigate("LoginScreen")
    }

    function goToRegistration(){
        navigation.navigate("RegisterScreen")
    }

    return (
        <View style={landingStyles.landing_container}>
            <View
                style={landingStyles.landing_logo_container}
            >
                <Image
                    source={logoSafeDiet}
                    style={landingStyles.landing_logo}
                />
            </View>
            <Text style={[landingStyles.landing_text,landingStyles.app_welcome]}>¡Bienvenido!</Text>

            <View
                style={landingStyles.buttons_container}
            >
                 <TouchableOpacity 
                    onPress={goToLogin} 
                    style={{...styles.primaryButton, marginBottom:12}}>
                    <Text
                        style={styles.primaryButtonText}>Ingresar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={goToRegistration} 
                    style={{...styles.primaryButton, marginBottom:12}}>
                    <Text
                        style={styles.primaryButtonText}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
