import React, { useState } from 'react';
import { Text, View, TextInput, CheckBox, TouchableOpacity, ScrollView, Image, ActivityIndicator, Modal } from 'react-native';
import styles from '../common/styles'
import stylesProfile from './Styles'
import logo from '../../assets/logo.jpeg';
import Color from "../common/colors";
import axios from 'axios'
import config from '../../config';

function ProfileScreen(props) {
    let fullName = props != undefined && props.userData != undefined && props.userData.apellido != undefined && props.userData.nombre != undefined? `${props.userData.apellido} ${props.userData.nombre}` : ""
    let email = props != undefined && props.userData != undefined ? props.userData.email : ""
    const [diabetes1, setDiabetes1Selection] = useState(false);
    const [diabetes2, setDiabetes2Selection] = useState(false);
    const [celiaquia, setCeliaquiaSelection] = useState(false);
    const [obesidad, setObesidadSelection] = useState(false);
    const [patologias, setPatologias] = useState([])
    const [patologiasUsuario, setPatologiasUsuario] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)

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
            if(props.userData != undefined && props.userData.patologias != undefined && props.userData.patologias.length > 0){
                props.userData.patologias.forEach((e) => {
                    let patologia = patologias.find((f) => f.id_patologia == e.id_patologia)
                    if(patologia != undefined){
                        switch(patologia.codigo){
                            case "celiaquia": setCeliaquiaSelection(true)
                                break;
                            case "obesidad": setObesidadSelection(true)
                                break;
                            case "diabetes_1": setDiabetes1Selection(true)
                                break;
                            case "diabetes_2": setDiabetes2Selection(true)
                                break;
                        }
                    }
                })
            }
        }
    }

    async function fetchData(){
        await getPatologias();
        setLoading(false)
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
            return list.sort(function(a,b){
                if (a.descripcion > b.descripcion) {
                    return 1;
                  }
                  if (a.descripcion < b.descripcion) {
                    return -1;
                  }
                  return 0;
            }).map((e) => {
                switch(e.codigo){
                    case "celiaquia": 
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
                        case "diabetes_1": 
                        return(
                            <View 
                                key={e.id_patologia} 
                                style={styles.checkBoxContainer}>
                                <CheckBox
                                    style={styles.checkBox}
                                    value={diabetes1}
                                    onValueChange={setDiabetes1Selection}
                                    />
                                <Text style={styles.checkboxLabel}>Diabetes Tipo 1</Text>
                            </View>
                        )

                        case "diabetes_2": 
                        return(
                            <View 
                                key={e.id_patologia} 
                                style={styles.checkBoxContainer}>
                                <CheckBox
                                    style={styles.checkBox}
                                    value={diabetes2}
                                    onValueChange={setDiabetes2Selection}
                                    />
                                <Text style={styles.checkboxLabel}>Diabetes Tipo 2</Text>
                            </View>
                        )

                        case "obesidad": 
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
        setLoading(true)
        let userHadDiabetes1 = patologiasUsuario.find((e) => e.patologias.codigo === "diabetes_1") != undefined ? true : false;
        let userHadDiabetes2 = patologiasUsuario.find((e) => e.patologias.codigo === "diabetes_2") != undefined ? true : false;
        let userHadCeliaquia = patologiasUsuario.find((e) => e.patologias.codigo === "celiaquia") != undefined ? true : false;
        let userHadObesidad = patologiasUsuario.find((e) => e.patologias.codigo === "obesidad") != undefined ? true : false;
        
        if(diabetes1){
            let patologia = patologias.find((e) => e.codigo === "diabetes_1");
            if(!userHadDiabetes1){
                await updatePatologia(patologia.id_patologia)
            }
        } else {
            if(userHadDiabetes1){
                let patologia = patologiasUsuario.find((e) => e.patologias.codigo === "diabetes_1");
                if(patologia != undefined){
                    await deletePatologia(patologia.id_patologia)
                    setDiabetes1Selection(false)
                }
            }
        }

        if(diabetes2){
            let patologia = patologias.find((e) => e.codigo === "diabetes_2");
            if(!userHadDiabetes2){
                await updatePatologia(patologia.id_patologia)
            }
        } else {
            if(userHadDiabetes2){
                let patologia = patologiasUsuario.find((e) => e.patologias.codigo === "diabetes_2");
                if(patologia != undefined){
                    await deletePatologia(patologia.id_patologia)
                    setDiabetes2Selection(false)
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
        setShowModal(true)
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

    function okModal(){
        setShowModal(false);
        props.onProfileUpdate();
    }

    return (
        <View style={{
            ...styles.container,
            display:"flex",
            width:"100%",
            height:"100%",
            }} showsVerticalScrollIndicator={false}>

            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
                onRequestClose={() => props.navigation.goBack()} //Back de android
            >
                <View style={stylesProfile.modal_filter}>
                    <View style={stylesProfile.modal_container}>
                        <Text style={stylesProfile.modal_title}>Patologias</Text>
                        <Text style={stylesProfile.modal_description}>
                            ¡Patologías actualizadas!
                        </Text>

                        <TouchableOpacity style={stylesProfile.modal_button} onPress={okModal}>
                            <Text style={stylesProfile.modal_button_text}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {loading ? <ActivityIndicator size={'large'} color={Color.secondary}/>: 
            
            <ScrollView 
                style={{
                    width:"100%"
                }}
            >
                <View style={
                    {
                        ...styles.formContainer,
                        display:"flex",
                        width:"100%",
                        paddingLeft:14,
                        paddingRight: 14
                    }
                    }>
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
                                marginTop:8,
                                marginBottom: 20
                            }}>
                            <Text
                                style={styles.primaryButtonText}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            }
        </View>
    );
}

export default ProfileScreen;