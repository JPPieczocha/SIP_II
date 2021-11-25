import { StyleSheet } from 'react-native';
import colors from '../common/colors';

const StyleProfile = StyleSheet.create({
    profile_title:{
        fontFamily: 'SimplyDiet',
        textTransform: "uppercase", 
        fontSize: 40, 
        paddingBottom: 16, 
        textDecorationLine: "underline"
    },
    
    patologias_title: {
        fontFamily: 'SimplyDiet',
        fontSize:22,
    },

    modal_filter:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'rgba(0,0,0, 0.6)',
    },

    modal_container:{
        width: '90%',
        padding: 15,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:'#f2f2f2',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: colors.secondaryv2
    },

    modal_title:{
        fontFamily: 'SimplyDiet',
        fontSize: 64,
        color: colors.secondaryv2,
        textAlign: 'center'
    },

    modal_description:{
        fontSize: 20,
        textAlign: 'center'
    },

    modal_button:{
        alignSelf: 'center',
        width: '75%',
        height: 38,
        borderRadius: 10,
        marginVertical: 10,
        padding: 8,
        backgroundColor: colors.secondaryv2
    },

    modal_button_text:{
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    profile_back_button: {
        position: 'absolute',
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        top: 30,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: colors.secondary,
        left: 10,
        zIndex:10
    },

    plan_delete_button: {
        position: 'absolute',
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        top: 30,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: colors.primaryv2,
        right: 10,
        zIndex:10
    },
});

export default StyleProfile