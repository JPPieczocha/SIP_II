import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './Styles';


export default function FoodItem({navigation, data, type}) {

    

    const handleTouch = () => {
        if(type === 'product'){
            navigation.navigate('Product', {nombre: data.Nombre, data: data});
        }else{
            navigation.navigate('Recipe',  {nombre: data.Nombre, data: data});
        }
    }

    return (
        <TouchableOpacity style={styles.container} onPress={()=> handleTouch()}>
            <Image
                style= {{width: '100%', height: '100%', borderRadius: 15}}
                source={{
                    uri: data.Foto,
                }}
            />
            <View style={styles.tag}>
                <Text style={styles.tagText} adjustsFontSizeToFit={true} numberOfLines={2}>{data.Nombre}</Text>
            </View>
        </TouchableOpacity>
    )
}