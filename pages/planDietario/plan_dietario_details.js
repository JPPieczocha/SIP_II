import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, FlatList, Avatar, StyleSheet } from 'react-native';
import Color from "../common/colors";
import Fontisto from "react-native-vector-icons/Fontisto";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { EvilIcons } from '@expo/vector-icons';
import stylesPlanDietario from './Styles'
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { UserContext } from '../../context/authContext';

function PlanDietarioDetails({route}) {
    const { comidaData } = route.params;
    const context = React.useContext(UserContext);


    const navigation = useNavigation();
    
    const keyExtractor = (item, index) => index.toString()
    const planItems = [
        {
            id: comidaData.receta.ID,
            key: 'Comida',
            title:comidaData.receta.descripcion,
            subtitle: Math.round(comidaData.receta.kcal*100)/100,
            url_imagen: comidaData.receta.url_imagen
        },
        {
            id: comidaData.bebida.ID,
            key: 'Bebida',
            title:comidaData.bebida.descripcion,
            subtitle: Math.round(comidaData.bebida.kcal_unidad*100)/100,
            url_imagen: comidaData.bebida.url_imagen
        },
        {
            id: comidaData.extra.ID,
            key: 'Extra',
            title:comidaData.extra.descripcion,
            subtitle: comidaData.extra.kcal_unidad,
            url_imagen: comidaData.extra.url_imagen != undefined ? comidaData.extra.url_imagen : ""
        }
    ]
    const goToProduct = function(id){
        let screenName = ""
        let item = planItems.find((e) => e.id == id)
        if(item.key == "Bebida" || item.key == "Extra"){
            navigation.navigate("Product", 
            {data :{
                ID:item.id,
                Nombre:item.title,
                Descripcion:item.title,
                Foto:item.url_imagen,
            }})
        }

        if(item.key == "Comida"){
            navigation.navigate("Recipe", {data: {ID: item.id}})
        }
    }

    const renderItem = (item) => 
        item.title != undefined && item.title != '' ? 
        <TouchableOpacity
            onPress={() => goToProduct(item.id)}
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
                    paddingRight: 12
                }}
            >
                <Image 
                    style={{
                        width: 75,
                        height: 75,
                        borderRadius: 20
                    }}
                    source={{uri: item.url_imagen}} />
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
                        fontSize: 18,
                    }}
                >{item.key}</Text>
                <Text
                    style={{
                        fontSize: 14,  
                      }}
                >{item.title}</Text>
            </View>
            
            <EvilIcons 
                name="chevron-right" 
                size={34} 
                color={Color.primary}
                style={{
                    position: "absolute",
                    right:10,
                    top:"50%"
                }}
            />
        </TouchableOpacity> : null

    const renderBackButton = function(){
        return (
            <TouchableOpacity
                style={stylesPlanDietario.plan_dietario_details_back_button}
                onPress={() => navigation.goBack()}
            >
            <Ionicons name={"arrow-back"} color={Color.secondary} size={32} />
            </TouchableOpacity>
        )
    }

    const renderComidaHeader = function(){
        return (
            <View
                style={{
                    position:"relative",
                    width: "100%",
                    height: 300
                }}
            >
                <Image
                    style={{
                        width: "100%",
                        height: "100%",
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10
                    }}
                    source={{uri: comidaData.receta.url_imagen}}
                >
                </Image>
                <View
                    style={stylesPlanDietario.plan_dietario_comida_title_wrapper}
                >
                    <Text
                        style={stylesPlanDietario.plan_dietario_comida_title}
                    >
                        {comidaData.receta.descripcion}
                    </Text>
                    <Text
                        style={stylesPlanDietario.plan_dietario_bebida_title}
                    >
                        {`con ${comidaData.bebida.descripcion}`}
                    </Text>
                </View>
                
            </View>
        )
    }

    const renderComidaDetail = function(){
        return (
            <View
                style={stylesPlanDietario.plan_dietario_comida_details}
            >
                <View
                    style={{
                        ...stylesPlanDietario.container_plan_detail,
                        width:"20%"
                    }}
                >
                <Fontisto 
                    name={"fire"} 
                    color={'white'} 
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
                        {Math.round(comidaData.kcal*100)/100}
                    </Text>
                </View>
                <View
                    style={{
                        ...stylesPlanDietario.container_plan_detail,
                        width:"30%"
                    }}
                >
                    <FontAwesome5 
                        name="bread-slice" 
                        size={24} 
                        color={ 'white' /*"#D3B23A" */}
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
                        {Math.round(comidaData.hc*100)/100}
                    </Text>
                </View>
                <View
                    style={
                        {
                            ...stylesPlanDietario.container_plan_detail,
                            width:"20%"
                        }
                    }
                >
                    <MaterialCommunityIcons 
                        name="food-variant" 
                        size={24} 
                        color={'white'} 
                        style={{
                            paddingTop: 8,
                            paddingBottom: 8,
                        }}
                    />
                    <Text
                        style={stylesPlanDietario.totals_details}
                    >
                        Porciones
                    </Text>
                    <Text
                        style={{
                            ...stylesPlanDietario.totals_details,
                        }}
                    >
                        {comidaData.receta.cantidades}
                    </Text>
                </View>
            </View>
        )
    }

    const renderComidaItems = function(){
        return (
            <FlatList
                ListHeaderComponent = {renderListHeader}
                keyExtractor={keyExtractor}
                data={planItems}
                renderItem={({item}) => renderItem(item)}
            />
        )
    }

    const renderListHeader = function(){
        return(
            <View>
                {renderBackButton()}
            
                {renderComidaHeader()}

                {renderComidaDetail()}
            </View>
        )
    }

    return (
        <SafeAreaView>
            {renderComidaItems()}
        </SafeAreaView>
    )
}

export default PlanDietarioDetails;