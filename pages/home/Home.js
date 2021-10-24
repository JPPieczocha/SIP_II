import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Carousel from '../common/components/Carousel/Carousel'

import styles from './Styles';

import logoSafeDiet from '../../assets/logo.png';

const carouselData = [
    {
        id:0,
        title: 'Tus Favoritos',
        food: [
            {
                id: 0,
                title: 'Gomitas Mogul Arcor',
                type: 'product',
                imagen: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/462/517/products/captura-de-pantalla-2020-05-09-a-las-21-03-071-90a7f95c402b5edccc15890690706368-1024-1024.png'
            },
            {
                id: 0,
                title: 'Canelones de Verdura TACC Free',
                imagen: 'https://palermonline.com.ar/wordpress/wp-content/uploads/2021/04/canelones-12.jpg'
            },
            {
                id: 2,
                title: 'Milanesas de berenjena',
                imagen: 'https://cdn1.cocina-familiar.com/recetas/thumb/berenjenas-a-la-milanesa.JPG'
            }
        ]
    },

    {
        id:1,
        title: 'Recetas Populares',
        food: [
            {
                id: 4,
                title: 'Brownies Veganos',
                imagen: 'https://es.cravingsjournal.com/wp-content/uploads/2020/10/brownies-halloween-1.jpg'
            },
            {
                id: 5,
                title: 'Lasaña TACC Free',
                imagen: 'https://www.recetasdesbieta.com/wp-content/uploads/2018/10/lasagna-original..jpg'
            },
            {
                id: 6,
                title: 'Cheesecake',
                imagen: 'https://recetascheesecake.com/wp-content/uploads/cheesecake-fresa-con-gelatina.jpg'
            }
        ]
    },

    {
        id:2,
        title: 'Productos Populares',
        food: [
            {
                id: 7,
                title: 'Don Satur',
                type: 'product',
                imagen: 'https://www.deliargentina.com/image/cache/catalog/product/alimentacion/bizcochitos-salados-de-grasa-don-satur-argentinos/bizcochitos-salados-de-grasa-don-satur-argentinos-1000x1000.png'
            },
            {
                id: 8,
                title: 'Papas de Tubo Dia%',
                type: 'product',
                imagen: 'https://ardiaprod.vteximg.com.br/arquivos/ids/185481-1000-1000/Papas-Fritas-Tubo-DIA-Sabor-Original-150-Gr-_1.jpg?v=637427566304670000'
            },
            {
                id: 9,
                title: 'Galletitas Variedad Terrabusi',
                type: 'product',
                imagen: 'https://arcordiezb2c.vteximg.com.br/arquivos/ids/164245-500-400/Galletitas-Variedad-Terrabusi-410-Gr-1-6743.jpg?v=637594758056770000'
            },

        ]
    },

    
]

function HomeScreen({navigation}) {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

            <View style={styles.header}> 

                <View style={styles.titleContainer}>
                    <Text style={styles.headerTitle} adjustsFontSizeToFit={true} numberOfLines={1}>Hola, Peter</Text>
                    <Text style={styles.headerSubtitle}>¿Qué querés comer hoy?</Text>
                </View>

                <Image source={logoSafeDiet} style={styles.headerLogo}/>

            </View>


            <View>
                <Carousel key={0} data={carouselData[0]} navigation={navigation} />
                <Carousel key={1} data={carouselData[1]} navigation={navigation} />
                <Carousel key={2} data={carouselData[2]} navigation={navigation} />
            </View>

            <Text></Text>

        </ScrollView>
    );
}

export default HomeScreen;