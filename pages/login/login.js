import React, { useState } from 'react'
import { View, ScrollView, Text, TouchableOpacity, TextInput, Image, ActivityIndicator  } from 'react-native'
import loginStyles from './Styles'
import styles from '../common/styles'
import logoSafeDiet from "../../assets/logo.jpeg";
import config from '../../config';
import axios from 'axios'
import colors from './../common/colors'
import { UserContext } from "../../context/authContext";

export default function LoginScreen({route}) {
    const [email, setEmail] = useState("");
    const [psw, setPsw] = useState("");
    const [loading, setLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [passwordHasError, setPasswordHasError] = useState(false)
    const [emailHasError, setEmailHasError] = useState(false)
    const [errorText, setErrorText] = useState("")
    const context = React.useContext(UserContext);
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

    async function getPatologiasUsuario(responseLogin){
        let loggedUserData = {
            Usuario: responseLogin.data.idUsuario,
            Celiaquia: 0,
            Tipo1: 0,
            Tipo2: 0,
            Obesidad: 0,
            Nombre: responseLogin.data.nombre,
            Mail: responseLogin.data.email,
            Clave: responseLogin.data.accessToken
        }
        axios.get(
            `${config.backendURLs.patologiasUsuariosGet}?id_usuario=${responseLogin.data.idUsuario}`
        ).then(function (response) {
            if(response.data != undefined && response.data.length > 0){
                response.data.forEach((e) => {
                    if(e.patologias.codigo == 'celiaquia'){
                        loggedUserData.Celiaquia = 1
                    }
                    if(e.patologias.codigo == 'diabetes_1'){
                        loggedUserData.Tipo1 = 1
                    }
                    if(e.patologias.codigo == 'diabetes_2'){
                        loggedUserData.Tipo2 = 2
                    }
                    if(e.patologias.codigo == 'obesidad'){
                        loggedUserData.Obesidad = 1
                    }
                })
            }
            context.authContext.signIn(loggedUserData)
        })
        .catch(function (error) {
            console.log('Error @ getPatologiasUser in App.js');
        });
    }

    async function validateForm(){
        if(psw == '') await setPasswordHasError(true)
        if(email == '') await setEmailHasError(true)
    }

    async function doLogin(){
        await validateForm()
        if(psw != '' && email != ''){
            setLoading(true)
            setHasError(false)
            axios.post(config.backendURLs.login,{
                email: email.toLowerCase(),
                password: psw
            }).then(function(response){
                if(response.status == 200){
                    getPatologiasUsuario(response)
                }
             }).catch(function(error) {
                setLoading(false)
                setHasError(true)
                if(error.response.status == 404 || error.response.status == 401){
                    setErrorText("Usuario/Clave incorrectos")
                }
                logResponseError("Register user", error)
    
             })
        } else {
            setHasError(true)
            setErrorText("Por favor, complete los campos requeridos")
        }
    }

    function onEmailChange(value){
        setEmail(value)
        value != '' ? setEmailHasError(false) : setEmailHasError(true)
        value != '' && psw != '' ? setHasError(false) : null
    }

    function onPswChange(value){
        setPsw(value)
        value != '' ? setPasswordHasError(false) : setPasswordHasError(true)
        value != '' && email != '' ? setHasError(false) : null
    }

    return (
        <View style={loginStyles.landing_container}>
            {loading ? <ActivityIndicator size={'large'} color={colors.secondary}/>: 
            <ScrollView
                style={{
                    width:"100%"
                }}
                contentContainerStyle={{
                    display:"flex",
                    justifyContent:"center",
                    height:"100%",
                    width:"100%",
                }}>
                <View
                    style={loginStyles.login_title_container}
                    >
                    <View
                        style={loginStyles.logo_container}
                    >
                        <Image
                            source={logoSafeDiet}
                            style={loginStyles.logo}
                        />
                    </View>
                    <View
                        style={{
                            display:"flex",
                            height: 70
                        }}
                    >
                        <Text
                            style={loginStyles.login_session_text}
                        >Iniciar Sesión</Text>
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
                        >Correo electrónico</Text>
                        <TextInput
                            autoComplete={"email"}
                            autoCapitalize={'none'}
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
                            style={
                                {
                                    ...styles.formInput,
                                    borderColor: passwordHasError ? "red" : "#b2b2b2",
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
                    style={loginStyles.buttons_container}
                >
                    <TouchableOpacity 
                        onPress={doLogin} 
                        style={{...styles.primaryButton, marginBottom:12}}>
                        <Text
                            style={styles.primaryButtonText}>Ingresar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            }
        </View>
    )
}
