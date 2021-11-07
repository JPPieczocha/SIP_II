import React from 'react';
import { View, ActivityIndicator, Image } from 'react-native';
import styles from './Styles';
import colors from '../../colors';

const Loading = () => {
    return(
        <View style={styles.container}>
            <Image source={require('../../../../assets/logo.png')} style={styles.img}/>
            <ActivityIndicator size={'large'} color={colors.secondary}/>
        </View>
    )
};

export default Loading;