import { StyleSheet } from 'react-native';

import Color from '../../colors'

const styles = StyleSheet.create({
    container: {
        height: 50,
        width:  '95%',
        borderRadius: 15,
        backgroundColor: Color.secondary,
        marginHorizontal: 10,
        marginBottom: 16,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        paddingLeft: 5
    },

    tagText: {
        color: 'white',
        fontSize: 24,
        alignSelf: 'center',
        maxWidth: '70%',
    }
});

export default styles;