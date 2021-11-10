import React from 'react'
import { View, Text, FlatList } from 'react-native'

import styles from './Styles';
import FoodItem from '../FoodItem/FoodItem'

import { UserContext } from '../../../../context/authContext';

export default function CarouselFav({navigation, data, productos, platos}) {
    
    const context = React.useContext(UserContext)

    const handleRender = (item) => {
        
        if (item.item.Plato === 0){
            return(productos === undefined ? null : <FoodItem key={item.index} navigation={navigation} data={productos.filter(prod => prod.ID === item.item.Producto)[0]} type={'product'}/>)
        
        } else {
            return(platos === undefined ? null : <FoodItem key={item.index} navigation={navigation} data={platos.filter(prod => prod.ID === item.item.Plato)[0]} type={'recipe'}/>)
            
        }

    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Favoritos</Text>
                {data === undefined && productos === undefined && platos === undefined?
                    <View>
                        <Text style={{textAlign: 'center'}}>No hay alimentos en este momento, intente más tarde.</Text>
                    </View>
                :
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={data}
                        renderItem={(item) => handleRender(item)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                }
        </View>
    )
}
