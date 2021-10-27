import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./Styles";

export default function FoodItem({ navigation, data }) {
  const handleTouch = () => {
    // if (data.type === "product") {
    //   navigation.navigate("Product", {
    //     nombre: data.title,
    //     id: data.id,
    //     imagen: data.imagen,
    //   });
    // } else {
    //   navigation.navigate("Recipe", {
    //     nombre: data.title,
    //     id: data.id,
    //     imagen: data.imagen,
    //   });
    // }

    if (data.Tiempo == undefined) {
      navigation.navigate("Product", {
        nombre: data.Nombre,
        id: data.ID,
        imagen: data.Foto,
      });
    } else {
      navigation.navigate("Recipe", {
        nombre: data.Nombre,
        id: data.ID,
        imagen: data.Foto,
      });
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => handleTouch()}>
      {console.log(data)}
      <Text
        style={styles.tagText}
        adjustsFontSizeToFit={true}
        numberOfLines={1}
      >
        {data.Nombre}
      </Text>

      <Image
        style={{ width: "30%", height: "100%", borderRadius: 15 }}
        source={{
          uri: data.Foto,
        }}
      />

      {/* <View style={styles.tag}>
        <Text
          style={styles.tagText}
          adjustsFontSizeToFit={true}
          numberOfLines={2}
        >
          {data.title}
        </Text>
      </View>

      <Image
        style={{ width: "100%", height: "100%", borderRadius: 15 }}
        source={{
          uri: data.imagen,
        }}
      /> */}
    </TouchableOpacity>
  );
}
