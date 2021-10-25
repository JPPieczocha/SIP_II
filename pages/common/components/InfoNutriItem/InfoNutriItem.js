import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles'

export default function InfoNutriItem({data}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text} adjustsFontSizeToFit={true} numberOfLines={1}>{data.nombre}</Text>
            <Text style={styles.textValue}>{data.valor}</Text>
        </View>
    )
}
