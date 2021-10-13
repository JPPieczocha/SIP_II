import { StyleSheet } from 'react-native';
const primaryColor = "#54D1A2";
const secondaryColor = "#D15483";

const styles = StyleSheet.create({
    centeredContent:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer:{
    },
    formHeader:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 110,
    },
    formGroup:{
        padding: 12
    },
    formInput:{
        width: "100%",
        height: 40,
        borderRadius: 8,
        borderColor: 'gray', 
        borderWidth: 1,
        padding: 8
    },
    checkBoxContainer:{
        display: "flex",
        flexDirection:"row"
    },
    checkBox:{
        alignSelf: "center"
    },
    checkboxLabel:{
        margin: 8
    },
    primaryButton:{
        display: "flex",
        backgroundColor: primaryColor,
        width: 220,
        padding: 12,
        borderRadius: 12
    },
    primaryButtonText:{
        color:"#fff",
        textAlign: "center",
        textTransform: "uppercase"
    },
    logoIcon:{
        width: 50,
        height: 50
    },
    tabBar:{
        backgroundColor: primaryColor
    },
    tabBarProfileIcon:{
        width: 30,
        height: 30
    },
    text:{
        fontFamily:""
    },
});

export default styles;