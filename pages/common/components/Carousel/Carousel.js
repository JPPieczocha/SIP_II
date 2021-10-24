import React from 'react'
import { View, Text, ScrollView } from 'react-native'

import styles from './Styles';
import FoodItem from '../FoodItem/FoodItem'

export default function Carousel(props) {
    
    return (
        <View key={props.data.id} style={styles.container}>
            <Text style={styles.titleText}>{props.data.title}</Text>

            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                {props.data.food.map(item => <FoodItem key={item.id} data={item}/>)}
            </ScrollView>
        </View>
    )
}
