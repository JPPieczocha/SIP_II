const NGROK_IP_USUARIOS = "http://1954-190-16-187-146.ngrok.io"
const NGROK_IP_PLAN_DIETARIO = "http://5133-190-16-187-146.ngrok.io"
let config = {
    backendURLs: {
        getUser:`${NGROK_IP_USUARIOS}/api/usuarios/findOne`,
        patologiasList: `${NGROK_IP_USUARIOS}/api/patologias/list`,
        patologiasUsuariosCreate: `${NGROK_IP_USUARIOS}/api/usuarios_patologias/create`,
        patologiasUsuariosDelete: `${NGROK_IP_USUARIOS}/api/usuarios_patologias/deleteByIdUsuario_IdPatologia`,
        patologiasUsuariosGet: `${NGROK_IP_USUARIOS}/api/usuarios_patologias/findPatologiasByIdUsuario`,
        planDietario: `${NGROK_IP_PLAN_DIETARIO}/generate_plan_diario`,
        planDietarioSemanal: `${NGROK_IP_PLAN_DIETARIO}/generate_plan_semanal`,
        planDietarioSemanalGet: `${NGROK_IP_PLAN_DIETARIO}/plan_semanal`,
        planDietarioSemanalSave: `${NGROK_IP_PLAN_DIETARIO}/plan_semanal`,
        planesDietariosFavoritos: `${NGROK_IP_PLAN_DIETARIO}/mis_planes`
    },
    loggedUser:{
        id:1
    }
}

export default config;