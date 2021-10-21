const LOCAL_IP = "192.168.1.105"
const BACKEND_BASE_URL = `http://${LOCAL_IP}:8000`
const BACKEND_PLAN_BASE_URL = `http://${LOCAL_IP}:3050`
let config = {
    backendURLs: {
        patologiasList: `${BACKEND_BASE_URL}/api/patologias/list`,
        patologiasUsuariosList: `${BACKEND_BASE_URL}/api/usuarios_patologias/list`,
        patologiasUsuariosCreate: `${BACKEND_BASE_URL}/api/usuarios_patologias/create`,
        patologiasUsuariosDelete: `${BACKEND_BASE_URL}/api/usuarios_patologias/deleteByIdUsuario_IdPatologia`,
        planDietario: `${BACKEND_PLAN_BASE_URL}/plan`
    },
    currentUser: {
        id:1,
        email:"safe@diet.com",
        fullName:"Safe Diet",
    }
}

export default config;