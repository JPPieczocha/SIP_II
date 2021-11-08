import React from 'react'
import { View, Text, ScrollView } from 'react-native'

import styles from './Styles';
import FoodItem from '../FoodItem/FoodItem'

import { UserContext } from '../../../../context/authContext'; 

export default function Carousel({navigation, data, type, title}) {
    
    const context = React.useContext(UserContext)
    
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{title}</Text>

            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                {data === undefined ? null : data.map(item => {
                    if((context.state.userData.Celiaquia == item.Celiquia) && context.state.userData.Celiaquia == 1 && context.state.userData.Tipo1 ==  item.Tipo1 && context.state.userData.Tipo2 ==  item.Tipo2  &&  context.state.userData.Obesidad ==  item.Obesidad){
                        return <FoodItem key={type + item.ID.toString()} type={type} data={item} navigation={navigation}/>
                    }

                    if((context.state.userData.Tipo1 == item.Tipo1) && context.state.userData.Tipo1 == 1 && context.state.userData.Tipo1 ==  item.Tipo1 && context.state.userData.Tipo2 ==  item.Tipo2 &&  context.state.userData.Obesidad ==  item.Obesidad){
                        return <FoodItem key={type + item.ID.toString()} type={type} data={item} navigation={navigation}/>
                    }

                    if((context.state.userData.Tipo2 == item.Tipo2) && context.state.userData.Tipo2 == 1 && context.state.userData.Tipo1 ==  item.Tipo1 && context.state.userData.Tipo2 ==  item.Tipo2 &&  context.state.userData.Obesidad ==  item.Obesidad){
                        return <FoodItem key={type + item.ID.toString()} type={type} data={item} navigation={navigation}/>
                    }
                    if((context.state.userData.Obesidad == item.Obesidad) && context.state.userData.Obesidad == 1 && context.state.userData.Tipo1 ==  item.Tipo1 && context.state.userData.Tipo2 ==  item.Tipo2 &&  context.state.userData.Obesidad ==  item.Obesidad){
                        return <FoodItem key={type + item.ID.toString()} type={type} data={item} navigation={navigation}/>
                    }
                })}
            </ScrollView>
        </View>
    )
}
