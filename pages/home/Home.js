import React, { useEffect, useState } from "react";
import { Text, View, Image, ScrollView, ActivityIndicator } from "react-native";

import Carousel from "../common/components/Carousel/Carousel";
import CarouselFav from "../common/components/CarouselFav/CarouselFav";
import Color from "../common/colors";
import styles from "./Styles";

import logoSafeDiet from "../../assets/logo.png";
import { dummyBD } from "../../controllers/commonController";
import { favoritos } from "../../controllers/commonController";
import { getAllPlatos } from "../../controllers/recetasController";
import { getAllProductos } from "../../controllers/productosController";

import { UserContext } from "../../context/authContext";

import { useFocusEffect } from "@react-navigation/native";

function HomeScreen({ navigation }) {
    const context = React.useContext(UserContext)

    const [fetched, setFetched] = useState(false)
    const [seconds, setSeconds] = useState(0)
    const [loading, setLoading] = useState(true)

    const [listFavoritos, setFavoritos] = useState(undefined)
    
    const [listPlatos, setListPlatos] = useState(undefined)
    const [listProductos, setListProductos] = useState(undefined)

    useFocusEffect(
        React.useCallback(() => {
            // console.log("useFocusEffect");
            const fetchFavoritos = async () => {
                const response = await favoritos(
                    context.state.userData.Usuario
                );
                if (response === undefined) {
                    setFavoritos([]);
                } else {
                    console.log("Favoritos: " + response.length);
                    setFavoritos(response.reverse());
                }
            };

            fetchFavoritos();
            
            return () => fetchFavoritos();
        }, [])
    );

    useEffect(
        () => {
            // let timer1 = setTimeout(() => {
            //     setSeconds(seconds + 1);
            //     if (!fetched) {
            //         console.log("ENTRÉ FETCH FAVORITOS");
            //         setFetched(true);
            console.log("UseEffect");

            let data = context.state.userData.Usuario;
            console.log("ID User logeado: " + data);

            const fetchFavoritos = async () => {
                const response = await favoritos(data);
                if (response === undefined) {
                    setFavoritos([]);
                } else {
                    console.log("TOTAL Favoritos: " + response.length);
                    setFavoritos(response.reverse());
                    // setFetched(true);
                }
            };

            const fetchPlatos = async () => {
                const response = await getAllPlatos();
                if (response === undefined) {
                    setListPlatos([]);
                } else {
                    console.log("TOTAL Platos: " + response.length);
                    setListPlatos(response);
                    // setFetched(true);
                }
            };

            const fetchProductos = async () => {
                const response = await getAllProductos();
                if (response === undefined) {
                    setListProductos([]);
                } else {
                    console.log("TOTAL Productos: " + response.length);
                    setListProductos(response);
                    // setFetched(true);
                }
            };

            fetchFavoritos();
            fetchPlatos();
            fetchProductos();
            setLoading(false);
            //     } else {
            //         //console.log('TIRÉ CONSULTA DUMMY');
            //         const fetchDummy = async () => {
            //             const response = await dummyBD();
            //             if (response === undefined) {
            //             } else {
            //                 //console.log(response[0].FUCK_IT);
            //                 setFetched(true);
            //             }
            //         };
            //         fetchDummy();
            //     }
            // }, 5000);

            // this will clear Timeout
            // when component unmount like in willComponentUnmount
            // and show will not change to true
            return () => { // clearTimeout(timer1);
            };
        },
        // useEffect will run only one time with empty []
        // if you pass a value to array,
        // like this - [data]
        // than clearTimeout will run every time
        // this value changes (useEffect re-run)
        []
    );

    return (
        <>
            {loading ? (
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ActivityIndicator size={"large"} color={Color.secondary} />
                </View>
            ) : (
                <ScrollView
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.header}>
                        <View style={styles.titleContainer}>
                            <Text
                                style={styles.headerTitle}
                                adjustsFontSizeToFit={true}
                                numberOfLines={1}
                            >
                                Hola,{" "}
                                {context.state.userData.Nombre.split(" ")[0]}
                            </Text>
                            <Text style={styles.headerSubtitle}>
                                ¿Qué querés comer hoy?
                            </Text>
                        </View>

                        <Image
                            source={logoSafeDiet}
                            style={styles.headerLogo}
                        />
                    </View>

                    <View>
                        <CarouselFav
                            data={listFavoritos}
                            productos={listProductos}
                            platos={listPlatos}
                            navigation={navigation}
                        />

                        <Carousel
                            data={listPlatos === undefined ? [] :
                                listPlatos.filter((item) => {
                                if (context.state.userData.Celiaquia == 1 && item.Celiquia == 0) return null;
                                if (context.state.userData.Tipo1 == 1 && item.Tipo1 == 0) return null;
                                if (context.state.userData.Tipo2 == 1 && item.Tipo2 == 0) return null;
                                if (context.state.userData.Obesidad == 1 && item.Obesidad == 0) return null;
                                return item;
                            })}
                            navigation={navigation}
                            type={"recipe"}
                            title={"Recetas recomendadas"}
                        />

                        <Carousel
                            data={listProductos === undefined ? [] :
                                listProductos.filter((item) => {
                                if (context.state.userData.Celiaquia == 1 && item.Celiquia == 0) return null;
                                if (context.state.userData.Tipo1 == 1 && item.Tipo1 == 0) return null;
                                if (context.state.userData.Tipo2 == 1 && item.Tipo2 == 0) return null;
                                if (context.state.userData.Obesidad == 1 && item.Obesidad == 0) return null;
                                return item;
                            })}
                            navigation={navigation}
                            type={"product"}
                            title={"Productos recomendados"}
                        />

                        <Carousel
                            data={listPlatos}
                            navigation={navigation}
                            type={"recipe"}
                            title={"Platos populares"}
                        />

                        <Carousel
                            data={listProductos}
                            navigation={navigation}
                            type={"product"}
                            title={"Productos populares"}
                        />
                    </View>

                    <Text></Text>
                </ScrollView>
            )}
        </>
    );
}

export default HomeScreen;
