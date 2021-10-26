import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import styles from '../common/styles'
import logo from '../../assets/logo.jpeg';
import axios from 'axios'
import config from '../../config';
import { useIsFocused } from '@react-navigation/native'
import stylesPlanDietario from './Styles'
import { FontAwesome5 } from '@expo/vector-icons';
import StylePlanDietario from './Styles';


function PlanDietarioScreen(props) {
    const [planDietario, setPlanDietario] = useState([]);
    const [patologiasUsuario, setPatologiasUsuario] = useState({});
    const scrollRef = React.useRef();

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

    async function getPlan(){
        await axios.get(`${config.backendURLs.planDietario}?aptoCeliaco=${patologiasUsuario.aptoCeliaco}&aptoDiabetico1=${patologiasUsuario.aptoDiabetes1}&aptoDiabetico2=${patologiasUsuario.aptoDiabetes2}&aptoObesidad=${patologiasUsuario.aptoObesidad}`)
        .then(function(response){
            setPlanDietario(response.data)
            scrollRef.current?.scrollTo({
                y: 0,
                animated: true,
            });
        }).catch(function(error) {
            logResponseError("Get Plan Dietario",error)
        })
    }

    function renderPlan(list){
        if(list != undefined){
            return list.map((e, index) => {
                return (<View
                            key={index}
                            style={stylesPlanDietario.card_template}
                        >
                        
                        <Image 
                            style={stylesPlanDietario.card_image}
                            source={{uri:e.receta.url_imagen}}
                        />
                        <View
                            style={stylesPlanDietario.text_container}
                        >
                            <Text
                                style={stylesPlanDietario.plan_item_type}
                            >{e.type.toUpperCase()}</Text>
                            <Text
                                style={stylesPlanDietario.plan_item_description}
                            >{e.receta.descripcion.toUpperCase()}</Text>
                            <Text
                                style={stylesPlanDietario.plan_item_details_quantites}
                            >Cantidades: {e.receta.cantidades}</Text>
                            <Text
                                style={stylesPlanDietario.plan_item_details_kcal}
                            >KCalorias: {Math.round(e.kcal*100)/100}</Text>
                        </View>
                    </View>
                )
            })
        }
    }

    function renderPlanDetails(){
        return(
        <View
            style={{
                display:"flex",
                padding: 12,
                flexDirection:"row",
                marginTop: 8,
                marginBottom: 8,
            }}
        >
            <View
                style={StylePlanDietario.container_plan_detail}
            >
                <FontAwesome5 
                    name="fire" 
                    size={24} 
                    color="#D15493"
                    style={{
                        paddingTop: 8,
                        paddingBottom: 8,
                    }}
                />
                <Text
                    style={StylePlanDietario.totals_details}
                >
                    Calorías
                </Text>
                <Text
                    style={{
                        ...StylePlanDietario.totals_details,
                    }}
                >
                    {Math.round(planDietario.reduce((prev,curr) => prev + curr.kcal,0)*100)/100}
                </Text>
            </View>
            <View
                style={StylePlanDietario.container_plan_detail}
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
                    style={StylePlanDietario.totals_details}
                >
                    Carbohidratos
                </Text>
                <Text
                    style={{
                        ...StylePlanDietario.totals_details,
                    }}
                >
                    {Math.round(planDietario.reduce((prev,curr) => prev + curr.hc,0)*100)/100}
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
                    style={stylesPlanDietario.container_patologias}
                >
                    <Text
                        style={stylesPlanDietario.patologias_text}
                    >Celiaco</Text>
                </View> : null}
                {patologiasUsuario.aptoDiabetes1 || patologiasUsuario.aptoDiabetes2 ? 
                <View
                    style={stylesPlanDietario.container_patologias}
                >
                    <Text
                        style={{
                            ...stylesPlanDietario.patologias_text,
                            width: 55,
                        }}
                    >
                        Diabetes
                    </Text>
                </View> : null}
                {patologiasUsuario.aptoObesidad ? 
                <View
                    style={
                        {...stylesPlanDietario.container_patologias,
                            width: 70,
                        }}
                >
                    <Text
                    style={stylesPlanDietario.patologias_text}>Obesidad</Text>
                </View> : null}
            </View>
        )
    }

    function refreshUserData(){
        let loggedUserData = props.getUserData()
        let aptoDiabetes1 = false;
        let aptoDiabetes2 = false;
        let aptoCeliaco = false;
        let aptoObesidad = false;

        if(loggedUserData.patologias != undefined && loggedUserData.patologias.length > 0){
            if(loggedUserData.patologias.find((e) => e.patologias.codigo === "diabetes_1")){
                aptoDiabetes1 = true
            }

            if(loggedUserData.patologias.find((e) => e.patologias.codigo === "diabetes_2")){
                aptoDiabetes2 = true
            }

            if(loggedUserData.patologias.find((e) => e.patologias.codigo === "celiaquia")){
                aptoCeliaco = true
            }

            if(loggedUserData.patologias.find((e) => e.patologias.codigo === "obesidad")){
                aptoObesidad = true
            }

        } 
        setPatologiasUsuario({
            aptoCeliaco: aptoCeliaco,
            aptoDiabetes1: aptoDiabetes1,
            aptoDiabetes2: aptoDiabetes2,
            aptoObesidad: aptoObesidad
        })
    }

    React.useEffect(() => {
        getPlan()
    }, [patologiasUsuario])

    const isFocused = useIsFocused()

    React.useEffect(() => {
        //Update the state you want to be updated
        if(isFocused){
            refreshUserData()
        }
    } , [isFocused])

    React.useEffect( () => {
        
    }, []);

    return (
        <ScrollView ref={scrollRef}>
            <View style={styles.formContainer}>
                <View 
                    style={styles.formHeader}
                >
                    <Image
                    style={styles.logoIcon}
                    source={logo} />
                </View>  
                
                <View 
                    style={stylesPlanDietario.container}>
                    <Text
                        style={stylesPlanDietario.plan_dietario_title}
                    >
                        Plan Dietario
                    </Text>
                    
                    {renderPatologiasText()}
                    
                    {renderPlanDetails()}

                    {renderPlan(planDietario)}
                </View>

                <View style={styles.centeredContent}>
                    <TouchableOpacity 
                        onPress={getPlan} 
                        style={{...styles.primaryButton, marginBottom:12}}>
                        <Text
                            style={styles.primaryButtonText}>Generar otro Plan!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

export default PlanDietarioScreen;