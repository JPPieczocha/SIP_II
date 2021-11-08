import React, { useState } from 'react';
import { Text, View, TextInput, CheckBox, TouchableOpacity, ScrollView, Image, ActivityIndicator, Modal } from 'react-native';
import styles from '../common/styles'
import stylesProfile from './Styles'
import logo from '../../assets/logo.jpeg';
import axios from 'axios'
import config from '../../config';
import colors from '../common/colors';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function ProfileScreen(props) {
    const navigation = useNavigation();
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

    function goToMyData(){
        navigation.navigate("ProfileMyData",props)
    }

    function goToMyPlans(){
        navigation.navigate("ProfileMyPlans",props)
    }

    return (
        <View style={{
            ...styles.container,
            display:"flex",
            width:"100%",
            height:"100%",
            }} showsVerticalScrollIndicator={false}>
            
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
                    <View style={{
                        height: 150,
                        display:"flex",
                        flexDirection:"row"
                    }}>
                        <View
                            style={{
                                display:"flex",
                                justifyContent:"center",
                                alignSelf:"center",
                                borderWidth: 1,
                                borderColor:colors.secondary,
                                borderRadius: 40,
                                height:70,
                                padding: 10
                            }}
                        >
                            <Image
                            style={{
                                ...styles.logoIcon,
                            }}
                            source={logo} />
                        </View>
                        <View
                            style={{
                                display:"flex",
                                justifyContent:"center",
                                width:"100%",
                                paddingLeft: 14
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily:"SimplyDiet",
                                    fontSize: 26,
                                    paddingBottom: 4
                                }}
                            >
                                {fullName}
                            </Text>

                            <Text
                                style={{
                                    fontFamily:"SimplyDiet",
                                    fontSize: 14
                                }}
                            >
                                {email}
                            </Text>
                        </View>
                    </View>
                    
                    <TouchableOpacity
                        onPress={() => goToMyData()}
                        style={{
                            padding: 12,
                            marginBottom: 20,
                            backgroundColor:"rgba(0,0,0,0.030)",
                            position: "relative",
                            display:"flex",
                            flexDirection:"row",
                            borderRadius:22
                        }}
                    >
                        <View
                            style={{
                                display: "flex",
                                paddingRight: 12,
                                alignSelf:"center"
                            }}
                        >
                            <FontAwesome5 
                                name="user" 
                                size={28} 
                            color="black" />
                        </View>
                        <View
                            style={{
                                display: "flex",
                                justifyContent:"center",
                                width:"60%"
                            }}
                        >
                        
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily:"SimplyDiet",
                                    paddingBottom: 4
                                }}
                            >Mis Datos</Text>
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontFamily:"SimplyDiet"  
                                }}
                            >
                                Información y patologías del usuario
                            </Text>
                            
                        </View>

                        <EvilIcons 
                            name="chevron-right" 
                            size={34} 
                            color={colors.primary}
                            style={{
                                position: "absolute",
                                right:10,
                                top:"50%"
                            }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => goToMyPlans()}
                        style={{
                            height: 70,
                            padding: 12,
                            marginBottom: 20,
                            backgroundColor:"rgba(0,0,0,0.030)",
                            position: "relative",
                            display:"flex",
                            flexDirection:"row",
                            borderRadius:22
                        }}
                    >
                        <View
                            style={{
                                display: "flex",
                                paddingRight: 12,
                                alignSelf:"center"
                            }}
                        >
                            <MaterialCommunityIcons
                                name="food-variant" 
                                size={28} 
                                color="black" 
                            />
                        </View>
                        <View
                            style={{
                                display: "flex",
                                justifyContent:"center",
                                width:"60%"
                            }}
                        >
                        
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontFamily:"SimplyDiet"  
                                }}
                            >Mis Semanas</Text>
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontFamily:"SimplyDiet"  
                                }}
                            >
                                Planes semanales favoritos
                            </Text>
                            
                        </View>

                        <EvilIcons 
                            name="chevron-right" 
                            size={34} 
                            color={colors.primary}
                            style={{
                                position: "absolute",
                                right:10,
                                top:"50%"
                            }}
                        />
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    );
}

export default ProfileScreen;