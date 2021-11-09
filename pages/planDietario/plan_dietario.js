import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, Modal, Dimensions } from 'react-native';
import styles from '../common/styles'
import axios from 'axios'
import config from '../../config';
import { useIsFocused } from '@react-navigation/native'
import stylesPlanDietario from './Styles'
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'
import Fontisto from "react-native-vector-icons/Fontisto";
import Color from "../common/colors";
import { useNavigation } from '@react-navigation/native';
import Carousel, { Pagination } from "react-native-snap-carousel";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserContext } from "../../context/authContext";

function PlanDietarioScreen() {
    const navigation = useNavigation();
    const [planDietario, setPlanDietario] = useState([]);
    const [patologiasUsuario, setPatologiasUsuario] = useState({});
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showModalFav, setShowModalFav] = useState(false);
    const [fav, setFav] = useState(false);
    const scrollRef = React.useRef();
    const [contPag, setContPag] = useState(0)
    const context = React.useContext(UserContext);
    const userData = context.state != undefined && context.state.userData != undefined ? context.state.userData : {}
    
    function setPlanFav(){
        setLoading(true)
        axios.post(config.backendURLs.planDietarioSemanalSave,{
            id_usuario: userData.Usuario,
            plan:planDietario
        }).then(function(response){
            setLoading(false)
            setShowModalFav(true)
            setFav(true)
        }).catch(function(error) {
            logResponseError("Create patologia", error)
        })
    }

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

    async function setPlan(plan){
        await setPlanDietario(plan)
    }

    async function getPlan(){
        setLoading(true)

        await axios.get(`${config.backendURLs.planDietarioSemanal}?aptoCeliaco=${patologiasUsuario.aptoCeliaco == 1 ? true : false}&aptoDiabetico1=${patologiasUsuario.aptoDiabetes1 == 1 ? true : false}&aptoDiabetico2=${patologiasUsuario.aptoDiabetes2 == 1 ? true : false}&aptoObesidad=${patologiasUsuario.aptoObesidad == 1 ? true : false}`)
        .then(function(response){
            setPlan(response.data)
            setFav(false)
            scrollRef.current?.scrollTo({
                y: 0,
                animated: true,
            });
            setLoading(false)
        }).catch(function(error) {
            logResponseError("Get Plan Dietario Semanal",error)
        })
    }

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
                color={Color.secondary} 
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

    function renderPatologiasText(){
        return (
            <View
                style={{
                    display:"flex",
                    flexDirection:"row",
                }}
            >
                {patologiasUsuario.aptoCeliaco ? 
                <View
                    style={{
                        ...stylesPlanDietario.container_patologias,
                    }}
                >
                    <Text
                        style={{
                            ...stylesPlanDietario.patologias_text,
                        }}
                    >Celiaco</Text>
                    <AntDesign name="checkcircleo" size={16} color="#2BA174" />
                </View> : null}
                {patologiasUsuario.aptoDiabetes1 || patologiasUsuario.aptoDiabetes2 ? 
                <View
                    style={{
                        ...stylesPlanDietario.container_patologias,
                    }}
                >
                    <Text
                        style={{
                            ...stylesPlanDietario.patologias_text,
                        }}
                    >
                        Diabetes
                    </Text>
                    <AntDesign name="checkcircleo" size={16} color="#2BA174" />
                </View> : null}
                {patologiasUsuario.aptoObesidad ? 
                <View
                    style={
                        {
                            ...stylesPlanDietario.container_patologias,
                        }}
                >
                    <Text
                        style={{
                            ...stylesPlanDietario.patologias_text,
                        }}>Obesidad</Text>
                    <AntDesign name="checkcircleo" size={16} color="#2BA174" />
                </View> : null}
            </View>
        )
    }

    function refreshUserData(){
        let aptoDiabetes1 = false;
        let aptoDiabetes2 = false;
        let aptoCeliaco = false;
        let aptoObesidad = false;

        if(userData != undefined && (userData.Tipo1 || userData.Tipo2 || userData.Celiaquia || userData.Obesidad)){
            aptoDiabetes1 = userData.Tipo1
            aptoDiabetes2 = userData.Tipo2
            aptoCeliaco = userData.Celiaquia
            aptoObesidad = userData.Obesidad
        } else {
            setShowModal(true)
        }

        if(aptoCeliaco != patologiasUsuario.aptoCeliaco || 
            aptoDiabetes1 != patologiasUsuario.aptoDiabetes1 ||
            aptoDiabetes2 != patologiasUsuario.aptoDiabetes2 ||
            aptoObesidad != patologiasUsuario.aptoObesidad){
                setPatologiasUsuario({
                    aptoCeliaco: aptoCeliaco,
                    aptoDiabetes1: aptoDiabetes1,
                    aptoDiabetes2: aptoDiabetes2,
                    aptoObesidad: aptoObesidad
                })
            } else{
                setLoading(false)
            }
    }

    React.useEffect(() => {
        getPlan()
    }, [patologiasUsuario])

    const isFocused = useIsFocused()

    React.useEffect(() => {
        //Update the state you want to be updated
        if(isFocused){
            setLoading(true)
            refreshUserData()
        }
    } , [isFocused])

    React.useEffect( () => {
        
    }, []);

    function okModal(){
        setShowModalFav(false);
    }

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
            >
                <View style={stylesPlanDietario.modal_filter}>
                    <View style={stylesPlanDietario.modal_container}>
                        <Text style={stylesPlanDietario.modal_title}>Plan dietario</Text>
                        <Text style={stylesPlanDietario.modal_description}>
                            Debe cargar patologías en su perfíl para ver el plan dietario.
                        </Text>

                        <TouchableOpacity style={stylesPlanDietario.modal_button} onPress={() => setShowModal(false)}>
                            <Text style={stylesPlanDietario.modal_button_text}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={showModalFav}
                onRequestClose={() => props.navigation.goBack()} //Back de android
            >
                <View style={stylesPlanDietario.modal_filter}>
                    <View style={stylesPlanDietario.modal_container}>
                        <Text style={stylesPlanDietario.modal_title}>Favoritos</Text>
                        <Text style={stylesPlanDietario.modal_description}>
                            ¡Semana guardada en favoritos!
                        </Text>

                        <TouchableOpacity style={stylesPlanDietario.modal_button} onPress={okModal}>
                            <Text style={stylesPlanDietario.modal_button_text}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {loading ? <ActivityIndicator 
                size={'large'} 
                style={{
                    height:"100%"
                }}
                color={Color.secondary}
            />:
             <ScrollView ref={scrollRef}>
                 <TouchableOpacity style={stylesPlanDietario.button_fav} onPress={() => setPlanFav()}>
                    <Ionicons name={fav ? 'heart' :'heart-outline'} color={Color.secondary} size={32} />
                </TouchableOpacity>
                <View style={styles.formContainer}>
                    <View 
                        style={{
                            ...stylesPlanDietario.container,
                        }}>
                        <Text
                            style={{
                                ...stylesPlanDietario.plan_dietario_title,
                                paddingTop: 120
                            }}
                        >
                            Plan Semanal
                        </Text>
                        
                        {renderPatologiasText()}
                            
                        {renderPlanSemanal()}
                    </View>
    
                    {planDietario != undefined && planDietario.length > 0 ? 
                        <View style={styles.centeredContent}>
                            <TouchableOpacity 
                                onPress={getPlan} 
                                style={{...styles.primaryButton, marginBottom:12}}>
                                <Text
                                    style={styles.primaryButtonText}>Generar otro!</Text>
                            </TouchableOpacity>
                        </View>
                    : null 
                    }

                </View>
            </ScrollView>
            }
        </View>
       
    );
}

export default PlanDietarioScreen;