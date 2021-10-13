import React, { useState } from 'react';
import { Text, View, TextInput, CheckBox, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import styles from './common/styles'
import logo from './../assets/logo.jpeg'
import axios from 'axios'
import { render } from 'react-dom';
import config from '../config';



function ProfileScreen() {
    let fullName = config.currentUser.fullName
    let email = config.currentUser.email
    const [diabetes, setDiabetesSelection] = useState(false);
    const [celiaquia, setCeliaquiaSelection] = useState(false);
    const [obesidad, setObesidadSelection] = useState(false);
    const [patologias, setPatologias] = useState([])
    const [patologiasUsuario, setPatologiasUsuario] = useState([])

    async function getPatologias(){
        await axios.get(config.backendURLs.patologiasList).then(function(response){
            setPatologias(response.data)
        }).catch(function(error) {
            console.log(error)
        })
    }

    async function getPatologiasByUser(){
        await axios.get(config.backendURLs.patologiasUsuariosList).then(function(response){
            let patologias = []
            if(response.data != undefined && response.data.length > 0){
                response.data.forEach((e) => {
                    if(e.id_usuario === config.currentUser.id){
                        patologias.push(e)
                    }
                })
            }
            setPatologiasUsuario(patologias)
        }).catch(function(error) {
            console.log(error)
        })
    }

    React.useEffect( () => {
        getPatologias();
    }, []);

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

    function updatePatologias(){
        if(diabetes){
            let diabetesId = patologias.find((e) => e.descripcion === "Diabetes").id_patologia;
            updatePatologia(diabetesId)
        }

        if(celiaquia){
            let celiaquiaId = patologias.find((e) => e.descripcion === "Celiaquía").id_patologia;
            updatePatologia(celiaquiaId)
        }

        if(obesidad){
            let obesidadId = patologias.find((e) => e.descripcion === "Diabetes").id_patologia;
            updatePatologia(obesidadId)
        }

        Alert.alert(
            "Patologías",
            "Patologías actualizadas!"
        )
    }

    async function updatePatologia(idPatologia){
        await axios.post(config.backendURLs.patologiasUsuariosCreate,{
            patologia:idPatologia,
            usuario: config.currentUser.id,
        }).then(function(response){
            
        }).catch(function(error) {
            console.log(error)
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