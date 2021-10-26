import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";

import InfoIngredienteItem from "../common/components/InfoIngredienteItem/InfoIngredienteItem";
import ModalWarning from "../common/components/ModalWarningFood/ModalWarningFood";

import styles from "./Styles";
import Color from "../common/colors";

export default function Recipe({ navigation, route }) {
  const { nombre, id, imagen } = route.params;

  const [fav, setFav] = useState(false);
  const [ingrPasos, setIngrPasos] = useState(true);

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

  for (let i = 0; i < infoReceta.pasos.split(";").length; i++) {
    
    let itemPaso = (
      <View key={i} style={styles.paso}>
        <Text style={styles.pasoTitle}>Paso {i + 1}:</Text>
        <Text style={styles.pasoDescription}>   {infoReceta.pasos.split(";")[i]}</Text>
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

  return (
    <View>

      <ModalWarning navigation={navigation} msg={"esta receta"} show={false}/>

      <ScrollView>
        <Image
          resizeMode="stretch"
          style={{
            width: "100%",
            aspectRatio: 1 / 1,
            justifyContent: "flex-end",
          }}
          source={{
            uri: imagen,
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
          {nombre}
        </Text>

        <View style={styles.iconsContainer}>
          <View style={styles.iconItem}>
            <Ionicons name={"timer-outline"} color={Color.primary} size={32} />
            <Text>{infoReceta.tiempo}</Text>
          </View>

          <View style={styles.iconItem}>
            <Fontisto name={"fire"} color={Color.secondary} size={32} />
            <Text>{infoReceta.calorías}</Text>
          </View>
        </View>

        <Text style={styles.description}>{infoReceta.descripción}</Text>

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

        <View style={!ingrPasos ? { display: "none" } : {}}>
          <Text style={styles.title}>Ingredientes</Text>
          <Text style={styles.description}></Text>

          <View style={styles.infoNutricional}>
            {ingedientesData.map((item) => {
              return <InfoIngredienteItem key={item.nombre} data={item} />;
            })}
          </View>
        </View>

        <View style={ingrPasos ? { display: "none" } : {}}>
          <Text style={styles.title}>Pasos</Text>
          <Text style={styles.description}>
            Dificultad: {infoReceta.dificultad}
          </Text>

          <View style={styles.listaPasos}>
            {pasos}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
