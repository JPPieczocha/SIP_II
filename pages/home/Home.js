import React, { useEffect, useState } from "react";
import { Text, View, Image, ScrollView, ActivityIndicator } from "react-native";

import Carousel from "../common/components/Carousel/Carousel";
import CarouselFav from "../common/components/CarouselFav/CarouselFav";
import Color from "../common/colors";
import styles from "./Styles";

import logoSafeDiet from "../../assets/logo.png";
import { dummyBD } from "../../controllers/commonController";
// import { getAllPlatos } from "../../controllers/recetasController";
import { historial } from "../../controllers/commonController";
import { favoritos } from "../../controllers/commonController";
import { getAllPlatos } from "../../controllers/recetasController";
import { getAllProductos } from "../../controllers/productosController";

import { UserContext } from "../../context/authContext";

import { useFocusEffect } from '@react-navigation/native';

function HomeScreen({ navigation }) {
    const context = React.useContext(UserContext);

    const [fetched, setFetched] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [loading, setLoading] = useState(true);

    const [listFavoritos, setFavoritos] = useState();
    const [listPlatos, setListPlatos] = useState();
    const [listProductos, setListProductos] = useState();

    // useFocusEffect(()=>{
    //     React.useCallback(() => {
    //         // const unsubscribe = API.subscribe(userId, user => setUser(data));

    //         console.log('JEJEJE')
    //         const fetchFavoritos = async () => {
    //             const response = await favoritos(context.state.userData.Usuario);
    //             if (response === undefined) {
    //             } else {
    //                 console.log("Favoritos: " + response.length);
    //                 setFavoritos(response.reverse());
    //             }
    //         };
    //         // fetchFavoritos();
    //     return () => fetchFavoritos();
    //     }, [context.state.userData.Usuario])
    // })

    useFocusEffect(
        React.useCallback(() => {
            // const unsubscribe = API.subscribe(userId, user => setUser(data));
            console.log('JEJE');
            const fetchFavoritos = async () => {
                const response = await favoritos(context.state.userData.Usuario);
                if (response === undefined) {
                } else {
                    console.log("Favoritos: " + response.length);
                    setFavoritos(response.reverse());
                }
            };
            //fetchFavoritos()
            return () => fetchFavoritos();
          }, [])
    )


    useEffect(
        () => {
            // let timer1 = setTimeout(() => {
            //     setSeconds(seconds + 1);
            //     if (!fetched) {
            //         console.log("ENTRÉ FETCH FAVORITOS");
            //         setFetched(true);
            console.log('USEEFFECT');

                    let data = context.state.userData.Usuario;
                    console.log("Data: " + data);

                    const fetchFavoritos = async () => {
                        const response = await favoritos(data);
                        if (response === undefined) {
                        } else {
                            console.log("Favoritos: " + response.length);
                            setFavoritos(response.reverse());
                            // setFetched(true);
                        }
                    };

                    const fetchPlatos = async () => {
                        const response = await getAllPlatos();
                        if (response === undefined) {
                        } else {
                            console.log("platos: " + response.length);
                            setListPlatos(response);
                            // setFetched(true);
                        }
                    };

                    const fetchProductos = async () => {
                        const response = await getAllProductos();
                        if (response === undefined) {
                        } else {
                            console.log("PRODUCTOS: " + response.length);
                            setListProductos(response);
                            // setFetched(true);
                        }
                    };

                    //fetchFavoritos();
                    //fetchPlatos();
                    //fetchProductos();
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
            return () => {
                // clearTimeout(timer1);
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
                                Hola, {context.state.userData.Nombre.split(" ")[0]}
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
                            key={1}
                            data={listPlatos}
                            navigation={navigation}
                            type={"recipe"}
                            title={"Platos populares"}
                        />
                        
                        <Carousel
                            key={2}
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
