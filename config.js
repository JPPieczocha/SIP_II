const LOCAL_IP = "192.168.0.236"
const BACKEND_BASE_URL = `http://${LOCAL_IP}:8000`
let config = {
    backendURLs: {
        patologiasList: `${BACKEND_BASE_URL}/api/patologias/list`,
        patologiasUsuariosList: `${BACKEND_BASE_URL}/api/usuarios_patologias/list`,
        patologiasUsuariosCreate: `${BACKEND_BASE_URL}/api/usuarios_patologias/create`
    },
    currentUser: {
        id:1,
        email:"safe@diet.com",
        fullName:"Safe Diet",
    }
}

export default config;