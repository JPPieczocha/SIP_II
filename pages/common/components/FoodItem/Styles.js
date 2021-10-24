import { StyleSheet } from 'react-native';

import Color from '../../colors'

const styles = StyleSheet.create({
    container: {
        height: 192,
        width:  192,
        borderRadius: 15,
        backgroundColor: Color.secondary,
        marginRight: 20
    },

    tag: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '30%',
        backgroundColor: Color.secondary,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 1
    },

    tagText: {
        color: 'white',
        fontSize: 24,
        maxWidth: '100%',
        maxHeight: '100%',
        alignSelf: 'center',
        textAlign: 'center',
    }
});

export default styles;