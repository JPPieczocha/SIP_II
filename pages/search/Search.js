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
    ActivityIndicator
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
import { historial } from "../../controllers/commonController";
import { buscarPlatos } from "../../controllers/recetasController";
import { buscarProductos } from "../../controllers/productosController";

const Search = ({ navigation }) => {

    const [showFilter, setShowFilter] = useState(false);

    const [foodType, setFoodType] = useState(1);
    const [sugarFree, setSugarFree] = useState(false);
    const [taccFree, setTaccFree] = useState(false);
    const [lowCal, setLowCal] = useState(false);

    const [searchInput, setSearchInput] = useState("");
    const [historialList, setHistorialList] = useState([]);
    const [PlatosList, setPlatoslList] = useState([]);
    const [ProductosList, setProductosList] = useState([]);
    const [UnionList, setUnionList] = useState([]);
    // const [historialShow, setHistorialShow] = useState(true);
    const [loading, setLoading] = useState(true);

    var radio_props_food = [
        { label: "Recetas", value: 0 },
        { label: "Ambos", value: 1 },
        { label: "Productos", value: 2 },
    ];

    useEffect(() => {
        const fetchHistorial = async () => {
            const response = await historial(1);
            if(response === undefined){
            }else{
              console.log('HISTORIAL USUARIO 1: ' + response.length);
              setHistorialList(response);
              setLoading(false)
            }
        }

        fetchHistorial();
    }, []);

    const handleSearch = () => {

        setPlatoslList([]);
        setProductosList([])

        if(searchInput === ''){
            return null
        }

        let data = {
            name: searchInput,
            c: Number(taccFree),
            d: Number(sugarFree),
            o: Number(lowCal)
        }

        if(foodType == 1){
            //Means both fetches.
            console.log('Debo preguntar en ambos. Data:::');
            console.log(data);

            const fetchProductos = async () => {
                const response = await buscarProductos(data);
                if(response === undefined){
                }else{
                  console.log('Productos busqueda: ' + response.length);
                }
            }

            const fetchPlatos = async () => {
                const response = await buscarPlatos(data);
                if(response === undefined){
                }else{
                  console.log('Platos busqueda: ' + response.length);
                  setPlatoslList(response);
                }
            }
            fetchProductos();
            fetchPlatos();
        }else if(foodType == 0){
            //Solo recetas
            const fetchPlatos = async () => {
                const response = await buscarPlatos(data);
                if(response === undefined){
                }else{
                  console.log('Platos busqueda: ' + response.length );
                  setPlatoslList(response);
                }
            }
            fetchPlatos()
        }else{
            //Solo productos
            const fetchProductos = async () => {
                const response = await buscarProductos(data);
                if(response === undefined){
                }else{
                  console.log('Productos busqueda: ' + response);
                  setProductosList(response);
                }
            }
            fetchProductos();
        }
    }

    const handleApplyFilter = () => {
        setShowFilter(false);
        console.log('TRIGUEREAR RE BUSQUEDA');
        handleSearch()
    }

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
                                    <Text style={{ color: colors.secondaryv2 }}>
                                        {taccFree ? "✔" : ""}
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
                                        {lowCal ? "✔" : ""}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.applyButton} onPress={()=>handleApplyFilter()}>
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
                    onSubmitEditing={() => handleSearch()}
                />
                <TouchableOpacity
                    style={styles.iconFilter}
                    onPress={() => setShowFilter(true)}
                >
                    <Ionicons name='filter-sharp' size={24} color={colors.secondary}/>
                </TouchableOpacity>
            </View>

            <Text style={[styles.headerTitle, { marginLeft: 10 }]}>
                {searchInput.length == 0 ? 'Recientes' : 'Resultados'}
            </Text>

            { searchInput.length == 0 ?
            <View style={styles.main}>
                <FlatList
                    data={historialList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={(item) => (
                        <FoodSearch navigation={navigation} data={item.item} />
                    )}
                    ListEmptyComponent={()=>{
                        if(loading){
                            return <ActivityIndicator size={'large'} color={colors.secondary}/>
                        }
                        return <Text style={{marginHorizontal: 10}}>No existen busquedas recientes</Text>
                    }}
                />
            </View>
            :
            <View style={styles.main}>
                <FlatList
                    data={PlatosList.concat(ProductosList)}
                    keyExtractor={(item) => item.ID.toString()}
                    renderItem={(item) => (
                        <FoodSearch navigation={navigation} data={item.item} />
                    )}
                    ListEmptyComponent={()=>{
                        if(loading){
                            return <ActivityIndicator size={'large'} color={'#000000'}/>
                        }
                        return <Text style={{marginHorizontal: 10}}>No existen elementos asociados a tu búsqueda</Text>
                    }}
                />
            </View>
            }

            {filterModal()}
        </View>
    );
};

export default Search;
