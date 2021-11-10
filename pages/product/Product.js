import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import InfoNutriItem from "../common/components/InfoNutriItem/InfoNutriItem";
import ModalWarning from "../common/components/ModalWarningFood/ModalWarningFood";

import styles from "./Styles";
import Color from "../common/colors";

import { getProducto } from "../../controllers/productosController";
import { Esfavorito, Addfavorito, Delfavorito } from '../../controllers/commonController'


import { UserContext } from "../../context/authContext";

export default function Product({ navigation, route }) {
    const context = React.useContext(UserContext);

    const { data } = route.params;

    const [listInfoNutr, setListInfoNutr] = useState([]);
    
    const [loadingFav, setLoadingFav] = useState(true)

    useEffect(() => {
        const fetchProducto = async () => {
            const response = await getProducto(data.ID);
            if (response === undefined) {
            } else {
                console.log("InfoNutricional: " + response.length);
                setListInfoNutr(response);
            }
        };

        const fetchFav = async () => {
            const req = {
                Usuario: context.state.userData.Usuario,
                idProducto: data.ID,
                idPlato: 0
            }

            const response = await Esfavorito(req)
            if (response !== undefined)
                setFav(response)
            setLoadingFav(false)
        };


        fetchProducto();
        fetchFav()
        handlePatology();
    }, []);

    // const {nombre, id, imagen} = route.params

    const [fav, setFav] = useState(false);

    const handlePatology = () => {
        if (context.state.userData.Celiaquia == 1 && data.Celiquia == 0)
            return true;
        if (context.state.userData.Tipo1 == 1 && data.Tipo1 == 0) return true;
        if (context.state.userData.Tipo2 == 1 && data.Tipo2 == 0) return true;
        if (context.state.userData.Obesidad == 1 && data.Obesidad == 0)
            return true;
        return false;
    };

    const handleFav = async () => {

        setLoadingFav(true)
        const req = {
            Usuario: context.state.userData.Usuario,
            idProducto: data.ID,
            idPlato: 0
        }
        let res
        if (fav) {
            //Tengo que eliminarlo de favs
            res = await Delfavorito(req)
            setFav(false)
        } else {
            //Tengo que agregarlo a favs
            res = await Addfavorito(req)
            setFav(true)
        }

        setLoadingFav(false)
    }

    return (
        <View>
            <ModalWarning
                navigation={navigation}
                msg={"este producto"}
                show={() => handlePatology()}
            />

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
                    disabled={loadingFav}
                >
                    <Ionicons
                        name={"arrow-back"}
                        color={Color.secondary}
                        size={32}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.favButton]}
                    onPress={() => handleFav()}
                    disabled={loadingFav}
                >
                    {loadingFav ? 
                        <ActivityIndicator
                            style={{ height: "100%" }}
                            size={"small"}
                            color={Color.secondary}
                        />
                    :
                        <Ionicons
                            name={fav ? "heart" : "heart-outline"}
                            color={Color.secondary}
                            size={32}
                        />
                    }
                </TouchableOpacity>

                <Text
                    style={styles.title}
                    adjustsFontSizeToFit={true}
                    numberOfLines={2}
                >
                    {data.Nombre}
                </Text>

                <Text style={styles.description}>{data.Descripcion}</Text>

                <Text style={styles.title}>Información Nutricional</Text>
                <Text style={styles.description}>Porción: 25gr</Text>

                <View style={styles.infoNutricional}>
                    {listInfoNutr.length === 0 ? (
                        <ActivityIndicator color={Color.extra} size={"large"} />
                    ) : (
                        listInfoNutr.map((item) => {
                            return (
                                <InfoNutriItem key={item.Nombre} data={item} />
                            );
                        })
                    )}
                </View>
            </ScrollView>
        </View>
    );
}
