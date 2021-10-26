import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    Image,
    TextInput,
    Modal,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    Platform,
} from "react-native";
import RadioForm, {
    RadioButton,
    RadioButtonInput,
    RadioButtonLabel,
} from "react-native-simple-radio-button";

import FoodSearch from "../common/components/FoodSearch/FoodSearch";
import styles from "./Styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import logo from "../../assets/logo.jpeg";
import colors from "../common/colors";

const Search = ({ navigation }) => {
    const dummyData = [
        {
            id: 0,
            title: "Gomitas Mogul Arcor",
            type: "product",
            imagen: "https://d3ugyf2ht6aenh.cloudfront.net/stores/462/517/products/captura-de-pantalla-2020-05-09-a-las-21-03-071-90a7f95c402b5edccc15890690706368-1024-1024.png",
        },
        {
            id: 1,
            title: "Canelones de Verdura TACC Free",
            type: "product",
            imagen: "https://palermonline.com.ar/wordpress/wp-content/uploads/2021/04/canelones-12.jpg",
        },
        {
            id: 2,
            title: "Milanesas de berenjena",
            type: "product",
            imagen: "https://cdn1.cocina-familiar.com/recetas/thumb/berenjenas-a-la-milanesa.JPG",
        },
        {
            id: 4,
            title: "Brownies Veganos",
            type: "product",
            imagen: "https://es.cravingsjournal.com/wp-content/uploads/2020/10/brownies-halloween-1.jpg",
        },
        {
            id: 5,
            title: "Lasaña TACC Free",
            type: "product",
            imagen: "https://www.recetasdesbieta.com/wp-content/uploads/2018/10/lasagna-original..jpg",
        },
        {
            id: 6,
            title: "Cheesecake",
            type: "product",
            imagen: "https://recetascheesecake.com/wp-content/uploads/cheesecake-fresa-con-gelatina.jpg",
        },
    ];

    const [showFilter, setShowFilter] = useState(false);

    const [foodType, setFoodType] = useState(1);
    const [sugarFree, setSugarFree] = useState(false);
    const [taccFree, setTaccFree] = useState(false);
    const [lowCal, setLowCal] = useState(false);

    const [searchInput, setSearchInput] = useState("");

    var radio_props_food = [
        { label: "Recetas", value: 0 },
        { label: "Ambos", value: 1 },
        { label: "Productos", value: 2 },
    ];

    useEffect(() => {
        console.log("HOLA");
    }, []);

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
                <View style={styles.modalFilter}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTextHeader}>Filtros</Text>
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
                                initial={1}
                                onPress={(value) => setFoodType(value)}
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
                                <Text>Sugar Free</Text>

                                <TouchableOpacity
                                    style={styles.checkBox}
                                    onPress={() => setSugarFree(!sugarFree)}
                                >
                                    <Text style={{ color: colors.secondaryv2 }}>
                                        {sugarFree ? "X" : ""}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.formContainerItem}>
                                <Text>Sin TACC</Text>

                                <TouchableOpacity
                                    style={styles.checkBox}
                                    onPress={() => setTaccFree(!taccFree)}
                                >
                                    <Text style={{ color: colors.secondaryv2 }}>
                                        {taccFree ? "X" : ""}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.formContainerItem}>
                                <Text>Bajas en Caloría</Text>

                                <TouchableOpacity
                                    style={styles.checkBox}
                                    onPress={() => setLowCal(!lowCal)}
                                >
                                    <Text style={{ color: colors.secondaryv2 }}>
                                        {lowCal ? "X" : ""}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.applyButton}>
                            <Text style={styles.applyButtonText}>Aplicar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
                    onChangeText={(text) => setSearchInput(text)}
                    keyboardType={"default"}
                    onSubmitEditing={() => console.log(searchInput)}
                ></TextInput>
                <TouchableOpacity
                    style={styles.iconFilter}
                    onPress={() => setShowFilter(true)}
                >
                    <Text style={styles.iconFilterText}>F</Text>
                </TouchableOpacity>
            </View>

            <Text style={[styles.headerTitle, { marginLeft: 10 }]}>
                Recientes
            </Text>

            <View style={styles.main}>
                <FlatList
                    data={dummyData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={(item) => (
                        <FoodSearch navigation={navigation} data={item.item} />
                    )}
                />
            </View>

            {filterModal()}
        </View>
    );
};

export default Search;
