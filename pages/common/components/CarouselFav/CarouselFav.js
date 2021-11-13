import React, {useState} from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";

import styles from "./Styles";
import FoodItem from "../FoodItem/FoodItem";


import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../../colors";


export default function CarouselFav({ navigation, data, productos, platos }) {

    const [fav, setFav] = useState(false)

    const handleRender = (item) => {
        if (item.item.Plato === 0) {
            return productos === undefined ? null : (
                <FoodItem
                    key={item.index}
                    navigation={navigation}
                    data={
                        productos.filter(
                            (prod) => prod.ID === item.item.Producto
                        )[0]
                    }
                    type={"product"}
                />
            );
        } else {
            return platos === undefined ? null : (
                <FoodItem
                    key={item.index}
                    navigation={navigation}
                    data={
                        platos.filter((prod) => prod.ID === item.item.Plato)[0]
                    }
                    type={"recipe"}
                />
            );
        }
    };

    const renderEmpty = (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
                No tienes alimentos favoritos, para agregarlos presiona el botón de favoritos para agregarlos acá.
            </Text>
            <TouchableOpacity
                style={[styles.button]}
                onPress={() => {setFav(!fav)}}
            >
                <Ionicons
                    name={fav ? "heart" :"heart-outline"}
                    color={colors.secondary}
                    size={32}
                />
            </TouchableOpacity>

        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Favoritos</Text>
            {data === undefined ||
            productos === undefined ||
            platos === undefined ? 
                <View style={styles.activityIndicator}>
                    <ActivityIndicator size='large' color={colors.secondary} />
                </View>
            :
                <>
                { data.length === 0 ?
                    renderEmpty
                :
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={data}
                        renderItem={(item) => handleRender(item)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                }
                </>
            }
        </View>
    );
}
