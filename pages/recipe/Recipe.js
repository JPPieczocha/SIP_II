import React from 'react'
import { View, Text } from 'react-native'

import styles from './Styles'

export default function Recipe({navigation, route}) {

    const {nombre, id} = route.params

    return (
        <View>
            <Text>Receta</Text>
            <Text>{nombre}</Text>
            <Text>{id}</Text>
        </View>
    )
}