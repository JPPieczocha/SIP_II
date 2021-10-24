import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Image } from 'react-native';

import { useFonts } from 'expo-font'

import logo from './assets/logo.jpeg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './pages/common/styles';
import HomeScreen from './pages/home/Home';
import Search from './pages/search/Search';
import ProfileScreen from './pages/profile/Profile';
import PlanDietarioScreen from './pages/planDietario/plan_dietario';

function App() {

	// const Stack = createNativeStackNavigator();
	const Tab = createBottomTabNavigator();

    const [loaded] = useFonts({
        SimplyDiet: require('./assets/fonts/SimplyDiet.ttf'),
    });
      
    if (!loaded) {
        return null;
    }

	return (
		<NavigationContainer>
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
                    tabBarInactiveTintColor: 'gray',
                })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Plan" component={PlanDietarioScreen} />
			</Tab.Navigator>

		</NavigationContainer>
		// <HomeScreen></HomeScreen>
	);
}



export default App;