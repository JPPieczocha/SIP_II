import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container: {
        
    },

    header: {
        flexDirection: 'row',
        height: 128,
        marginTop: 25,
        marginLeft: 10
    },

    headerLogo: {
        width:  128,
        height: 128,
        position: 'absolute',
        right: 0,
    },

    titleContainer: {
        justifyContent: 'center',
    },

    headerTitle: {
        fontSize: 64,
        fontFamily: 'SimplyDiet',
        maxWidth: '70%'
    },

    headerSubtitle: {
        fontSize: 24,
        fontFamily: 'SimplyDiet'
    },

})

export default styles;