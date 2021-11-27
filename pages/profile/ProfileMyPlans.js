import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import styles from '../common/styles'
import stylesProfile from './Styles'
import axios from 'axios'
import config from '../../config';
import colors from '../common/colors';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { UserContext } from "../../context/authContext";

function ProfileMyPlansScreen() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true)
    const [planes, setPlanes] = useState([])
    const context = React.useContext(UserContext);
    const userData = context.state != undefined && context.state.userData != undefined ? context.state.userData : {}
    
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

    function getMyPlans(){
        setLoading(true)
        return axios.get(`${config.backendURLs.planesDietariosFavoritos}?id_usuario=${userData.Usuario}`)
        .then(function(response){
            setPlanes(response.data)    
            setLoading(false)
        }).catch(function(error){
            logResponseError("Get My Plans",error)
        })
    }

    async function fetchData(){
        await getMyPlans();
        setLoading(false)
    }

    React.useEffect(() => {
        fetchData();
    }, []);

    const isFocused = useIsFocused()

    React.useEffect(() => {
        //Update the state you want to be updated
        if(isFocused){
            fetchData()
        }
    } , [isFocused])

    function goToPlanDetails(idx){
        navigation.navigate("ProfileMyPlanDetails",{
            planIdx:idx,
            plan:planes[idx]
        })
    }

    function renderNoPlanMessage(){
        return (
            <View
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
                <Text
                    style={{
                        textAlign:"center",
                        fontSize:14,
                        fontStyle:"italic",
                        lineHeight:20
                    }}
                >Aquí se verán los planes semanales que guardes desde la solapa 'Plan'</Text>
            </View>
        )
    }

    function renderMyPlans(list){
        if(list == undefined || list.length == 0) return renderNoPlanMessage()
        return list.map((e,idx) => {
            return (
                <TouchableOpacity
                    key={idx}
                    onPress={() => goToPlanDetails(idx)}
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
                                paddingBottom: 4
                            }}
                        >
                            Semana {idx + 1}
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
            )
        })
    }

    const renderBackButton = function(){
        return (
            <TouchableOpacity
                style={stylesProfile.profile_back_button}
                onPress={() => navigation.goBack()}
            >
            <Ionicons name={"arrow-back"} color={colors.secondary} size={32} />
            </TouchableOpacity>
        )
    }

    return (
        <View style={{
            ...styles.container,
            display:"flex",
            width:"100%",
            height:"100%",
            }} showsVerticalScrollIndicator={false}>
                {loading ? <ActivityIndicator size={'large'} color={colors.secondary}/>: 
                    <View style={{
                        ...styles.container,
                        display:"flex",
                        width:"100%",
                        height:"100%",
                        }} showsVerticalScrollIndicator={false}>

                        {renderBackButton()}
                        
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
                                    <Text
                                        style={{
                                            fontFamily: 'SimplyDiet',
                                            textTransform: "uppercase", 
                                            fontSize: 40, 
                                            paddingBottom: 30, 
                                            textDecorationLine: "underline",
                                            textAlign: "center",
                                            paddingTop: 80
                                        }}
                                    >
                                        Mis Semanas
                                    </Text>
                                {renderMyPlans(planes)}
                            </View>
                        </ScrollView>
                    </View>
                }
        </View>
        
        
    );
}

export default ProfileMyPlansScreen;