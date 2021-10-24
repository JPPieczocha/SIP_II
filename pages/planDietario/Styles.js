import { StyleSheet } from 'react-native';

const StylePlanDietario = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    card_template:{
        width: 220,
        height: 220,
        shadowColor: '#DB0758',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        elevation: 1,
        marginBottom:36
    },
    card_image: {
      width: 220,
      height: 220,
      borderRadius : 10
    },
    text_container:{
      position: "absolute",
      width: 220,
      height: 70,
      bottom:0,
      padding: 5,
      backgroundColor: "rgba(209,84,131, 0.8)",
      borderBottomLeftRadius : 10,
      borderBottomRightRadius: 10
    },
    card_title: {
       color: "white",
    },
    container_grey:{
        padding: 6,
        textAlign: "center",
        borderRadius: 8,
        marginLeft:8,
        backgroundColor:"#d1d1d1"
    },
    container_plan_detail:{
        width: "50%",
        paddingTop:10,
        paddingBottom:10,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
        borderColor:"#e2e2e2",
        borderRadius:14,
        margin:4
    }
});

export default StylePlanDietario