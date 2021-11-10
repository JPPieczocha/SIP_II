import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./Styles";

import { Addhistorial } from "../../../../controllers/commonController";
import { UserContext } from "../../../../context/authContext";


export default function FoodSearch({ navigation, data }) {

  const context = React.useContext(UserContext);


  const handleTouch = async () => {
    if (!data.hasOwnProperty('Pasos')) {
      let userData = {
        Usuario: context.state.userData.Usuario,
        idProducto: data.ID,
        idPlato: 0
      }
      let response = await Addhistorial(userData);
      if(response != undefined){
        // console.log('LOG DESDE PRODUCTO: ');
        // console.log(response);
      }
      navigation.navigate("Product", {
        nombre: data.Nombre,
        id: data.ID,
        imagen: data.Foto,
        data: data
      });
    } else {
      let userData = {
        Usuario: context.state.userData.Usuario,
        idProducto: 0,
        idPlato: data.ID
      }
      let response = await Addhistorial(userData);
      if(response != undefined){
        // console.log('LOG DESDE RECETA: ');
        // console.log(response);
      }
      navigation.navigate("Recipe", {
        nombre: data.Nombre,
        id: data.ID,
        imagen: data.Foto,
        data: data
      });
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
