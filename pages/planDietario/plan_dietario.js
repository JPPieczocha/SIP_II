import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import styles from '../common/styles'
// import logo from './../assets/logo.jpeg'
import logo from '../../assets/logo.jpeg';
import axios from 'axios'
import config from '../../config';

const stylesCards = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    card_template:{
        width: 220,
        height: 220,
        shadowColor: '#470000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        elevation: 1,
        marginBottom:36
    },
    card_image: {
      width: 220,
      height: 180,
      borderRadius : 10
    },
    text_container:{
      position: "absolute",
      width: 220,
      height: 70,
      bottom:0,
      padding: 5,
      backgroundColor: "rgba(0,0,0, 0.7)",
      borderBottomLeftRadius : 10,
      borderBottomRightRadius: 10
    },
    card_title: {
       color: "white",
    }
  });
  


function PlanDietarioScreen() {
    const [planDietario, setPlanDietario] = useState([]);
    const scrollRef = React.useRef();

    async function getPlan(){
        await axios.get(`${config.backendURLs.planDietario}?aptoCeliaco=true`)
        .then(function(response){
            if(response.data != undefined && response.data.length > 0){
                setPlanDietario(response.data)
                scrollRef.current?.scrollTo({
                    y: 0,
                    animated: true,
                });
            }
        }).catch(function(error) {
            console.log(error)
        })
    }

    function renderPlan(list){
        if(list != undefined){
            return list.map((e, index) => {
                return (<View
                            key={index}
                            style={stylesCards.card_template}
                        >
                        <Text
                            style={{
                                paddingBottom:10, 
                                fontStyle:"italic", 
                            }}
                        >{e.type.toUpperCase()}</Text>
                        <Image 
                            style={stylesCards.card_image}
                            source={{uri:e.receta.url_imagen}}
                        />
                        <View
                            style={stylesCards.text_container}
                        >
                            <Text
                                style={{color:"#fff"}}
                            >{e.receta.descripcion.toUpperCase()}</Text>
                            <Text
                                style={{color:"#fff",position:"absolute",right:6, bottom: 24, fontSize:12}}
                            >Cantidades: {e.receta.cantidades}</Text>
                            <Text
                                style={{color:"#fff",position:"absolute",right:6, bottom: 4, fontSize:12}}
                            >KCalorias: {Math.round(e.kcal*100)/100}</Text>
                        </View>
                    </View>
                )
            })
        }
    }

    React.useEffect( () => {
        getPlan();
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
                    style={stylesCards.container}>
                    <Text
                        style={{
                            textTransform: "uppercase", 
                            fontSize: 18, 
                            paddingBottom: 20, 
                            textDecorationLine: "underline"
                        }}
                    >Plan semanal</Text>
                    {renderPlan(planDietario)}
                    <Text
                        style={{
                            padding: 12,
                            marginBottom: 12,
                            borderRadius: 8,
                            backgroundColor:"#c1c1c1"
                        }}
                    >
                        Kcal Totales: {Math.round(planDietario.reduce((prev,curr) => prev + curr.kcal,0)*100)/100}
                    </Text>
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