import {StyleSheet} from 'react-native'
import colors from './../common/colors'

const styles = StyleSheet.create({
    landing_container:{
        display:"flex",
        alignItems:"center",
        width:"100%",
        justifyContent: 'center',
        height: "100%"
    },

    login_title_container:{
        display:"flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    title_text:{
        fontFamily: "SimplyDiet",
    },

    login_session_text:{
        fontFamily: "SimplyDiet",
        textAlign: "center",
        color: colors.secondary,
        fontSize:48
    },

    buttons_container:{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 38
    },

    logo_container:{
        display:"flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: 110,
    },

    logo:{
        width: 50,
        height: 50
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
})

export default styles