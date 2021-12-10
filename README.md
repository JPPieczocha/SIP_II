# Seminario de Integración Profesional II - SafeDiet
Aplicación Mobile de recomendación de platos y productos para personas con enfermedades autoinmunes. Desarrollado utilizando React Native.

Proyecto relacionado a la materia "Seminario de Integración Profesional II" en UADE.
Desarrollada con propósitos educativos. Developed for educational purposes. 

El objetivo es atacar la problemática acerca de qué platos puede o no comer una persona con las enfermedades de celiaquía, diabetes y obesidad. Con esta aplicación una persona podría acceder a la información de distintos platos y productos para saber si son aptos para el consumo.

<p align="center">
  <img alt="SafeDiet Logo" src="https://raw.githubusercontent.com/cricartez/SIP_II/master/assets/logo.png" />
</p>

## Table of Contents

- [Funcionamiento](#funcionamiento)
- [API Components/Packages Used](#api-componentspackages-used)

## Funcionamiento

* Inicio de Sesión y Registro
<p align="center">
    Lo primero que va a ver un usuario al instalar la aplicación. Si es un usuario nuevo se registraría e indicaría las enfermedades que padece, si ya lo hizo simplemente inicia sesión.
  <img alt="Login/Register" src="https://raw.githubusercontent.com/cricartez/SIP_II/master/assets/captures/Login.jpeg" />
</p>

* Página Principal
<p align="center">
    Una vez haya iniciado sesión verá la pantalla principal con los distintos carruseles.
  <img alt="Home" src="https://raw.githubusercontent.com/cricartez/SIP_II/master/assets/captures/Home.jpeg" />
</p>

* Información de Platos y Productos
<p align="center">
    Al seleccionar un plato y producto se mostrará la información detallada de estos con su respectiva información. El usuario puede además agregarlo como favorito y aparecería en el carrusel de la pantalla principal.
</p>

| Recetas  | Productos | Alerta de consumo |
| ------------- | ------------- | ------------- |
| <img alt="Recipe" src="https://raw.githubusercontent.com/cricartez/SIP_II/master/assets/captures/Recipe.jpeg" />  | <img alt="Product" src="https://raw.githubusercontent.com/cricartez/SIP_II/master/assets/captures/Product.jpeg" />  | <img alt="Warning" src="https://raw.githubusercontent.com/cricartez/SIP_II/master/assets/captures/Warning.jpeg" />  |

* Busqueda
<p align="center">
    El usuario puede buscar a partir del nombre de algún producto o plato. Además se puede filtrar según las patologías.
  <img alt="Search" src="https://raw.githubusercontent.com/cricartez/SIP_II/master/assets/captures/Search.jpeg" />
</p>

* Plan Semanal
<p align="center">
    La aplicación genera un menú semanal acorde a sus patologías informando las calorías y carbohidratos. Se tiene para cada día de la semana y para cada una de las distintas comidas un alimento acompañado de una bebida.
  <img alt="Plan" src="https://raw.githubusercontent.com/cricartez/SIP_II/master/assets/captures/Plan.jpeg" />
  <img alt="Detail" src="https://raw.githubusercontent.com/cricartez/SIP_II/master/assets/captures/Plan%20Detail.jpeg" />
</p>

* Perfil
<p align="center">
    En el perfil se puede ver la información del usuario y las patologías, estas pueden ser actualizadas cuando el usuario lo desee.
  <img alt="Profile" src="https://raw.githubusercontent.com/cricartez/SIP_II/master/assets/captures/Profile.jpeg" />
</p>


## API Components/Packages Used
    "@react-navigation/bottom-tabs": "^6.0.7",
    "@react-navigation/native": "^6.0.4",
    "@react-navigation/native-stack": "^6.2.2",
    "axios": "^0.23.0",
    "expo": "~42.0.1",
    "expo-font": "~9.2.1",
    "expo-secure-store": "^11.0.3",
    "expo-status-bar": "~1.0.4",
    "react": "16.13.1",
    "react-dom": "16.13.1",
    "react-native": "https://github.com/expo/react-native/archive/sdk-42.0.0.tar.gz",
    "react-native-emoji": "^1.8.0",
    "react-native-safe-area-context": "3.2.0",
    "react-native-screens": "~3.4.0",
    "react-native-simple-radio-button": "^2.7.4",
    "react-native-snap-carousel": "^3.9.1",
    "react-native-web": "~0.13.12"