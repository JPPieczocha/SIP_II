const NGROK_IP_USUARIOS = "http://2711-190-17-54-54.ngrok.io"
const NGROK_IP_PLAN_DIETARIO = "https://1200-190-17-54-54.ngrok.io"
let config = {
    backendURLs: {
        getUser:`${NGROK_IP_USUARIOS}/api/usuarios/findOne`,
        patologiasList: `${NGROK_IP_USUARIOS}/api/patologias/list`,
        patologiasUsuariosCreate: `${NGROK_IP_USUARIOS}/api/usuarios_patologias/create`,
        patologiasUsuariosDelete: `${NGROK_IP_USUARIOS}/api/usuarios_patologias/deleteByIdUsuario_IdPatologia`,
        patologiasUsuariosGet: `${NGROK_IP_USUARIOS}/api/usuarios_patologias/findPatologiasByIdUsuario`,
        planDietario: `${NGROK_IP_PLAN_DIETARIO}/generate_plan_diario`
    },
    loggedUser:{
        id:1
    }
}

export default config;