import React from 'react'
import { View, Text, ScrollView } from 'react-native'

import styles from './Styles';
import FoodItem from '../FoodItem/FoodItem'

export default function Carousel({navigation, data}) {
    
    return (
        <View key={data.id} style={styles.container}>
            <Text style={styles.titleText}>{data.title}</Text>

            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                {data.food.map(item => <FoodItem key={item.type + item.id.toString()} data={item} navigation={navigation}/>)}

            </ScrollView>
        </View>
    )
}
