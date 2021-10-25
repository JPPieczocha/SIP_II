import React, {useState} from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import InfoNutriItem from '../common/components/InfoNutriItem/InfoNutriItem'

import styles from './Styles'
import Color from '../common/colors'


export default function Product({navigation, route}) {

    const {nombre, id, imagen} = route.params

    const [fav, setFav] = useState(false)

    const infoData = [
        {
            nombre: 'Kilocalorías',
            valor: '250'
        },

        {
            nombre: 'Carbohidratos',
            valor: '13 gr'
        },

        {
            nombre: 'Grasas',
            valor: '9 gr'
        },

        {
            nombre: 'Proteínas',
            valor: '1.7 gr'
        },

        {
            nombre: 'Fibra',
            valor: '1 gr'
        },

        {
            nombre: 'Sodio',
            valor: '190 mg'
        },

        {
            nombre: '% de k/dia',
            valor: '5%'
        },

        
    ]

    return (
        <View>
            <ScrollView>

                <Image
                    resizeMode='stretch'
                    style={{
                        width:'100%',
                        aspectRatio: 1/1,
                        justifyContent:'flex-end'
                    }}
                    source={{
                        uri: imagen
                    }}
                />

                <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => navigation.goBack()}>
                    <Ionicons name={'arrow-back'} color={Color.secondary} size={32} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.favButton]} onPress={() => setFav(!fav)}>
                    <Ionicons name={fav? 'heart' : 'heart-outline'} color={Color.secondary} size={32} />
                </TouchableOpacity>

                <Text style={styles.title}>{nombre}</Text>
                <Text style={styles.description}>Ullamco sit irure incididunt laborum nostrud nostrud enim. Veniam quis nulla sit eiusmod magna mollit labore.</Text>

                <Text style={styles.title}>Información Nutricional</Text>
                <Text style={styles.description}>Porción: 25gr</Text>
                
                <View style={styles.infoNutricional}>
                    {
                        infoData.map(item => {
                            return(
                                <InfoNutriItem key={item.nombre} data={item}/>
                            )
                        })
                    }
                </View>

            </ScrollView>
            

        </View>
    )
}
