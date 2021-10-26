import { StyleSheet } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'

import Color from '../common/colors'

const styles = StyleSheet.create({
    
    title: {
        fontSize: 32,
        textAlign: 'center'
    },

    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10
    },

    iconItem: {
        alignItems: 'center',
        justifyContent: 'center',
        
    },

    description: {
        fontSize: 18,
        textAlign: 'center',
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

    buttonSwap: {
        alignSelf: 'center',
        width: '75%',
        height: 32,
        borderRadius: 10,
        marginVertical: 10,
    },
    buttonSwapIngr: {
        backgroundColor: Color.secondary,
    },
    buttonSwapPasos: {
        backgroundColor: Color.primaryv2,
    },
    buttonSwapText: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    infoNutricional:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },

    listaPasos: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: Color.secondary,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 16
    },

    paso: {
        marginVertical: 6
    },

    pasoTitle: {
        color: 'white',
        fontWeight: 'bold'
    },

    pasoDescription: {
        color: 'white',
        fontSize: 16,

    }
        

})

export default styles