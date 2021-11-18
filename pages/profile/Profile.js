import React, { useState } from 'react';
import { Text, View, TextInput, CheckBox, TouchableOpacity, ScrollView, Image, ActivityIndicator, Modal } from 'react-native';
import styles from '../common/styles'
import logo from '../../assets/logo.jpeg';
import colors from '../common/colors';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from "../../context/authContext";

function ProfileScreen() {
    const navigation = useNavigation();
    const context = React.useContext(UserContext);
    const userData = context.state != undefined && context.state.userData != undefined ? context.state.userData : {}
    let fullName = userData.Nombre != undefined && userData.Nombre != undefined? `${userData.Nombre}` : ""
    let email = userData.Mail != undefined ? userData.Mail : ""

    function goToMyData(){
        navigation.navigate("ProfileMyData")
    }

    function goToMyPlans(){
        navigation.navigate("ProfileMyPlans")
    }

    async function doLogout(){
        context.authContext.signOut()
    }

    return (
        <View style={{
                ...styles.container,
                display:"flex",
                width:"100%",
                height:"100%",
            }} 
            showsVerticalScrollIndicator={false}>
            
            <ScrollView 
                contentContainerStyle={{
                    height:"100%"
                }}
                style={{
                    width:"100%",
                }}
            >
                <View style={
                    {
                        ...styles.formContainer,
                        display:"flex",
                        width:"100%",
                        height:"100%",
                        paddingLeft:14,
                        paddingRight: 14,
                    }
                    }>
                    <View style={{
                        height: 150,
                        display:"flex",
                        flexDirection:"row"
                    }}>
                        <View
                            style={{
                                display:"flex",
                                justifyContent:"center",
                                alignSelf:"center",
                                borderWidth: 1,
                                borderColor:colors.secondary,
                                borderRadius: 40,
                                height:70,
                                padding: 10
                            }}
                        >
                            <Image
                            style={{
                                ...styles.logoIcon,
                            }}
                            source={logo} />
                        </View>
                        <View
                            style={{
                                display:"flex",
                                justifyContent:"center",
                                width:"100%",
                                paddingLeft: 14
                            }}
                        >
                            <Text
                                adjustsFontSizeToFit={true}
                                numberOfLines={1}
                                style={{
                                    fontFamily:"SimplyDiet",
                                    fontSize: 26,
                                    paddingBottom: 4
                                }}
                            >
                                {fullName}
                            </Text>

                            <Text
                                style={{
                                    fontSize: 14
                                }}
                            >
                                {email}
                            </Text>
                        </View>
                    </View>
                    
                    <TouchableOpacity
                        onPress={() => goToMyData()}
                        style={{
                            padding: 12,
                            marginBottom: 20,
                            backgroundColor:"rgba(0,0,0,0.030)",
                            position: "relative",
                            display:"flex",
                            flexDirection:"row",
                            borderRadius:22
                        }}
                    >
                        <View
                            style={{
                                display: "flex",
                                paddingRight: 12,
                                alignSelf:"center"
                            }}
                        >
                            <FontAwesome5 
                                name="user" 
                                size={28} 
                            color="black" />
                        </View>
                        <View
                            style={{
                                display: "flex",
                                justifyContent:"center",
                                width:"60%"
                            }}
                        >
                        
                            <Text
                                style={{
                                    fontSize: 24,
                                    paddingBottom: 4
                                }}
                            >Mis Datos</Text>
                            <Text
                                style={{
                                    fontSize: 13,
                                }}
                            >
                                Información y patologías del usuario.
                            </Text>
                            
                        </View>

                        <EvilIcons 
                            name="chevron-right" 
                            size={34} 
                            color={colors.primary}
                            style={{
                                position: "absolute",
                                right:10,
                                top:"50%"
                            }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => goToMyPlans()}
                        style={{
                            padding: 12,
                            marginBottom: 20,
                            backgroundColor:"rgba(0,0,0,0.030)",
                            position: "relative",
                            display:"flex",
                            flexDirection:"row",
                            borderRadius:22
                        }}
                    >
                        <View
                            style={{
                                display: "flex",
                                paddingRight: 12,
                                alignSelf:"center"
                            }}
                        >
                            <MaterialCommunityIcons
                                name="food-variant" 
                                size={28} 
                                color="black" 
                            />
                        </View>
                        <View
                            style={{
                                display: "flex",
                                justifyContent:"center",
                                width:"60%"
                            }}
                        >
                        
                            <Text
                                style={{
                                    fontSize: 24,
                                }}
                            >Mis Semanas</Text>
                            <Text
                                style={{
                                    fontSize: 13,
                                }}
                            >
                                Planes dietarios semanales favoritos.
                            </Text>
                            
                        </View>

                        <EvilIcons 
                            name="chevron-right" 
                            size={34} 
                            color={colors.primary}
                            style={{
                                position: "absolute",
                                right:10,
                                top:"50%"
                            }}
                        />
                    </TouchableOpacity>

                    <View
                        style={{
                            display:"flex",
                            justifyContent:"flex-end",
                            alignItems:"center",
                            flexGrow:1,
                            paddingBottom:18
                        }}
                    >
                        <TouchableOpacity 
                            onPress={doLogout} 
                            style={{
                                    ...styles.primaryButton, 
                                    marginBottom:12,
                                    backgroundColor:colors.secondary
                                }}>
                            <Text
                                style={styles.primaryButtonText}>Cerrar Sesión</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </View>
    );
}

export default ProfileScreen;