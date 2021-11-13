import { StyleSheet } from 'react-native';
import colors from '../../colors';

const styles = StyleSheet.create({

    container:{
        marginTop: 10,
        minHeight: 210
    },

    titleText: {
        fontSize: 40,
        paddingVertical: 5,
        marginLeft: 10,
        fontFamily: 'SimplyDiet'
    },

    emptyContainer: {
        maxWidth: '100%',
        height: 200,
        justifyContent: 'center'
    },

    emptyText: {
        textAlign: 'center',
        fontSize: 24,
        color: colors.secondaryv2
    }
});

export default styles;