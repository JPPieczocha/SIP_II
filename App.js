import React, { useRef, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Image } from "react-native";

import axios from "axios";

//Auth nuevo
import * as SecureStore from 'expo-secure-store';
import { UserContext } from './context/authContext';

//Fin auth nuevo

import { useFonts } from "expo-font";

import logo from "./assets/logo.jpeg";
import { FontAwesome5 } from '@expo/vector-icons';
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./pages/common/styles";

import Landing from './pages/landing/Landing'
import LoadingPage from './pages/common/components/loading/Loading'
import HomeScreen from "./pages/home/Home";
import Search from "./pages/search/Search";
import ProfileScreen from "./pages/profile/Profile";
import PlanDietarioScreen from "./pages/planDietario/plan_dietario";
import ProfileMyDataScreen from "./pages/profile/ProfileMyData";
import ProfileMyPlansScreen from "./pages/profile/ProfileMyPlans";
import ProfileMyPlanDetailsScreen from "./pages/profile/ProfileMyPlanDetails";
import LoginScreen from "./pages/login/login";
import RegisterScreen from "./pages/register/register";

import config from "./config";

import Product from "./pages/product/Product";
import Recipe from "./pages/recipe/Recipe";

import colors from "./pages/common/colors";


//------------------------
import { dummyBD } from "./controllers/commonController";
import PlanDietarioDetails from "./pages/planDietario/plan_dietario_details";
import Loading from './pages/common/components/loading/Loading'
//-----------------------
import { getAllPlatos } from './controllers/recetasController'

function App() {
    
    //-------------------------------
    //Auth

    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'SET_SESION':
                    return {
                        ...prevState, 
                        loading: false,
                        signOut: false,
                        userData: action.userData
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState, 
                        loading: false,
                        signOut: true,
                        userData: null
                    };
            }
        },
        {
            loading: true,
            signOut: true,
            userData: null
        }
    )

    const authContext = React.useMemo(() => ({
        signIn: async data => {
            try {
                const saveKeyStore =  await SecureStore.setItemAsync('userData', JSON.stringify(data))
                dispatch({type: 'SET_SESION', userData: data})
            }
            catch (e) {
                console.log("ERROR @ UseMemo: SignIn")
            }

        },
        signOut: async data => {
            const deleteKeyStore = await SecureStore.deleteItemAsync('userData')
            dispatch({ type: 'SIGN_OUT' })
        },
    }),
    []
    );
    
    React.useEffect(() => {
        

        async function fetchSecureStore(){
            try {
                
                const userData = await SecureStore.getItemAsync('userData')
                if (userData !== null){
                    dispatch({type: 'SET_SESION', userData: JSON.parse(userData)})
                } else {
                    dispatch({ type: 'SIGN_OUT' })

                }
            }catch (e){
                console.log('ERROR @ useEffect in App.js');
                console.log(e);
            }
        }

        //Carga de dummyUser en el localStorage
        async function dummySetter() {
            try {
                let userDummy = {
                    Usuario: 1,
                    Celiaquia: 1,
                    Tipo1: 0,
                    Tipo2: 0,
                    Obesidad: 0,
                    Nombre: "dummy thicc",
                    Mail: "dummy@dummy.com",
                    Clave: "pass1234"
                }
                await SecureStore.setItemAsync('userData', JSON.stringify(userDummy))
                console.log('dummyUser set in LocalStorage');
            } catch (e) {
                console.log('Error @ dummySetter')
            }
        }

        // dummySetter()
        fetchSecureStore()
    },[]);
    //---------------------------------

    // Stacks y Tabs de navigation
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();

    // Usar fuentes
    const [loaded] = useFonts({
        SimplyDiet: require("./assets/fonts/SimplyDiet.ttf"),
    });
    if (!loaded) {
        return null;
    }

    //Tab navigators
    const mainTab = () => {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        if (route.name === "Perfil") {
                            return (
                                <FontAwesome5
                                    name={"user"}
                                    size={20}
                                    color={color}
                                />
                            );
                        }

                        let iconName;

                        if (route.name === "Principal") {
                            iconName = "ios-home";
                        }

                        if (route.name === "Buscar") {
                            iconName = "ios-search";
                        }

                        if (route.name === "Plan") {
                            iconName = "md-list";
                        }

                        // You can return any component that you like here!
                        return (
                            <Ionicons
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        );
                    },
                    tabBarStyle: { ...styles.tabBar },
                    tabBarActiveTintColor: "#fafafa",
                    tabBarActiveBackgroundColor: colors.primaryv2,
                    tabBarInactiveTintColor: "black",
                })}
            >
                <Tab.Screen
                    name="Principal"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="Buscar"
                    component={Search}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="Plan"
                    children={() => (
                        <PlanDietarioScreen
                        />
                    )}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="Perfil"
                    children={() => (
                        <ProfileScreen
                        />
                    )}
                    options={{ headerShown: false }}
                />
            </Tab.Navigator>
        );
    };

    const mainNav = () => {
        return(
            <Stack.Navigator>
                <Stack.Screen
                    name="Main"
                    component={mainTab}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Product"
                    component={Product}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Recipe"
                    component={Recipe}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="PlanDetails"
                    component={PlanDietarioDetails}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="ProfileMyData"
                    component={ProfileMyDataScreen}
                    options={{headerShown: false}}
                />

                <Stack.Screen
                    name="ProfileMyPlans"
                    component={ProfileMyPlansScreen}
                    options={{headerShown: false}}
                />

                <Stack.Screen
                    name="ProfileMyPlanDetails"
                    component={ProfileMyPlanDetailsScreen}
                    options={{headerShown: false}}
                />

                
            </Stack.Navigator>
        )
    }

    const landingNav = () => {
        return(
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component= {Landing}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Main"
                    component={mainTab}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        )
    }


    return (
        <NavigationContainer>
            <UserContext.Provider value={{authContext, state}}>
                <Stack.Navigator>
                        {state.loading ? <Stack.Screen name="load" component={LoadingPage} options={{headerShown: false}}/> : null}
                        {
                            state.signOut ?
                            <Stack.Screen name="landingNav" component={landingNav} options={{headerShown: false}}/> :
                            <Stack.Screen name="mainNav" component={mainNav} options={{headerShown: false}}/>
                        }
                </Stack.Navigator>
            </UserContext.Provider>
        </NavigationContainer>
    );
}

export default App;
