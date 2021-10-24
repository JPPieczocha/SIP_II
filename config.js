const LOCAL_IP = "192.168.0.236"
const BACKEND_BASE_URL = `http://${LOCAL_IP}:8000`
const BACKEND_PLAN_BASE_URL = `http://${LOCAL_IP}:3050`
let config = {
    backendURLs: {
        getUser:`${BACKEND_BASE_URL}/api/usuarios/findOne`,
        patologiasList: `${BACKEND_BASE_URL}/api/patologias/list`,
        patologiasUsuariosCreate: `${BACKEND_BASE_URL}/api/usuarios_patologias/create`,
        patologiasUsuariosDelete: `${BACKEND_BASE_URL}/api/usuarios_patologias/deleteByIdUsuario_IdPatologia`,
        patologiasUsuariosGet: `${BACKEND_BASE_URL}/api/usuarios_patologias/findPatologiasByIdUsuario`,
        planDietario: `${BACKEND_PLAN_BASE_URL}/plan`
    },
    loggedUser:{
        id:1
    }
}

export default config;