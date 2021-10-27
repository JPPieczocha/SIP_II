import React from 'react'
import { View, Text, ScrollView } from 'react-native'

import styles from './Styles';
import FoodItem from '../FoodItem/FoodItem'

export default function Carousel({navigation, data, type, title}) {
    
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{title}</Text>

            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                {data === undefined ? null : data.map(item => <FoodItem key={type + item.ID.toString()} type={type} data={item} navigation={navigation}/>)}

            </ScrollView>
        </View>
    )
}
