import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, Modal, Dimensions } from 'react-native';
import styles from '../common/styles'
import stylesProfile from './Styles'
import stylesPlanDietario from '../planDietario/Styles'
import { FontAwesome5 } from '@expo/vector-icons';
import Fontisto from "react-native-vector-icons/Fontisto";
import colors from "../common/colors";
import { useNavigation } from '@react-navigation/native';
import Carousel, { Pagination } from "react-native-snap-carousel";
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios'
import config from '../../config';

function ProfileMyPlanDetailsScreen({route}) {
    const navigation = useNavigation();
    const [planDietario, setPlanDietario] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollRef = React.useRef();
    const [contPag, setContPag] = useState(0)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showDeleteResponseModal, setShowDeleteResponseModal] = useState(false)
    const [deleteResponseMessage, setDeleteResponseMessage] = useState("")
    

    function goToComidaDetails(item){
        navigation.navigate("PlanDetails",{
            comidaData:item
        })
    }

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

    function getPlan(){
        setLoading(true)
        return axios.get(`${config.backendURLs.planDietarioSemanalGet}?id_plan=${route.params.plan.id_plan_semanal}`)
        .then(function(response){
            setPlanDietario(response.data)
            setLoading(false)
        }).catch(function(error){
            logResponseError("Get My Plan",error)
        })
    }

    async function fetchData(){
        await getPlan();
        setLoading(false)
    }

    React.useEffect(() => {
        fetchData();
    }, []);

    function getDia(idx){
        if(idx === 0) return "Lunes"
        if(idx === 1) return "Martes"
        if(idx === 2) return "Miércoles"
        if(idx === 3) return "Jueves"
        if(idx === 4) return "Viernes"
        if(idx === 5) return "Sábado"
        if(idx === 6) return "Domingo"
    }

    function renderPlanSemanal(){
        if(planDietario != undefined){
            return planDietario.map((e,idx) => {
                return(
                    <View
                        key={idx}
                        style={{
                            height:460
                        }}
                    >
                        <View style={{
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            paddingLeft: 22,
                            paddingRight: 22,
                            paddingTop: 40,
                            paddingBottom:8
                        }}>
                            <View style={{
                                flex: 1, 
                                height: 1, 
                                backgroundColor: "#c1c1c1"
                            }} />
                            <View>
                                <Text style={{
                                    width: 90, 
                                    textAlign: 'center', 
                                    fontFamily:"SimplyDiet",
                                    fontSize:22,
                                }}>
                                    {getDia(idx)}
                                </Text>
                            </View>
                            <View style={{
                                flex: 1, 
                                height: 1, 
                                backgroundColor: "#c1c1c1"
                            }} />
                        </View>

                        {renderPlanDetails(e)}

                        <Carousel
                            data={e}
                            renderItem={renderPlanDiario}
                            sliderWidth={Dimensions.get("window").width}
                            itemWidth={Dimensions.get("window").width* .75}
                            onSnapToItem={(i) => setContPag(i)}
                        />
                    </View>
                )
            })
        }

        return null;
    }

    function renderPlanDiario({index, item}){
        if(item != undefined){
            return (
                <TouchableOpacity
                    onPress={() => goToComidaDetails(item)}
                    key={index}
                >
                    <View
                        style={stylesPlanDietario.card_template}
                    >
                    
                        <Image 
                            style={stylesPlanDietario.card_image}
                            source={{uri:item.receta.url_imagen}}
                            />
                        <View
                            style={stylesPlanDietario.text_container}
                        >
                            <Text
                                style={stylesPlanDietario.plan_item_type}
                            >{item.type.toUpperCase()}</Text>
                            <Text
                                style={stylesPlanDietario.plan_item_description}
                            >{`${item.receta.descripcion.toUpperCase()}`}</Text>
                            
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    function renderPlanDetails(item){
        return(
        <View
            style={stylesPlanDietario.container_plan_details}
        >
            <View
                style={stylesPlanDietario.container_plan_detail}
            >
            <Fontisto 
                name={"fire"} 
                color={colors.secondary} 
                size={24} 
                style={{
                        paddingTop: 8,
                        paddingBottom: 8,
                    }}
                />
                <Text
                    style={stylesPlanDietario.totals_details}
                >
                    Calorías
                </Text>
                <Text
                    style={{
                        ...stylesPlanDietario.totals_details,
                    }}
                >
                    {Math.round(item.reduce((prev,curr) => prev + curr.kcal,0)*100)/100}
                </Text>
            </View>
            <View
                style={stylesPlanDietario.container_plan_detail}
            >
                <FontAwesome5 
                    name="bread-slice" 
                    size={24} 
                    color="#D3B23A" 
                    style={{
                        paddingTop: 8,
                        paddingBottom: 8,
                    }}
                    />
                <Text
                    style={stylesPlanDietario.totals_details}
                >
                    Carbohidratos
                </Text>
                <Text
                    style={{
                        ...stylesPlanDietario.totals_details,
                    }}
                >
                    {Math.round(item.reduce((prev,curr) => prev + curr.hc,0)*100)/100}
                </Text>
            </View>
        </View>
        )
    }

    React.useEffect(() => {
        getPlan()
    }, [])


    React.useEffect( () => {
        
    }, []);

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

    const deletePlan = function(){
        setLoading(true)
        axios.delete(`${config.backendURLs.planesDietariosDelete}?id_plan=${route.params.plan.id_plan_semanal}`)
        .then(function(response){
            setLoading(false)
            setShowDeleteModal(false)
            setDeleteResponseMessage("¡Plan borrado con éxito!")
            setShowDeleteResponseModal(true)
        })
        .catch(function(error) {
            setLoading(false)
            setShowDeleteModal(false)
            setDeleteResponseMessage("¡Ocurrió un error al borrar el plan!")
            setShowDeleteResponseModal(true)
            logResponseError("Eliminar plan", error)
        })
    }

    const renderDeleteButton = function(){
        return (
            <TouchableOpacity
                style={stylesProfile.plan_delete_button}
                onPress={() => setShowDeleteModal(true)}
            >
            <Ionicons name={"trash"} color={colors.primaryv2} size={32} />
            </TouchableOpacity>
        )
    }

    return (
        <View>
            {loading ? <ActivityIndicator 
                size={'large'} 
                style={{
                    height:"100%"
                }}
                color={colors.secondary}
            />:
             <ScrollView ref={scrollRef}>

                {renderBackButton()}
                {renderDeleteButton()}

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={showDeleteModal}
                    onRequestClose={() => props.navigation.goBack()} //Back de android
                >
                    <View style={stylesProfile.modal_filter}>
                        <View style={stylesProfile.modal_container}>
                            <Text style={stylesProfile.modal_title}>Plan semanal</Text>
                            <Text style={stylesProfile.modal_description}>
                                ¿Estás seguro de quere borrar este plan?
                            </Text>

                            <TouchableOpacity style={{
                                ...stylesProfile.modal_button,
                                backgroundColor: colors.primaryv2
                            }} onPress={deletePlan}>
                                <Text style={stylesProfile.modal_button_text}>Aceptar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={stylesProfile.modal_button}  onPress={() => setShowDeleteModal(false)}>
                                <Text style={stylesProfile.modal_button_text}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={showDeleteResponseModal}
                    onRequestClose={() => props.navigation.goBack()} //Back de android
                >
                    <View style={stylesProfile.modal_filter}>
                        <View style={stylesProfile.modal_container}>
                            <Text style={stylesProfile.modal_title}>Plan semanal</Text>
                            <Text style={stylesProfile.modal_description}>
                                {deleteResponseMessage}
                            </Text>

                            <TouchableOpacity style={stylesProfile.modal_button} onPress={() => navigation.goBack()}>
                                <Text style={stylesProfile.modal_button_text}>Aceptar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                
                <View style={styles.formContainer}>
                    <View 
                        style={{
                            ...stylesPlanDietario.container,
                        }}>
                        <Text
                            style={{
                                ...stylesPlanDietario.plan_dietario_title,
                                paddingTop: 100
                            }}
                        >
                            Semana {route.params.planIdx + 1}
                        </Text>
                        
                        {renderPlanSemanal()}
                    </View>
                </View>
            </ScrollView>
            }
        </View>
       
    );
}

export default ProfileMyPlanDetailsScreen;