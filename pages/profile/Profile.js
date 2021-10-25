import React, { useState } from 'react';
import { Text, View, TextInput, CheckBox, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import styles from '../common/styles'
import stylesProfile from './Styles'
import logo from '../../assets/logo.jpeg';

import axios from 'axios'
import config from '../../config';

function ProfileScreen(props) {
    let fullName = props != undefined && props.userData != undefined && props.userData.apellido != undefined && props.userData.nombre != undefined? `${props.userData.apellido} ${props.userData.nombre}` : ""
    let email = props != undefined && props.userData != undefined ? props.userData.email : ""
    const [diabetes, setDiabetesSelection] = useState(false);
    const [celiaquia, setCeliaquiaSelection] = useState(false);
    const [obesidad, setObesidadSelection] = useState(false);
    const [patologias, setPatologias] = useState([])
    const [patologiasUsuario, setPatologiasUsuario] = useState([])

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
 
    const getPatologias = () => {
        return axios.get(config.backendURLs.patologiasList)
        .then(function(response){
            setPatologias(response.data)    
        }).catch(function(error){
            logResponseError("Get patologías",error)
        })
    } 

    const setPatologiasByUser = () => {
        if(props != undefined && props.userData != undefined){
            if(props.userData != undefined && props.userData.patologias.length > 0){
                props.userData.patologias.forEach((e) => {
                    let patologia = patologias.find((f) => f.id_patologia == e.id_patologia)
                    if(patologia != undefined){
                        switch(patologia.descripcion){
                            case "Celiaquía": setCeliaquiaSelection(true)
                                break;
                            case "Obesidad": setObesidadSelection(true)
                                break;
                            case "Diabetes": setDiabetesSelection(true)
                                break;
                        }
                    }
                })
            }
        }
    }

    async function fetchData(){
        await getPatologias();
    }

    React.useEffect(() => {
        fetchData();
    }, []);

    React.useEffect(() => {
        setPatologiasUsuario(props.userData.patologias)
        setPatologiasByUser();
    }, [patologias])

    function renderPatologias(list){
        if(list != undefined){
            return list.map((e) => {
                switch(e.descripcion){
                    case "Celiaquía": 
                        return(
                            <View
                                key={e.id_patologia} 
                                style={styles.checkBoxContainer}>
                                <CheckBox
                                    style={styles.checkBox}
                                    value={celiaquia}
                                    onValueChange={setCeliaquiaSelection}
                                    />
                                <Text style={styles.checkboxLabel}>Celiaquía</Text>
                            </View>
                        )
                        case "Diabetes": 
                        return(
                            <View 
                                key={e.id_patologia} 
                                style={styles.checkBoxContainer}>
                                <CheckBox
                                    style={styles.checkBox}
                                    value={diabetes}
                                    onValueChange={setDiabetesSelection}
                                    />
                                <Text style={styles.checkboxLabel}>Diabetes</Text>
                            </View>
                        )

                        case "Obesidad": 
                        return(
                            <View 
                                key={e.id_patologia} 
                                style={styles.checkBoxContainer}>
                                <CheckBox
                                    style={styles.checkBox}
                                    value={obesidad}
                                    onValueChange={setObesidadSelection}
                                    />
                                <Text style={styles.checkboxLabel}>Obesidad</Text>
                            </View>
                        )
                }
                
            })
        }
    }

    async function updatePatologias(){
        let userHadDiabetes = patologiasUsuario.find((e) => e.patologias.descripcion === "Diabetes") != undefined ? true : false;
        let userHadCeliaquia = patologiasUsuario.find((e) => e.patologias.descripcion === "Celiaquía") != undefined ? true : false;
        let userHadObesidad = patologiasUsuario.find((e) => e.patologias.descripcion === "Obesidad") != undefined ? true : false;
        
        if(diabetes){
            let patologia = patologias.find((e) => e.descripcion === "Diabetes");
            if(!userHadDiabetes){
                await updatePatologia(patologia.id_patologia)
            }
        } else {
            if(userHadDiabetes){
                let patologia = patologiasUsuario.find((e) => e.patologias.descripcion === "Diabetes");
                if(patologia != undefined){
                    await deletePatologia(patologia.id_patologia)
                    setDiabetesSelection(false)
                }
            }
        }

        if(celiaquia){
            let patologia = patologias.find((e) => e.descripcion === "Celiaquía");
            if(!userHadCeliaquia){
                await updatePatologia(patologia.id_patologia)
            }
        } else {
            if(userHadCeliaquia){
                let patologia = patologiasUsuario.find((e) => e.patologias.descripcion === "Celiaquía"); 
                if(patologia != undefined){
                    await deletePatologia(patologia.id_patologia)
                    setCeliaquiaSelection(false)
                }
            }
        }

        if(obesidad){
            let patologia = patologias.find((e) => e.descripcion === "Obesidad");
            if(!userHadObesidad){
                await updatePatologia(patologia.id_patologia)
            }
        } else {
            if(userHadObesidad){
                let patologia = patologiasUsuario.find((e) => e.patologias.descripcion === "Obesidad");
                if(patologia != undefined){
                    await deletePatologia(patologia.id_patologia)
                    setObesidadSelection(false)
                }
            }
        }
        props.onProfileUpdate();
        Alert.alert(
            "Patologías",
            "Patologías actualizadas!"
        )
    }

    function updatePatologia(idPatologia){
        return axios.post(config.backendURLs.patologiasUsuariosCreate,{
            patologia:idPatologia,
            usuario: props != undefined && props.userData != undefined ? props.userData.id_usuario : 0,
        }).then(function(response){
            
        }).catch(function(error) {
            logResponseError("Create patologia", error)
        })
    } 

    function deletePatologia(idPatologia){
        if(props != undefined && props.userData != undefined){
            return axios.delete(`${config.backendURLs.patologiasUsuariosDelete}?id_patologia=${idPatologia}&id_usuario=${props.userData.id_usuario}`)
            .then(function(response){
    
            })
            .catch(function(error) {
                logResponseError("Eliminar patología", error)
            })
        }
        
    }

    return (
        <ScrollView>
            <View style={styles.formContainer}>
                <View style={styles.formHeader}>
                    <Image
                    style={styles.logoIcon}
                    source={logo} />
                </View>

                <Text
                    style={{
                        ...stylesProfile.profile_title,
                        textAlign:"center"  
                    }}
                >
                    Perfil
                </Text>
                
                <View style={styles.formGroup}>
                    <Text
                        style={{
                            ...styles.formInputLabel
                        }}
                    >Nombre y Apellido</Text>
                    <TextInput
                        editable={false}
                        style={styles.formInput}
                        onChangeText={text => onChangeText(text)}
                        value={fullName}
                        />
                </View>

                <View style={styles.formGroup}>
                    <Text
                        style={{
                            ...styles.formInputLabel
                        }}
                    >Correo electrónico</Text>
                    <TextInput
                        editable={false}
                        style={styles.formInput}
                        value={email}
                        />
                </View>
                
                <View style={
                    {
                        ...styles.formGroup,
                        paddingTop:20
                    }}>
                    <Text
                        style={{
                            ...stylesProfile.patologias_title
                        }}
                    >Patologías</Text>
                    {renderPatologias(patologias)}
                    
                </View>

                <View style={styles.centeredContent}>
                    <TouchableOpacity 
                        onPress={updatePatologias} 
                        style={{
                            ...styles.primaryButton,
                            marginTop:24
                        }}>
                        <Text
                            style={styles.primaryButtonText}>Guardar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

export default ProfileScreen;