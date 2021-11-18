import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";

import InfoIngredienteItem from "../common/components/InfoIngredienteItem/InfoIngredienteItem";
import ModalWarning from "../common/components/ModalWarningFood/ModalWarningFood";

import styles from "./Styles";
import Color from "../common/colors";

import { getPLato, getIngredientes } from "../../controllers/recetasController";
import {
    Esfavorito,
    Addfavorito,
    Delfavorito,
} from "../../controllers/commonController";

import Carousel, { Pagination } from "react-native-snap-carousel";

import { UserContext } from "../../context/authContext";
import colors from "../common/colors";

export default function Recipe({ navigation, route }) {
    const context = React.useContext(UserContext);

    const { data } = route.params;

    const [info, setInfo] = useState(undefined);

    const [fav, setFav] = useState(false);
    const [ingrPasos, setIngrPasos] = useState(true);

    const [contPag, setContPag] = useState(0);

    // const {nombre, id, imagen} = route.params;

    const [listingredientes, setListIngredientes] = useState(undefined);

    const [loading, setLoading] = useState(true);
    const [loadingFav, setLoadingFav] = useState(true);

    useEffect(() => {
        const fetchPlato = async () => {
            const response = await getPLato(data.ID);
            if (response === undefined) {
            } else {
                console.log("traje info Plato ");
                setInfo(response);
            }
        };

        const fetchIngredientes = async () => {
            const response = await getIngredientes(data.ID);
            if (response === undefined) {
            } else {
                console.log("Ingredientes: " + response.length);
                setListIngredientes(response);
            }
        };

        const fetchFav = async () => {
            const req = {
                Usuario: context.state.userData.Usuario,
                idProducto: 0,
                idPlato: data.ID,
            };

            const response = await Esfavorito(req);
            if (response !== undefined) {
                setFav(response);
            }
            setLoadingFav(false);
        };

        fetchPlato();
        fetchIngredientes();
        handlePatology();
        fetchFav();
        setLoading(false);
    }, []);

    const renderPasos = ({ item, index }) => {
        return (
            <View style={styles.pasoCard}>
                <Text style={styles.fontNumPaso}>Paso {index + 1}</Text>
                <Text style={styles.fontDescriptionPaso}>{item}</Text>
            </View>
        );
    };

    const handlePatology = () => {
        if (info !== undefined) {
            if (context.state.userData.Celiaquia == 1 && info.Celiquia == 0)
                return true;
            if (context.state.userData.Tipo1 == 1 && info.Tipo1 == 0)
                return true;
            if (context.state.userData.Tipo2 == 1 && info.Tipo2 == 0)
                return true;
            if (context.state.userData.Obesidad == 1 && info.Obesidad == 0)
                return true;
            return false;
        }

        return false;
    };

    const handleFav = async () => {
        setLoadingFav(true);
        const req = {
            Usuario: context.state.userData.Usuario,
            idProducto: 0,
            idPlato: data.ID,
        };
        let res;
        if (fav) {
            //Tengo que eliminarlo de favs
            res = await Delfavorito(req);
            setFav(false);
        } else {
            //Tengo que agregarlo a favs
            res = await Addfavorito(req);
            setFav(true);
        }

        setLoadingFav(false);
    };

    return (
        <View>
            {info === undefined ? (
                <View style={{ height: "100%", justifyContent: "center" }}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <>
                    <ModalWarning
                        navigation={navigation}
                        msg={"esta receta"}
                        show={() => handlePatology()}
                    />

                    {loading ? (
                        <>
                            <ActivityIndicator
                                style={{ height: "100%" }}
                                size={"large"}
                                color={Color.secondary}
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
                        </>
                    ) : (
                        <ScrollView>
                            <Image
                                resizeMode="stretch"
                                style={{
                                    width: "100%",
                                    aspectRatio: 1 / 1,
                                    justifyContent: "flex-end",
                                }}
                                source={{
                                    uri: info.Foto,
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
                                {loadingFav ? (
                                    <ActivityIndicator
                                        style={{ height: "100%" }}
                                        size={"small"}
                                        color={Color.secondary}
                                    />
                                ) : (
                                    <Ionicons
                                        name={fav ? "heart" : "heart-outline"}
                                        color={Color.secondary}
                                        size={32}
                                    />
                                )}
                            </TouchableOpacity>

                            <Text
                                style={styles.title}
                                adjustsFontSizeToFit={true}
                                numberOfLines={1}
                            >
                                {info.Nombre}
                            </Text>

                            <View style={styles.iconsContainer}>
                                <View style={styles.iconItem}>
                                    <Ionicons
                                        name={"timer-outline"}
                                        color={Color.primary}
                                        size={32}
                                    />
                                    <Text>{info.Tiempo}</Text>
                                </View>

                                <View style={styles.iconItem}>
                                    <Fontisto
                                        name={"fire"}
                                        color={Color.secondary}
                                        size={32}
                                    />
                                    <Text>{info.Kcal}</Text>
                                </View>
                            </View>

                            <Text style={styles.description}>
                                {info.Descripcion}
                            </Text>

                            <TouchableOpacity
                                style={[
                                    styles.buttonSwap,
                                    ingrPasos
                                        ? styles.buttonSwapPasos
                                        : styles.buttonSwapIngr,
                                ]}
                                onPress={() => setIngrPasos(!ingrPasos)}
                            >
                                <Text style={styles.buttonSwapText}>
                                    Ver {ingrPasos ? "Pasos" : "Ingredientes"}
                                </Text>
                            </TouchableOpacity>

                            <View style={ingrPasos ? {} : { display: "none" }}>
                                <Text style={styles.title}>Ingredientes</Text>
                                <Text style={styles.description}></Text>

                                <View style={styles.infoNutricional}>
                                    {listingredientes === undefined ? (
                                        <ActivityIndicator
                                            size={"large"}
                                            color={Color.primary}
                                        />
                                    ) : (
                                        listingredientes.map((item) => {
                                            return (
                                                <InfoIngredienteItem
                                                    key={item.Nombre}
                                                    data={item}
                                                />
                                            );
                                        })
                                    )}
                                </View>
                            </View>

                            <View style={ingrPasos ? { display: "none" } : {}}>
                                <Text style={styles.title}>Pasos</Text>
                                <Pagination
                                    dotsLength={info.Pasos.split(";").length}
                                    activeDotIndex={contPag}
                                    dotStyle={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: 5,
                                        backgroundColor: Color.secondary,
                                    }}
                                    inactiveDotOpacity={0.4}
                                    inactiveDotScale={0.6}
                                />
                                <Carousel
                                    layout={"default"}
                                    data={info.Pasos.split(";")}
                                    renderItem={renderPasos}
                                    sliderWidth={Dimensions.get("window").width}
                                    itemWidth={
                                        Dimensions.get("window").width * 0.75
                                    }
                                    onSnapToItem={(i) => setContPag(i)}
                                />
                            </View>
                        </ScrollView>
                    )}
                </>
            )}
        </View>
    );
}
