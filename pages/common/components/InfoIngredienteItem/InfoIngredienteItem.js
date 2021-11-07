import React from 'react'
import { View, Text } from 'react-native'
import Emoji from 'react-native-emoji';
import styles from './Styles'

export default function InfoIngredienteItem({data}) {
    
    return (
        <View style={styles.container}>
            <Emoji name={data.Emoji} style={styles.text} />
            <Text style={styles.text} adjustsFontSizeToFit={true} numberOfLines={2}>{data.Nombre}</Text>
            <Text style={styles.textValue} adjustsFontSizeToFit={true} numberOfLines={1}>{data.Cantidad}</Text>
        </View>
    )
}
