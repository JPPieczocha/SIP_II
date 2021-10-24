import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './Styles';


export default function FoodItem(props) {


    
    return (
        <TouchableOpacity style={styles.container}>
            <Image
                style= {{width: '100%', height: '100%', borderRadius: 15}}
                source={{
                    uri: props.data.imagen,
                }}
            />
            <View style={styles.tag}>
                <Text style={styles.tagText} adjustsFontSizeToFit={true} numberOfLines={2}>{props.data.title}</Text>
            </View>
        </TouchableOpacity>
    )
}