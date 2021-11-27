import React from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'

import styles from './Styles';
import FoodItem from '../FoodItem/FoodItem'

import colors from '../../colors';

export default function Carousel({navigation, data, type, title}) {

    const emptyCarousel = (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No pudimos acceder a los {title.toLowerCase()}, intentelo más tarde.</Text>
        </View>
    )
    
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{title}</Text>
            {data === undefined ?
                <View style={styles.emptyContainer}>
                    <ActivityIndicator size='large' color={colors.secondary} />
                </View>
            :   
                data.length === 0 ? emptyCarousel :
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    renderItem={(item) => <FoodItem key={item.index} type={type} data={item.item} navigation={navigation}/> }
                    keyExtractor={(item, index) => index.toString()}
                />
            }
        </View>
    )
}
