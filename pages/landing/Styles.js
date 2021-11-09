import {StyleSheet} from 'react-native'
import colors from './../common/colors'

const styles = StyleSheet.create({
    landing_container:{
        justifyContent: 'center',
        height: "100%"
    },
    landing_text:{
        fontFamily: "SimplyDiet",
    },

    app_welcome:{
        textAlign: "center",
        color: colors.secondary,
        fontSize:32
    },

    landing_logo_container:{
        display:"flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },

    landing_logo:{
        width: 200,
        height: 200
    },

    buttons_container:{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 38
    }
})

export default styles