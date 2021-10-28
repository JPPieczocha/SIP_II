import React from 'react'
import { View, Text, ScrollView } from 'react-native'

import styles from './Styles';
import FoodItem from '../FoodItem/FoodItem'

export default function Carousel({navigation, data, type, title, userData}) {
    
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{title}</Text>

            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                {data === undefined ? null : data.map(item => {
                    if((userData.Celiaquia == item.Celiquia) && userData.Celiaquia == 1 && userData.Tipo1 ==  item.Tipo1 && userData.Tipo2 ==  item.Tipo2  &&  userData.Obesidad ==  item.Obesidad){
                        return <FoodItem key={type + item.ID.toString()} type={type} data={item} navigation={navigation}/>
                    }

                    if((userData.Tipo1 == item.Tipo1) && userData.Tipo1 == 1 && userData.Tipo1 ==  item.Tipo1 && userData.Tipo2 ==  item.Tipo2 &&  userData.Obesidad ==  item.Obesidad){
                        return <FoodItem key={type + item.ID.toString()} type={type} data={item} navigation={navigation}/>
                    }

                    if((userData.Tipo2 == item.Tipo2) && userData.Tipo2 == 1 && userData.Tipo1 ==  item.Tipo1 && userData.Tipo2 ==  item.Tipo2 &&  userData.Obesidad ==  item.Obesidad){
                        return <FoodItem key={type + item.ID.toString()} type={type} data={item} navigation={navigation}/>
                    }
                    if((userData.Obesidad == item.Obesidad) && userData.Obesidad == 1 && userData.Tipo1 ==  item.Tipo1 && userData.Tipo2 ==  item.Tipo2 &&  userData.Obesidad ==  item.Obesidad){
                        return <FoodItem key={type + item.ID.toString()} type={type} data={item} navigation={navigation}/>
                    }
                })}
            </ScrollView>
        </View>
    )
}
