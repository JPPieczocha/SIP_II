import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './Styles';


export default function FoodItem({navigation, data}) {

    const handleTouch = () => {
        if(data.type === 'product'){
            navigation.navigate('Product', {nombre: data.title, id: data.id});
        }else{
            navigation.navigate('Recipe',  {nombre: data.title, id: data.id});
        }
    }

    return (
        <TouchableOpacity style={styles.container} onPress={()=> handleTouch()}>
            <Image
                style= {{width: '100%', height: '100%', borderRadius: 15}}
                source={{
                    uri: data.imagen,
                }}
            />
            <View style={styles.tag}>
                <Text style={styles.tagText} adjustsFontSizeToFit={true} numberOfLines={2}>{data.title}</Text>
            </View>
        </TouchableOpacity>
    )
}