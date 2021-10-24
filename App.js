import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Image } from 'react-native';
import axios from 'axios'

import { useFonts } from 'expo-font'

import logo from './assets/logo.jpeg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './pages/common/styles';

import HomeScreen from './pages/home/Home';
import Search from './pages/search/Search';
import ProfileScreen from './pages/profile/Profile';
import PlanDietarioScreen from './pages/planDietario/plan_dietario';
import config from './config'

import Product from './pages/product/Product';
import Recipe from './pages/recipe/Recipe'

import colors from './pages/common/colors';

function App() {
    const [userData,setUserData] = React.useState()

    async function fetchUserLoggedData() {
        let loggedUserData = {}
        await axios.get(`${config.backendURLs.getUser}?id_usuario=${config.loggedUser.id}`)
        .then(function(response){
            loggedUserData = response.data
        })

        await axios.get(`${config.backendURLs.patologiasUsuariosGet}?id_usuario=${config.loggedUser.id}`)
        .then(function(response){
            loggedUserData.patologias = response.data
        })

        setUserData(loggedUserData)
    }

    function getUserLoggedData(){
        return userData;
    }

    React.useEffect( () => {
        fetchUserLoggedData();
    }, []);

    function updateLoggedUserData(){
        fetchUserLoggedData()
    }

	// const Stack = createNativeStackNavigator();
	const Tab = createBottomTabNavigator();

    const Stack = createNativeStackNavigator();

    const [loaded] = useFonts({
        SimplyDiet: require('./assets/fonts/SimplyDiet.ttf'),
    });

    if (!loaded) {
        return null;
    }

    const mainTab = () => {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        if (route.name === 'Profile') {
                            return <Image style={styles.tabBarProfileIcon} source={logo} />;
                        }

                        let iconName;
            
                        if (route.name === 'Home') {
                            iconName = 'ios-home';
                        }

                        if (route.name === 'Search') {
                            iconName = 'ios-search';
                        }

                        if (route.name === 'Plan') {
                            iconName = 'md-list';
                        }
        
                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarStyle: {...styles.tabBar},
                    tabBarActiveTintColor: '#fafafa',
                    tabBarActiveBackgroundColor: colors.primaryv2,
                    tabBarInactiveTintColor: 'black',
                })}
        >
                <Tab.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
                <Tab.Screen name="Search" component={Search} />
            <Tab.Screen 
                name="Profile" 
                children={()=><ProfileScreen 
                    userData={userData}
                    onProfileUpdate={updateLoggedUserData}/>
                } 
            />
            <Tab.Screen 
                name="Plan" 
                children={()=><PlanDietarioScreen 
                    userData={userData}
                    getUserData={getUserLoggedData}
                />}
            />
			</Tab.Navigator>
        )
    }

	return (
		<NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Main" component={mainTab} options={{headerShown:false}}/>
                <Stack.Screen name="Product" component={Product}/>
                <Stack.Screen name="Recipe" component={Recipe}/>
                
            </Stack.Navigator>
			

		</NavigationContainer>
	);
}



export default App;