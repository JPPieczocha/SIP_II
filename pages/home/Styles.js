import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container: {
        marginLeft: 10,
        paddingBottom: 5
    },

    header: {
        flexDirection: 'row',
        height: 128,
        marginTop: 10
    },

    headerLogo: {
        width:  128,
        height: 128,
        position: 'absolute',
        right: 0,
    },

    titleContainer: {
        justifyContent: 'center'
    },

    headerTitle: {
        fontSize: 32
    },

    headerSubtitle: {
        fontSize: 18
    },

})

export default styles;