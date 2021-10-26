import { StyleSheet } from 'react-native';
import colors from '../../colors';

const styles = StyleSheet.create({
    modalFilter:{
        flex: 1,

        justifyContent:'center',
        alignItems:'center',

        backgroundColor: 'rgba(0,0,0, 0.6)',
    },
    modalContainer:{

        width: '90%',

        padding: 15,
        
        alignItems: 'center',
        justifyContent:'center',
        
        backgroundColor:'#f2f2f2',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: colors.secondaryv2
    },

    title: {
        fontFamily: 'SimplyDiet',
        fontSize: 64,
        color: colors.secondaryv2,
        textAlign: 'center'
    },

    description: {
        fontSize: 20,
        textAlign: 'center'
    },

    button: {
        alignSelf: 'center',
        width: '75%',
        height: 32,
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: colors.secondaryv2
    },
    buttonText: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
    }
})

export default styles