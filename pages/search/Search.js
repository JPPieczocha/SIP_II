import React from 'react';
import { Text, View, Image, TextInput, Modal } from 'react-native';

import FoodItem from '../common/components/FoodItem/FoodItem';
import styles from './Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import logo from '../../assets/logo.jpeg';

const Search = ({navigation}) => {

    const filterModal = () => {
        return(
            <Modal
            
            
            
            
            >


            </Modal>
        )
    }




    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Image style={styles.headerLogo} source={logo} />;
                <Text style={styles.headerTitle}>¿Buscabas algo?</Text>
            </View>

            <View style={styles.mainIput}>
                <TextInput style={styles.input} placeholder={'Escriba aquí'}></TextInput>
                <Text style={styles.iconFilter}>F</Text>
            </View>

            <View style={styles.main}>

            </View>

            {filterModal()}

        </View>
    )
};

export default Search;