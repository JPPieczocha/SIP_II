import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from './common/styles'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './profile'
import Ionicons from 'react-native-vector-icons/Ionicons'
import logo from './../assets/logo.jpeg'

function SearchContent(){
    return (
        <View>
            <Text>Search</Text>
        </View>
    )
}

function HomeContent(){
    return (
        <View style={styles.container}>
            <Image
                style={styles.logoIcon}
                source={logo} />
        </View>
    )
}

const Tab = createBottomTabNavigator();

function HomeScreen() {
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
        
                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarStyle: {...styles.tabBar},
                    tabBarActiveTintColor: '#fafafa',
                    tabBarInactiveTintColor: 'gray',
                })}
        >
            <Tab.Screen name="Home" component={HomeContent} />
            <Tab.Screen name="Search" component={SearchContent} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
        </NavigationContainer>
    );
}

export default HomeScreen;