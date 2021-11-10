import React from 'react'
import { View, Text, FlatList } from 'react-native'

import styles from './Styles';
import FoodItem from '../FoodItem/FoodItem'

import { UserContext } from '../../../../context/authContext'; 

export default function Carousel({navigation, data, type, title}) {
    
    const context = React.useContext(UserContext)
    
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{title}</Text>
                {data === undefined ?
                    <View>
                        <Text style={{textAlign: 'center'}}>No hay alimentos en este momento, intente más tarde.</Text>
                    </View>
                :
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={data}
                        renderItem={(item) => {
                        
                            if((context.state.userData.Celiaquia == item.item.Celiquia) && context.state.userData.Celiaquia == 1 && context.state.userData.Tipo1 ==  item.item.Tipo1 && context.state.userData.Tipo2 ==  item.item.Tipo2  &&  context.state.userData.Obesidad ==  item.item.Obesidad){
                                return <FoodItem key={item.index} type={type} data={item.item} navigation={navigation}/>
                            }
        
                            if((context.state.userData.Tipo1 == item.item.Tipo1) && context.state.userData.Tipo1 == 1 && context.state.userData.Tipo1 ==  item.item.Tipo1 && context.state.userData.Tipo2 ==  item.item.Tipo2 &&  context.state.userData.Obesidad ==  item.item.Obesidad){
                                return <FoodItem key={item.index} type={type} data={item.item} navigation={navigation}/>
                            }
        
                            if((context.state.userData.Tipo2 == item.item.Tipo2) && context.state.userData.Tipo2 == 1 && context.state.userData.Tipo1 ==  item.item.Tipo1 && context.state.userData.Tipo2 ==  item.item.Tipo2 &&  context.state.userData.Obesidad ==  item.item.Obesidad){
                                return <FoodItem key={item.index} type={type} data={item.item} navigation={navigation}/>
                            }
                            if((context.state.userData.Obesidad == item.item.Obesidad) && context.state.userData.Obesidad == 1 && context.state.userData.Tipo1 ==  item.item.Tipo1 && context.state.userData.Tipo2 ==  item.item.Tipo2 &&  context.state.userData.Obesidad ==  item.item.Obesidad){
                                return <FoodItem key={item.index} type={type} data={item.item} navigation={navigation}/>
                            }
                            
                            return <FoodItem key={item.index} type={type} data={item.item} navigation={navigation}/>

                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                }
        </View>
    )
}
