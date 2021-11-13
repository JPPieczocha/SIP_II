import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    Image,
    TextInput,
    Modal,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    TouchableWithoutFeedback,
} from "react-native";
import RadioForm, {
    RadioButton,
    RadioButtonInput,
    RadioButtonLabel,
} from "react-native-simple-radio-button";

import FoodSearch from "../common/components/FoodSearch/FoodSearch";
import styles from "./Styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import logo from "../../assets/logo.jpeg";
import colors from "../common/colors";

import { historial } from "../../controllers/commonController";
import {
    buscarPlatos,
    getAllPlatos,
} from "../../controllers/recetasController";
import {
    buscarProductos,
    getAllProductos,
} from "../../controllers/productosController";

import { useFocusEffect } from "@react-navigation/native";

import { UserContext } from "../../context/authContext";

const Search = ({ navigation }) => {
    const context = React.useContext(UserContext);

    const [showFilter, setShowFilter] = useState(false);
    const [filterSelection, setFilterSelection] = useState(1);

    const [foodType, setFoodType] = useState(1);
    const [sugarFree, setSugarFree] = useState(false);
    const [taccFree, setTaccFree] = useState(false);
    const [lowCal, setLowCal] = useState(false);

    const [searchInput, setSearchInput] = useState("");
    const [historialList, setHistorialList] = useState(undefined);
    const [PlatosList, setPlatoslList] = useState(undefined);
    const [ProductosList, setProductosList] = useState(undefined);

    const [allPlatos, setAllPlatos] = useState([]);
    const [allProd, setAllProd] = useState([]);

    const [submitted, setSubmitted] = useState(true);
    const [mainLoading, setMainLoading] = useState(true);

    var radio_props_food = [
        { label: "Recetas", value: 0 },
        { label: "Ambos", value: 1 },
        { label: "Productos", value: 2 },
    ];

    useFocusEffect(
        React.useCallback(() => {
            const fetchHistorial = async () => {
                setMainLoading(true);

                let data = context.state.userData.Usuario;

                const response = await historial(data);
                if (response !== undefined) {
                    console.log(
                        "User ID " + data + " History: " + response.length
                    );
                }
                setHistorialList(response);

                const platos = await getAllPlatos();
                if (platos === undefined) {
                } else {
                    console.log("Levanté todos los platos");
                    setAllPlatos(platos);
                }

                const prod = await getAllProductos();
                if (prod === undefined) {
                } else {
                    console.log("Levanté todos los prods");
                    setAllProd(prod);
                }

                setMainLoading(false);
            };
            fetchHistorial();
            return () => fetchHistorial();
        }, [])
    );

    // useEffect(() => {
    //     const fetchHistorial = async () => {

    //         let data = context.state.userData.Usuario;

    //         const response = await historial(data);
    //         if(response === undefined){
    //         }else{
    //             console.log('HISTORIAL USUARIO ' + data + ': ' + response.length);
    //             setHistorialList(response);
    //         }

    //         const platos = await getAllPlatos()
    //         if(platos === undefined){
    //         }else{
    //             console.log('Levanté todos los platos');
    //             setAllPlatos(platos);

    //         }

    //         const prod = await getAllProductos()
    //         if(prod === undefined){
    //         }else{
    //             console.log('Levanté todos los prods');
    //             setAllProd(prod);
    //         }

    //         setLoading(false)

    //     }

    //     fetchHistorial();
    // }, []);

    const handleSearch = () => {
        setPlatoslList([]);
        setProductosList([]);

        if (searchInput === "") {
            return null;
        }

        let data = {
            name: searchInput,
            c: Number(taccFree),
            d: Number(sugarFree),
            o: Number(lowCal),
        };

        if (foodType == 1) {
            //Means both fetches.
            console.log("Debo preguntar en ambos. Data:::");
            console.log(data);

            const fetchProductos = async () => {
                const response = await buscarProductos(data);
                if (response === undefined) {
                } else {
                    setProductosList(response);
                    console.log("Productos busqueda: " + response.length);
                }
            };

            const fetchPlatos = async () => {
                const response = await buscarPlatos(data);
                if (response === undefined) {
                } else {
                    console.log("Platos busqueda: " + response.length);
                    setPlatoslList(response);
                }
            };
            fetchProductos();
            fetchPlatos();
        } else if (foodType == 0) {
            //Solo recetas
            const fetchPlatos = async () => {
                const response = await buscarPlatos(data);
                if (response === undefined) {
                } else {
                    console.log("Platos busqueda: " + response.length);
                    setPlatoslList(response);
                }
            };
            fetchPlatos();
        } else {
            //Solo productos
            const fetchProductos = async () => {
                const response = await buscarProductos(data);
                if (response === undefined) {
                } else {
                    console.log("Productos busqueda: " + response);
                    setProductosList(response);
                }
            };
            fetchProductos();
        }

        setSubmitted(true);
    };

    const handleApplyFilter = () => {
        setShowFilter(false);
        console.log("TRIGUEREAR RE BUSQUEDA");
        handleSearch();
    };

    const filterModal = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={showFilter}
                onRequestClose={() => setShowFilter(false)} //El botón Back de Android hace algo, en este caso lo cierro
                onShow={() => console.log("abrir modal")} //Al abrirse el modal, algo se hace
                onDismiss={() => console.log("cerrar modal")} //Al cerrarse el modal, algo se hace
            >
                <TouchableOpacity
                    style={styles.modalFilter}
                    activeOpacity={1}
                    onPress={() => setShowFilter(false)}
                >
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTextHeader}>
                                    Filtros
                                </Text>
                                <TouchableOpacity
                                    style={styles.exitModalButton}
                                    onPress={() => setShowFilter(false)}
                                >
                                    <Text style={{ fontSize: 20 }}>X</Text>
                                </TouchableOpacity>
                            </View>
                            <Text>¿Productos o recetas? {foodType}</Text>
                            <View style={styles.formContainer}>
                                <RadioForm
                                    radio_props={radio_props_food}
                                    initial={filterSelection}
                                    onPress={(value) => {
                                        setFoodType(value);
                                        setFilterSelection(value);
                                    }}
                                    formHorizontal={true}
                                    labelHorizontal={false}
                                    buttonColor={colors.primary}
                                    animation={true}
                                    selectedButtonColor={colors.secondaryv2}
                                />
                            </View>
                            <Text>¿Quieres algunas de estas comidas?</Text>
                            <View style={styles.formContainer}>
                                <View style={styles.formContainerItem}>
                                    <Text>Cero Azúcares</Text>

                                    <TouchableOpacity
                                        style={styles.checkBox}
                                        onPress={() => setSugarFree(!sugarFree)}
                                    >
                                        <Text
                                            style={{
                                                color: colors.secondaryv2,
                                            }}
                                        >
                                            {sugarFree ? "✔" : ""}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.formContainerItem}>
                                    <Text>Sin TACC</Text>

                                    <TouchableOpacity
                                        style={styles.checkBox}
                                        onPress={() => setTaccFree(!taccFree)}
                                    >
                                        <Text
                                            style={{
                                                color: colors.secondaryv2,
                                            }}
                                        >
                                            {taccFree ? "✔" : ""}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.formContainerItem}>
                                    <Text>Bajas en Calorías</Text>

                                    <TouchableOpacity
                                        style={styles.checkBox}
                                        onPress={() => setLowCal(!lowCal)}
                                    >
                                        <Text
                                            style={{
                                                color: colors.secondaryv2,
                                            }}
                                        >
                                            {lowCal ? "✔" : ""}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={styles.applyButton}
                                onPress={() => handleApplyFilter()}
                            >
                                <Text style={styles.applyButtonText}>
                                    Aplicar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.headerLogo} source={logo} />
                <Text style={styles.headerTitle}>¿Buscabas algo?</Text>
            </View>

            <View style={styles.mainIput}>
                <TextInput
                    style={styles.input}
                    placeholder={"Escriba aquí"}
                    onChangeText={(text) => {
                        setSubmitted(false);
                        setSearchInput(text);
                    }}
                    keyboardType={"default"}
                    onSubmitEditing={() => handleSearch()}
                    value={searchInput}
                />

                {searchInput === "" ? null : (
                    <TouchableOpacity
                        style={styles.eraseFilter}
                        onPress={() => {
                            setSubmitted(false);
                            setSearchInput("");
                        }}
                    >
                        <Entypo
                            name="erase"
                            size={24}
                            color={colors.secondary}
                        />
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    style={styles.iconFilter}
                    onPress={() => setShowFilter(true)}
                >
                    <Ionicons
                        name="filter-sharp"
                        size={24}
                        color={colors.secondary}
                    />
                </TouchableOpacity>
            </View>

            {mainLoading ? (
                <View style={styles.emptyContainer}>
                    <ActivityIndicator
                        color={colors.secondary}
                        size={"large"}
                    />
                </View>
            ) : (
                <>
                    {historialList === undefined ? (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>
                                No pudimos acceder al historial, intentelo más
                                tarde.
                            </Text>
                        </View>
                    ) : (
                        <>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginHorizontal: 10,
                                }}
                            >
                                <Text style={[styles.headerTitle]}>
                                    {searchInput.length == 0
                                        ? "Recientes"
                                        : "Resultados"}
                                </Text>
                                {historialList.length === 0 ? null : (
                                    <TouchableOpacity
                                        style={styles.clearHistory}
                                        onPress={() => {
                                            console.log("ENDPOINT HISTORIAL");
                                            setHistorialList([]);
                                        }}
                                    >
                                        <Text style={styles.clearHistoryText}>
                                            Borrar Historial
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>

                            {searchInput.length == 0 ? (
                                <View style={styles.main}>
                                    <FlatList
                                        data={historialList}
                                        renderItem={(item) => {
                                            if (
                                                allProd != undefined &&
                                                allPlatos != undefined
                                            ) {
                                                if (item.item.plato === 0) {
                                                    //producto aca
                                                    return (
                                                        <FoodSearch
                                                            navigation={
                                                                navigation
                                                            }
                                                            data={
                                                                allProd.filter(
                                                                    (prod) =>
                                                                        prod.ID ===
                                                                        item
                                                                            .item
                                                                            .producto
                                                                )[0]
                                                            }
                                                            key={item.index}
                                                        />
                                                    );
                                                } else {
                                                    //plato acá
                                                    return (
                                                        <FoodSearch
                                                            navigation={
                                                                navigation
                                                            }
                                                            data={
                                                                allPlatos.filter(
                                                                    (prod) =>
                                                                        prod.ID ===
                                                                        item
                                                                            .item
                                                                            .plato
                                                                )[0]
                                                            }
                                                            key={item.index}
                                                        />
                                                    );
                                                }
                                            }
                                        }}
                                        keyExtractor={(item, index) =>
                                            index.toString()
                                        }
                                        ListEmptyComponent={() => (
                                                <Text style={styles.emptyText}>
                                                    No existen busquedas
                                                    recientes, empezá a buscar
                                                    los productos y recetas que
                                                    quieras y aparecerán acá.
                                                </Text>
                                        )}
                                    />
                                </View>
                            ) : (
                                <>
                                    {PlatosList !== undefined &&
                                    ProductosList !== undefined &&
                                    submitted ? (
                                        <View style={styles.main}>
                                            <FlatList
                                                data={PlatosList.concat(
                                                    ProductosList
                                                )}
                                                keyExtractor={(item, index) =>
                                                    index.toString()
                                                }
                                                renderItem={(item) => (
                                                    <FoodSearch
                                                        navigation={navigation}
                                                        data={item.item}
                                                        key={item.index}
                                                    />
                                                )}
                                                ListEmptyComponent={() => 
                                                    <Text
                                                        style={
                                                            styles.emptyText
                                                        }
                                                    >
                                                        No existen
                                                        elementos
                                                        asociados a tu
                                                        búsqueda
                                                    </Text>
                                                }
                                            />
                                        </View>
                                    ) : (
                                        <View style={styles.emptyContainer}>
                                            <ActivityIndicator
                                                color={colors.secondary}
                                                size={"large"}
                                            />
                                        </View>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </>
            )}

            {filterModal()}
        </View>
    );
};

export default Search;
