import React, { useState } from 'react'
import { View, ScrollView, Text, TouchableOpacity, TextInput, Image, ActivityIndicator, Modal } from 'react-native'
import registerStyles from './Styles'
import styles from '../common/styles'
import logoSafeDiet from "../../assets/logo.jpeg";
import config from '../../config';
import axios from 'axios'
import colors from './../common/colors'

export default function RegisterScreen(props) {
    const [errorText, setErrorText] = useState("");
    const [userFullName, setUserFullName] = useState("");
    const [email, setEmail] = useState("");
    const [psw, setPsw] = useState("");
    const [pswHasError, setPswHasError] = useState(false);
    const [emailHasError, setEmailHasError] = useState(false);
    const [userNameHasError, setUserNameHasError] = useState(false);
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [hasError, setHasError] = useState(false)

    function logResponseError(context,error){
        console.log("Error ocurrido en contexto: ", context)
        if (error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            console.log(error.request);
        } else {
            // Something happened in setting up the request and triggered an Error
            console.log('Error', error.message);
        }
        console.log(error);
    }

    async function validateForm(){
        if(userFullName == '') await setUserNameHasError(true)
        if(email == '') await setEmailHasError(true)
        if(psw == '') await setPswHasError(true)
    }
    
    function doRegistration(){
        validateForm();
        if(email != '' && psw != '' && userFullName != ''){
            setLoading(true)
            axios.post(config.backendURLs.registerUser,{
                nombre:userFullName.split(' ')[0],
                apellido:userFullName.split(' ')[1],
                email: email.toLowerCase(),
                password: psw
            }).then(function(response){
                setLoading(false)
                setShowModal(true)
                setEmail("")
                setPsw("")
                setUserFullName("")
             }).catch(function(error) {
                 logResponseError("Register user", error)
             })
        } else {
            setHasError(true)
            setErrorText("Por favor, complete los campos requeridos")
        }
        
    }

    function okModal(){
        setShowModal(false)
    }

    function onUserNameChange(value){
        setUserFullName(value)
        value != '' ? setUserNameHasError(false) : setUserNameHasError(true)
        value != '' && email != '' && psw != '' ? setHasError(false) : null
    }

    function onEmailChange(value){
        setEmail(value)
        value != '' ? setEmailHasError(false) : setEmailHasError(true)
        value != '' && userFullName != '' && psw != '' ? setHasError(false) : null
    }

    function onPswChange(value){
        setPsw(value)
        value != '' ? setPswHasError(false) : setPswHasError(true)
        value != '' && userFullName != '' && email != '' ? setHasError(false) : null
    }

    return (
        <View style={registerStyles.landing_container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
                onRequestClose={() => props.navigation.goBack()} //Back de android
            >
                <View style={registerStyles.modal_filter}>
                    <View style={registerStyles.modal_container}>
                        <Text style={registerStyles.modal_title}>Registro</Text>
                        <Text style={registerStyles.modal_description}>
                            ¡Cuenta creada!
                        </Text>

                        <TouchableOpacity style={registerStyles.modal_button} onPress={okModal}>
                            <Text style={registerStyles.modal_button_text}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


            {loading ? <ActivityIndicator size={'large'} color={colors.secondary}/>: 
            <ScrollView
                style={{
                    display:"flex",
                    height:"100%",
                    width:"100%",
                }}
            >
                <View
                    style={registerStyles.login_title_container}
                    >
                    <View
                        style={registerStyles.logo_container}
                    >
                        <Image
                            source={logoSafeDiet}
                            style={registerStyles.logo}
                        />
                    </View>
                    <View
                        style={{
                            display:"flex",
                            height: 70
                        }}
                    >
                        <Text
                            style={registerStyles.login_session_text}
                        >Crear Cuenta</Text>
                    </View>
                    
                </View>

                <View
                    style={{
                        paddingLeft: 8,
                        paddingRight: 8
                    }}
                >
                    <View style={styles.formGroup}>
                        <Text
                            style={{
                                ...styles.formInputLabel
                            }}
                        >Nombre y Apellido</Text>
                        <TextInput
                            style={{
                                ...styles.formInput,
                                borderColor: userNameHasError ? "red" : "#b2b2b2",
                            }}
                            onChangeText={onUserNameChange}
                            value={userFullName}
                            />
                    </View>

                    <View style={styles.formGroup}>
                        <Text
                            style={{
                                ...styles.formInputLabel
                            }}
                        >Correo electrónico</Text>
                        <TextInput
                            autoCapitalize='none'
                            autoComplete={"email"}
                            style={{
                                ...styles.formInput,
                                borderColor: emailHasError ? "red" : "#b2b2b2",
                            }}
                            onChangeText={onEmailChange}
                            value={email}
                            />
                    </View>

                    <View style={styles.formGroup}>
                        <Text
                            style={{
                                ...styles.formInputLabel
                            }}
                        >Contraseña</Text>
                        <TextInput
                            secureTextEntry={true}
                            style={{
                                ...styles.formInput,
                                borderColor: pswHasError ? "red" : "#b2b2b2",
                            }}
                            onChangeText={onPswChange}
                            value={psw}
                            />
                    </View>
                </View>

                {hasError ? <View
                    style={{
                        width:"100%"
                    }}
                >
                    <Text
                        style={{
                            fontFamily:"SimplyDiet",
                            color:"red",
                            fontSize:18,
                            textAlign:"center"
                        }}
                    >{errorText}</Text>
                </View>: null}

                <View
                    style={registerStyles.buttons_container}
                >
                    <TouchableOpacity 
                        onPress={doRegistration} 
                        style={{...styles.primaryButton, marginBottom:12}}>
                        <Text
                            style={styles.primaryButtonText}>Crear Cuenta</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            }
        </View>
    )
}
