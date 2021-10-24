import React from 'react'
import { View, Text } from 'react-native'

import styles from './Styles'

export default function Product({navigation, route}) {

    const {nombre, id} = route.params

    return (
        <View>
            <Text>Producto</Text>
            <Text>{nombre}</Text>
            <Text>{id}</Text>
        </View>
    )
}
