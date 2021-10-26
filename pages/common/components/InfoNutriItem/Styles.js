import { StyleSheet } from 'react-native';

import Color from '../../colors'

const styles = StyleSheet.create({
    container: {
        width: '27%',
        aspectRatio: 1/1,
        backgroundColor: Color.primaryv2,
        borderRadius: 25,
        margin: 7,
        padding: 3,
        justifyContent: 'space-evenly',

        
    },

    text: {
        color: 'white',
        fontSize: 24,
        maxWidth: '100%',
        maxHeight: '100%',
        alignSelf: 'center',
        textAlign: 'center',
    },

    textValue: {
        color: 'white',
        fontSize: 16,
        alignSelf: 'center',
        textAlign: 'center',
    }
})

export default styles