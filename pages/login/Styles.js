import {StyleSheet} from 'react-native'
import colors from './../common/colors'

const styles = StyleSheet.create({
    landing_container:{
        display:"flex",
        alignItems:"center",
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
        height:80
    },

    logo:{
        width: 50,
        height: 50
    }
})

export default styles