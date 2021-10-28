import { StyleSheet } from 'react-native';
import colors from '../common/colors';

const StylePlanDietario = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    plan_dietario_title:{
        fontFamily: 'SimplyDiet',
        textTransform: "uppercase", 
        fontSize: 40, 
        paddingBottom: 16, 
        textDecorationLine: "underline"
    },
    card_template:{
        width: 260,
        height: 260,
        shadowColor: '#DB0758',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        elevation: 1,
        marginBottom:36
    },
    card_image: {
        width: 260,
        height: 260,
        borderRadius : 10
    },
    text_container:{
        position: "absolute",
        width: 260,
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
    container_patologias:{
        fontFamily: 'SimplyDiet',
        padding: 6,
        textAlign: "center",
        borderRadius: 8,
        marginLeft:8,
        backgroundColor:"#d1d1d1",
        width: 80,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row"
    },
    patologias_text: {
        fontFamily: 'SimplyDiet',
        fontSize:16,
        width: "80%",
        textAlign: "center",
    },
    totals_details:{
        fontFamily: 'SimplyDiet',
        fontSize: 18
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
    },
    plan_item_type:{
        fontFamily: 'SimplyDiet',
        paddingBottom:4, 
        color:"#fafafa",
        fontSize:20
    },
    plan_item_description:{
        fontFamily: 'SimplyDiet',
        color:"#fff",
        fontSize:12,
        width: "80%"
    },
    plan_item_details_quantites:{
        fontFamily: 'SimplyDiet',
        color:"#fff",
        position:"absolute",
        fontSize:11,
        right:6, 
        bottom: 18,
    },
    plan_item_details_kcal:{
        fontFamily: 'SimplyDiet',
        color:"#fff",
        position:"absolute",
        right:6, 
        bottom: 4, 
        fontSize:11
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
    }
});

export default StylePlanDietario