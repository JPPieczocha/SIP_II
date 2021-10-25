import { StyleSheet } from 'react-native'

import Color from '../common/colors'

const styles = StyleSheet.create({
    
    title: {
        fontSize: 32,
        textAlign: 'center'
    },

    description: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 32
    },

    button: {
        position: 'absolute',
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        top: 50,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: Color.secondary
    },

    backButton: {
        left: 20
    },
    favButton: {
        right: 20
    },

    infoNutricional:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
        

})

export default styles