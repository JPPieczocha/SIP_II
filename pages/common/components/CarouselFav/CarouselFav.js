import React from 'react'
import { View, Text, ScrollView } from 'react-native'

import styles from './Styles';
import FoodItem from '../FoodItem/FoodItem'

import { UserContext } from '../../../../context/authContext'; 

export default function CarouselFav({navigation, data, type, title}) {
    
    const context = React.useContext(UserContext)
    
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{title}</Text>

            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                {data.length === 0 ?
                    <View>
                        <Text>No tienes favoritos, puedes agregarlos entrando </Text>
                    </View>
                :
                    data.map( item => <FoodItem key={type + item.ID.toString()} type={type} data={item} navigation={navigation}/> )
                }
            </ScrollView>
        </View>
    )
}
