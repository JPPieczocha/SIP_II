import React, { useState } from 'react';
import { Text, View, TextInput, CheckBox, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import styles from './common/styles'
import logo from './../assets/logo.jpeg'
import axios from 'axios'
import config from '../config';

function ProfileScreen() {
    let fullName = config.currentUser.fullName
    let email = config.currentUser.email
    let self = this;
    const [diabetes, setDiabetesSelection] = useState(false);
    const [celiaquia, setCeliaquiaSelection] = useState(false);
    const [obesidad, setObesidadSelection] = useState(false);
    const [patologias, setPatologias] = useState([])
    const [patologiasUsuario, setPatologiasUsuario] = useState([])
 
    const getPatologias = () => {
        return axios.get(config.backendURLs.patologiasList).then(function(response){
            setPatologias(response.data)    
        })
    } 

    const getPatologiasByUser = () => {
        axios.get(config.backendURLs.patologiasUsuariosList).then(function(response){
            let patologias_usuarios = []
            if(response.data != undefined && response.data.length > 0){
                response.data.forEach((e) => {
                    if(e.id_usuario == config.currentUser.id){
                        patologias_usuarios.push(e)
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
                    }
                })
                setPatologiasUsuario(patologias_usuarios)
            }
            
        }).catch(function(error) {
            console.log(error)
        })
    }

    async function fetchData(){
        await getPatologias();
    }

    React.useEffect(() => {
        fetchData();
    }, []);

    React.useEffect(() => {
        getPatologiasByUser();
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
        fetchData();
        Alert.alert(
            "Patologías",
            "Patologías actualizadas!"
        )
    }

    function updatePatologia(idPatologia){
        return axios.post(config.backendURLs.patologiasUsuariosCreate,{
            patologia:idPatologia,
            usuario: config.currentUser.id,
        }).then(function(response){
            
        }).catch(function(error) {
            console.log(error)
        })
    }

    function deletePatologia(idPatologia){
        return axios.delete(`${config.backendURLs.patologiasUsuariosDelete}?id_patologia=${idPatologia}&id_usuario=${config.currentUser.id}`)
        .then(function(response){

        })
        .catch(function(error) {
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
        })
    }

    return (
        <ScrollView>
            <View style={styles.formContainer}>
                <View style={styles.formHeader}>
                    <Image
                    style={styles.logoIcon}
                    source={logo} />
                </View>
                
                <View style={styles.formGroup}>
                    <Text>Nombre y Apellido</Text>
                    <TextInput
                        editable={false}
                        style={styles.formInput}
                        onChangeText={text => onChangeText(text)}
                        value={fullName}
                        />
                </View>

                <View style={styles.formGroup}>
                    <Text>Correo electrónico</Text>
                    <TextInput
                        editable={false}
                        style={styles.formInput}
                        value={email}
                        />
                </View>
                
                <View style={styles.formGroup}>
                    <Text>Patologías</Text>
                    {renderPatologias(patologias)}
                    
                </View>

                <View style={styles.centeredContent}>
                    <TouchableOpacity 
                        onPress={updatePatologias} 
                        style={styles.primaryButton}>
                        <Text
                            style={styles.primaryButtonText}>Guardar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

export default ProfileScreen;