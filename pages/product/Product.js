import React, {useState, useEffect} from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import InfoNutriItem from '../common/components/InfoNutriItem/InfoNutriItem'
import ModalWarning from "../common/components/ModalWarningFood/ModalWarningFood";

import styles from './Styles'
import Color from '../common/colors'

import { getProducto } from '../../controllers/productosController';


export default function Product({navigation, route}) {

    const { data } = route.params;

    const [listInfoNutr, setListInfoNutr] = useState([]);

    useEffect(() => {

        const fetchProducto = async () => {
            const response = await getProducto(data.ID);
            if(response === undefined){
            }else{
              console.log('InfoNutricional: ');
              console.log(response);
              setListInfoNutr(response);
              // setFetched(true);
            }
        }
        fetchProducto();
        handlePatology()

    }, []);

    // const {nombre, id, imagen} = route.params

    const [fav, setFav] = useState(false)

    const infoData = [
        {
            nombre: 'Kilocalorías ',
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



    const handlePatology = () => {

        let userDummy = {
            Usuario: 1,
            Celiaquia: 1,
            Tipo1: 0,
            Tipo2: 0,
            Obesidad: 0,
            Nombre: "TESTE",
            Mail: "test@gmail.com",
            Clave: "123"
        }

    if (userDummy.Celiaquia == 1 && data.Celiquia == 0) return true
    if (userDummy.Tipo1 == 1 && data.Tipo1 == 0) return true
    if (userDummy.Tipo2 == 1 && data.Tipo2 == 0) return true
    if (userDummy.Obesidad == 1 && data.Obesidad == 0) return true
	return false

    }

    return (
        <View>
            <ModalWarning navigation={navigation} msg={"este producto"} show={()=>handlePatology()}/>

            <ScrollView>

                <Image
                    resizeMode='stretch'
                    style={{
                        width:'100%',
                        aspectRatio: 1/1,
                        justifyContent:'flex-end'
                    }}
                    source={{
                        uri: data.Foto
                    }}
                />

                <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => navigation.goBack()}>
                    <Ionicons name={'arrow-back'} color={Color.secondary} size={32} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.favButton]} onPress={() => setFav(!fav)}>
                    <Ionicons name={fav? 'heart' : 'heart-outline'} color={Color.secondary} size={32} />
                </TouchableOpacity>

                <Text style={styles.title}  adjustsFontSizeToFit={true} numberOfLines={2}>{data.Nombre}</Text>

                <Text style={styles.description}>{data.Descripcion}</Text>

                <Text style={styles.title}>Información Nutricional</Text>
                <Text style={styles.description}>Porción: 25gr</Text>
                

                <View style={styles.infoNutricional}>
                    {listInfoNutr.length === 0 ? <ActivityIndicator color={Color.extra} size={'large'} /> :
                        listInfoNutr.map(item => {
                            return(
                                <InfoNutriItem key={item.Nombre} data={item}/>
                            )
                        })
                    }
                </View>

            </ScrollView>
            

        </View>
    )
}
