const NGROK_IP_USUARIOS = "http://6a3c-190-17-55-164.ngrok.io"
const NGROK_IP_PLAN_DIETARIO = "http://d768-190-17-55-164.ngrok.io"
let config = {
    backendURLs: {
        getUser:`${NGROK_IP_USUARIOS}/api/usuarios/findOne`,
        patologiasList: `${NGROK_IP_USUARIOS}/api/patologias/list`,
        patologiasUsuariosCreate: `${NGROK_IP_USUARIOS}/api/usuarios_patologias/create`,
        patologiasUsuariosDelete: `${NGROK_IP_USUARIOS}/api/usuarios_patologias/deleteByIdUsuario_IdPatologia`,
        patologiasUsuariosGet: `${NGROK_IP_USUARIOS}/api/usuarios_patologias/findPatologiasByIdUsuario`,
        planDietario: `${NGROK_IP_PLAN_DIETARIO}/plan`
    },
    loggedUser:{
        id:1
    }
}

export default config;