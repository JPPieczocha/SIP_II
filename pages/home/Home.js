import React, { useEffect, useState } from "react";
import { Text, View, Image, ScrollView, ActivityIndicator} from "react-native";

import Carousel from "../common/components/Carousel/Carousel";
import Color from '../common/colors'
import styles from "./Styles";

import logoSafeDiet from "../../assets/logo.png";
import { dummyBD } from '../../controllers/commonController';
// import { getAllPlatos } from "../../controllers/recetasController";
import { historial } from "../../controllers/commonController";
import { favoritos } from "../../controllers/commonController";
import { getAllPlatos } from '../../controllers/recetasController';
import { getAllProductos } from '../../controllers/productosController';




const carouselData = [
    {
        id: 0,
        title: "Tus Favoritos",
        food: [
            {
                id: 0,
                title: "Gomitas Mogul Arcor",
                type: "product",
                imagen: "https://d3ugyf2ht6aenh.cloudfront.net/stores/462/517/products/captura-de-pantalla-2020-05-09-a-las-21-03-071-90a7f95c402b5edccc15890690706368-1024-1024.png",
            },
            {
                id: 0,
                title: "Canelones de Verdura TACC Free",
                imagen: "https://palermonline.com.ar/wordpress/wp-content/uploads/2021/04/canelones-12.jpg",
            },
            {
                id: 2,
                title: "Milanesas de berenjena",
                imagen: "https://cdn1.cocina-familiar.com/recetas/thumb/berenjenas-a-la-milanesa.JPG",
            },
        ],
    },

    {
        id: 1,
        title: "Recetas Populares",
        food: [
            {
                id: 4,
                title: "Brownies Veganos",
                imagen: "https://es.cravingsjournal.com/wp-content/uploads/2020/10/brownies-halloween-1.jpg",
            },
            {
                id: 5,
                title: "Lasaña TACC Free",
                imagen: "https://www.recetasdesbieta.com/wp-content/uploads/2018/10/lasagna-original..jpg",
            },
            {
                id: 6,
                title: "Cheesecake",
                imagen: "https://recetascheesecake.com/wp-content/uploads/cheesecake-fresa-con-gelatina.jpg",
            },
        ],
    },

    {
        id: 2,
        title: "Productos Populares",
        food: [
            {
                id: 7,
                title: "Don Satur",
                type: "product",
                imagen: "https://www.deliargentina.com/image/cache/catalog/product/alimentacion/bizcochitos-salados-de-grasa-don-satur-argentinos/bizcochitos-salados-de-grasa-don-satur-argentinos-1000x1000.png",
            },
            {
                id: 8,
                title: "Papas de Tubo Dia%",
                type: "product",
                imagen: "https://ardiaprod.vteximg.com.br/arquivos/ids/185481-1000-1000/Papas-Fritas-Tubo-DIA-Sabor-Original-150-Gr-_1.jpg?v=637427566304670000",
            },
            {
                id: 9,
                title: "Galletitas Variedad Terrabusi",
                type: "product",
                imagen: "https://arcordiezb2c.vteximg.com.br/arquivos/ids/164245-500-400/Galletitas-Variedad-Terrabusi-410-Gr-1-6743.jpg?v=637594758056770000",
            },
        ],
    },
];

function HomeScreen({ navigation}) {

  const [fetched, setFetched] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [loading, setLoading] = useState(true);

  const [listFavoritos,setFavoritos] = useState();
  const [listPlatos, setListPlatos] = useState();
  const [listProductos, setListProductos] = useState();


  useEffect(
    () => {
      let timer1 = setTimeout(() => {

        setSeconds(seconds+1);
        if(!fetched){
          console.log('ENTRÉ FETCH FAVORITOS');
          
          let data = "1"
  
          const fetchFavoritos = async () => {
            const response = await favoritos(data);
            if(response === undefined){
            }else{
              console.log('Favoritos: ');
              console.log(response);
              setFavoritos(response);
              // setFetched(true);
            }
          }
  
          const fetchPlatos = async () => {
            const response = await getAllPlatos();
            if(response === undefined){
            }else{
              console.log('platos: ');
              console.log(response);
              setListPlatos(response);
              // setFetched(true);
            }
          }
  
          const fetchProductos = async () => {
            const response = await getAllProductos();
            if(response === undefined){
            }else{
              console.log('PRODUCTOS: ');
              console.log(response);
              setListProductos(response);
              // setFetched(true);
            }
          }
  
          // fetchFavoritos();
          //fetchPlatos();
          //fetchProductos();
          setFetched(true);
          setLoading(false);
        }else{
          console.log('TIRÉ CONSULTA DUMMY');
          const fetchDummy = async () => {
            const response = await dummyBD();
            if(response === undefined){
            }else{
              console.log(response[0].FUCK_IT);
              setFetched(true);
            }
          }
          //fetchDummy();
        }
      }, 5000);

      // this will clear Timeout
      // when component unmount like in willComponentUnmount
      // and show will not change to true
      return () => {
        clearTimeout(timer1);
      };
    },
    // useEffect will run only one time with empty []
    // if you pass a value to array,
    // like this - [data]
    // than clearTimeout will run every time
    // this value changes (useEffect re-run)
    [seconds]
  );

  const dummyUser = {
    Usuario: 1,
    Celiaquia: 1,
    Tipo1: 0,
    Tipo2: 0,
    Obesidad: 0,
    Nombre: "TESTE",
    Mail: "test@gmail.com",
    Clave: "123"
  }


  return (
      <>
      {loading ? <View style={{ flex: 1, justifyContent: "center"}}><ActivityIndicator size={'large'} color={Color.secondary}/></View>:
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text
            style={styles.headerTitle}
            adjustsFontSizeToFit={true}
            numberOfLines={1}
          >
            Hola, Peter
          </Text>
          <Text style={styles.headerSubtitle}>¿Qué querés comer hoy?</Text>
        </View>

                <Image source={logoSafeDiet} style={styles.headerLogo} />
            </View>

      <View>
        {/* <Carousel key={0} data={carouselData[0]} navigation={navigation} /> */}
        {/* <Carousel key={1} data={carouselData[1]} navigation={navigation} /> */}
        {/* <Carousel key={0} data={listFavoritos} navigation={navigation} type={'recipe'} title={'Favoritos'} /> */}
        <Carousel key={1} data={listPlatos} navigation={navigation} type={'recipe'} title={'Platos recomendados'} userData={dummyUser} />
        <Carousel key={2} data={listProductos} navigation={navigation} type={'product'} title={'Productos recomendados'} userData={dummyUser} />
        
        {/* <Carousel key={2} data={carouselData[2]} navigation={navigation} /> */}
      </View>

      <Text></Text>
      </ScrollView>
      }
      </>
  );
}

export default HomeScreen;
