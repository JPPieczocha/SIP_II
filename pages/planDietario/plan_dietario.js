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

    async function getPlan(){
        await axios.get(`${config.backendURLs.planDietario}?aptoCeliaco=${patologiasUsuario.aptoCeliaco}&aptoDiabetico=${patologiasUsuario.aptoDiabetes}&aptoObesidad=${patologiasUsuario.aptoObesidad}`)
        .then(function(response){
            setPlanDietario(response.data)
            scrollRef.current?.scrollTo({
                y: 0,
                animated: true,
            });
        }).catch(function(error) {
            console.log(error)
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
                                style={{
                                    paddingBottom:4, 
                                    fontStyle:"italic",
                                    color:"#fafafa" 
                                }}
                            >{e.type.toUpperCase()}</Text>
                            <Text
                                style={{
                                    color:"#fff",
                                    fontSize:10,
                                    width: 120
                                }}
                            >{e.receta.descripcion.toUpperCase()}</Text>
                            <Text
                                style={{
                                    color:"#fff",
                                    position:"absolute",
                                    right:6, 
                                    bottom: 18,
                                    fontSize:10
                                }}
                            >Cantidades: {e.receta.cantidades}</Text>
                            <Text
                                style={{color:"#fff",position:"absolute",right:6, bottom: 4, fontSize:10}}
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
                >
                    Calorías
                </Text>
                <Text
                    style={{
                        fontStyle:"italic"
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
                <Text>
                    Carbohidratos
                </Text>
                <Text
                    style={{
                        fontStyle:"italic"
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
                    style={
                        {...stylesPlanDietario.container_grey,
                            width: 60,
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center"
                        }}
                >
                    <Text
                        style={{
                            fontSize:12
                        }}
                    >Celiaco</Text>
                </View> : null}
                {patologiasUsuario.aptoDiabetes ? 
                <View
                    style={
                        {...stylesPlanDietario.container_grey,
                            width: 60,
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center"
                        }}
                >
                    <Text
                        style={{
                            fontSize:12
                        }}
                    >Diabetes</Text>
                </View> : null}
                {patologiasUsuario.aptoObesidad ? 
                <View
                    style={
                        {...stylesPlanDietario.container_grey,
                            width: 70,
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center"
                        }}
                >
                    <Text
                    style={{
                        fontSize:12
                    }}>Obesidad</Text>
                </View> : null}
            </View>
        )
    }

    function refreshUserData(){
        let loggedUserData = props.getUserData()
        let aptoDiabetes = false;
        let aptoCeliaco = false;
        let aptoObesidad = false;

        if(loggedUserData.patologias != undefined && loggedUserData.patologias.length > 0){
            if(loggedUserData.patologias.find((e) => e.patologias.descripcion === "Diabetes")){
                aptoDiabetes = true
            }

            if(loggedUserData.patologias.find((e) => e.patologias.descripcion === "Celiaquía")){
                aptoCeliaco = true
            }

            if(loggedUserData.patologias.find((e) => e.patologias.descripcion === "Obesidad")){
                aptoObesidad = true
            }

        } 
        setPatologiasUsuario({
            aptoCeliaco: aptoCeliaco,
            aptoDiabetes: aptoDiabetes,
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
                <View style={styles.formHeader}>
                    <Image
                    style={styles.logoIcon}
                    source={logo} />
                </View>  
                
                <View 
                    style={stylesPlanDietario.container}>
                    <Text
                        style={{
                            textTransform: "uppercase", 
                            fontSize: 18, 
                            paddingBottom: 16, 
                            textDecorationLine: "underline"
                        }}
                    >
                        Plan semanal
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