import { StyleSheet } from 'react-native';
import colors from '../../colors';

const styles = StyleSheet.create({

    container:{
        marginTop: 10,
        minHeight: 210,
    },

    titleText: {
        fontSize: 40,
        paddingVertical: 5,
        marginLeft: 10,
        fontFamily: 'SimplyDiet'
    },

    button: {
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        width: 50,
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: colors.secondary
    },

    emptyContainer: {
        height: 210,
        justifyContent: 'space-around',
        alignContent: 'center'
    },

    emptyText: {
        textAlign: 'center',
        fontSize: 18,
        color: colors.secondaryv2
    },

    activityIndicator: {
        height: 210,
        justifyContent: 'center'
    }
});

export default styles;