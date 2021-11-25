const NGROK_IP_USUARIOS = "http://5a45-190-18-163-118.ngrok.io"
const NGROK_IP_PLAN_DIETARIO = "http://fd47-190-18-163-118.ngrok.io"
let config = {
    backendURLs: {
        login:`${NGROK_IP_USUARIOS}/api/usuarios/signin`,
        getUser:`${NGROK_IP_USUARIOS}/api/usuarios/findOne`,
        registerUser:`${NGROK_IP_USUARIOS}/api/usuarios/create`,
        patologiasList: `${NGROK_IP_USUARIOS}/api/patologias/list`,
        patologiasUsuariosCreate: `${NGROK_IP_USUARIOS}/api/usuarios_patologias/create`,
        patologiasUsuariosDelete: `${NGROK_IP_USUARIOS}/api/usuarios_patologias/deleteByIdUsuario_IdPatologia`,
        patologiasUsuariosGet: `${NGROK_IP_USUARIOS}/api/usuarios_patologias/findPatologiasByIdUsuario`,
        planDietario: `${NGROK_IP_PLAN_DIETARIO}/generate_plan_diario`,
        planDietarioSemanal: `${NGROK_IP_PLAN_DIETARIO}/generate_plan_semanal`,
        planDietarioSemanalGet: `${NGROK_IP_PLAN_DIETARIO}/plan_semanal`,
        planDietarioSemanalSave: `${NGROK_IP_PLAN_DIETARIO}/plan_semanal`,
        planesDietariosFavoritos: `${NGROK_IP_PLAN_DIETARIO}/mis_planes`,
        planesDietariosDelete: `${NGROK_IP_PLAN_DIETARIO}/plan_semanal`
    },
    loggedUser:{
        id:1
    }
}

export default config;