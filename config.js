const NGROK_IP_USUARIOS = "http://df25-190-16-187-146.ngrok.io"
const NGROK_IP_PLAN_DIETARIO = "http://47b5-190-16-187-146.ngrok.io"
let config = {
    backendURLs: {
        getUser:`${NGROK_IP_USUARIOS}/api/usuarios/findOne`,
        patologiasList: `${NGROK_IP_USUARIOS}/api/patologias/list`,
        patologiasUsuariosCreate: `${NGROK_IP_USUARIOS}/api/usuarios_patologias/create`,
        patologiasUsuariosDelete: `${NGROK_IP_USUARIOS}/api/usuarios_patologias/deleteByIdUsuario_IdPatologia`,
        patologiasUsuariosGet: `${NGROK_IP_USUARIOS}/api/usuarios_patologias/findPatologiasByIdUsuario`,
        planDietario: `${NGROK_IP_PLAN_DIETARIO}/generate_plan_diario`,
        planDietarioSemanal: `${NGROK_IP_PLAN_DIETARIO}/generate_plan_semanal`
    },
    loggedUser:{
        id:1
    }
}

export default config;