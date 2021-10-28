import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";

import InfoIngredienteItem from "../common/components/InfoIngredienteItem/InfoIngredienteItem";
import ModalWarning from "../common/components/ModalWarningFood/ModalWarningFood";

import styles from "./Styles";
import Color from "../common/colors";

import { getPLato } from "../../controllers/recetasController";

export default function Recipe({ navigation, route }) {
  const { data } = route.params;

  const [fav, setFav] = useState(false);
  const [ingrPasos, setIngrPasos] = useState(true);

  
  // const {nombre, id, imagen} = route.params;

  const [listingredientes, setListIngredientes] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

      const fetchProducto = async () => {
          const response = await getPLato(data.ID);
          if(response === undefined){
          }else{
            console.log('Ingredientes: ');
            console.log(response);
            setListIngredientes(response);
            setLoading(false);
            // setFetched(true);
          }
      }
      fetchProducto()

  }, []);

  const infoReceta = {
    tiempo: "120 min",
    calorías: "1200 kcal",
    porción: "25 gr",
    descripción:
      "Ullamco sit irure incididunt laborum nostrud nostrud enim. Veniam quis nulla sit eiusmod magna mollit labore.",
    dificultad: "Sé lo que estoy haciendo",
    pasos:
      "Eiusmod reprehenderit laborum enim eu adipisicing consectetur amet enim consectetur cillum dolore.;Ullamco veniam labore eu dolor.;Irure consequat incididunt ipsum minim ea commodo dolore.;Mollit in nostrud voluptate nisi et non incididunt id sit veniam dolore velit exercitation laborum.;Labore id irure fugiat occaecat esse laborum id reprehenderit est cupidatat.;Dolore culpa tempor voluptate ea amet culpa ea consectetur culpa consequat fugiat eu.",
  };

  let pasos = []

  // for (let i = 0; i < infoReceta.pasos.split(";").length; i++) {
  for (let i = 0; i < data.Pasos.split(";").length; i++) {
    
    let itemPaso = (
      <View key={i} style={styles.paso}>
        <Text style={styles.pasoTitle}>Paso {i + 1}:</Text>
        <Text style={styles.pasoDescription}>   {data.Pasos.split(";")[i]}</Text>
      </View>
    )

    pasos.push(itemPaso)

  }

  const ingedientesData = [
    {
      nombre: "Agua",
      emoji: "💧",
      valor: "1 vaso",
    },

    {
      nombre: "Chocolate",
      emoji: "🍫",
      valor: "3 cucharadas",
    },

    {
      nombre: "Café Molido",
      emoji: "☕",
      valor: "3 cucharadas",
    },

    {
      nombre: "Aceite Oliva",
      emoji: "🍇",
      valor: "3 cucharadas",
    },

    {
      nombre: "Frambueza",
      emoji: "🍓",
      valor: "3 cucharadas",
    },

    {
      nombre: "Azúcar",
      emoji: "🍬",
      valor: "100 gr",
    },
  ];

  const handlePatology = () => {

    let userDummy = {
        Usuario: 1,
        Celiaquia: 1,
        Tipo1: 1,
        Tipo2: 0,
        Obesidad: 1,
        Nombre: "TESTE",
        Mail: "test@gmail.com",
        Clave: "123"
    }

    if(userDummy.Celiaquia == data.Celiaquia && data.Celiaquia === 1) return true;
    if(userDummy.Tipo1 == data.Tipo1 && data.Tipo1 === 1) return true;
    if(userDummy.Tipo2 == data.Tipo2 && data.Tipo2 === 1) return true;
    if(userDummy.Obesidad == data.Obesidad && data.Obesidad === 1) return true;
    return false;

}

  return (
    <View>
      <ModalWarning navigation={navigation} msg={"esta receta"} show={() => handlePatology()}/>
      {/* SE ROMPE ACA */}
      {loading ? <ActivityIndicator size={'large'} color={'#000000'}/> :


      <ScrollView>
        <Image
          resizeMode="stretch"
          style={{
            width: "100%",
            aspectRatio: 1 / 1,
            justifyContent: "flex-end",
          }}
          source={{
            uri: data.Foto,
          }}
        />

        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name={"arrow-back"} color={Color.secondary} size={32} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.favButton]}
          onPress={() => setFav(!fav)}
        >
          <Ionicons
            name={fav ? "heart" : "heart-outline"}
            color={Color.secondary}
            size={32}
          />
        </TouchableOpacity>

        <Text
          style={styles.title}
          adjustsFontSizeToFit={true}
          numberOfLines={1}
        >
          {data.Nombre}
        </Text>

        <View style={styles.iconsContainer}>
          <View style={styles.iconItem}>
            <Ionicons name={"timer-outline"} color={Color.primary} size={32} />
            <Text>{data.Tiempo}</Text>
          </View>

          <View style={styles.iconItem}>
            <Fontisto name={"fire"} color={Color.secondary} size={32} />
            <Text>{data.Kcal}</Text>
          </View>
        </View>

        <Text style={styles.description}>{data.Descripcion}</Text>

        <TouchableOpacity
          style={[
            styles.buttonSwap,
            ingrPasos ? styles.buttonSwapPasos : styles.buttonSwapIngr,
          ]}
          onPress={() => setIngrPasos(!ingrPasos)}
        >
          <Text style={styles.buttonSwapText}>
            Ver {ingrPasos ? "Pasos" : "Ingredientes"}
          </Text>
        </TouchableOpacity>
        
        {
          ingrPasos ? 
            <>
              <Text style={styles.title}>Ingredientes</Text>
              <Text style={styles.description}></Text>

              <View style={styles.infoNutricional}>
                {listingredientes == undefined ? null : listingredientes.map((item) => {
                  return <InfoIngredienteItem key={item.Nombre} data={item}/>;
                })}
              </View>
            </>
            :
            <>
              <Text style={styles.title}>Pasos</Text>
              {/* <Text style={styles.description}>
                Dificultad: {infoReceta.dificultad}
              </Text> */}

              <View style={styles.listaPasos}>
                {pasos}
              </View>
            </>
        }
      </ScrollView>
}
    </View>
  );
}
