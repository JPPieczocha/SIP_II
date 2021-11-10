import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./Styles";

export default function FoodSearch({ navigation, data }) {
  const handleTouch = () => {

    if (!data.hasOwnProperty('Pasos')) {
      navigation.navigate("Product", {
        nombre: data.Nombre,
        id: data.ID,
        imagen: data.Foto,
        data: data
      });
    } else {
      navigation.navigate("Recipe", {
        nombre: data.Nombre,
        id: data.ID,
        imagen: data.Foto,
        data: data

      });
      console.log('ENTRE');
    }
  };

  return (
    <View>
      {
        data !== undefined ?
        <TouchableOpacity style={styles.container} onPress={() => handleTouch()}>
          <Text
            style={styles.tagText}
            adjustsFontSizeToFit={true}
            numberOfLines={2}
          >
            {data.Nombre}
          </Text>
          <Image
            style={{ width: "30%", height: "100%", borderRadius: 15 }}
            source={{
              uri: data.Foto,
            }}
          />
        </TouchableOpacity>
        :
        null
      }
    </View>
  );
}
