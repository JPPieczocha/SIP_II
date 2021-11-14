import { history, addHistory, allFavourites, dummyCheckin, addFav, DelFav, EsFav, deleteHistory } from "../apiroutes/ApiRoutes";

/**
 * 
 * @param {JSON} data {id: number} 
 * @description Gets the user's search history
 * @returns 
 */
export const historial = async (data)=>{
    const response = await history(data);
    if(response.status === 200){
        const json = await response.json();
        return json;
    }else{
        console.log('ERROR en historial');
        console.log('Codigo de respuesta en historial: ' + response.status);
        return undefined //response.status
    }
}

/**
 * 
 * @param {JSON} data {id: number} 
 * @description Gets the user's search history
 * @returns 
 */
 export const Addhistorial = async (data)=>{
    const response = await addHistory(data);
    if(response.status === 200){
        const json = await response.json();
        return json;
    }else{
        console.log('ERROR en addHistorial');
        console.log('Codigo de respuesta en addHistorial: ' + response.status);
        return response.status
    }
}

/**
 * 
 * @param {JSON} data {id: number} 
 * @description Gets the user's search history
 * @returns 
 */
 export const Deletehistorial = async (data)=>{
    const response = await deleteHistory(data);
    if(response.status === 200){
        console.log("Historial del user " + data + " fue eliminado.");
    }else{
        console.log('ERROR @ Deletehistorial');
        console.log('Codigo de respuesta en Deletehistorial: ' + response.status);
    }
}

//-------------------------------------------------

/**
 * 
 * @param {JSON} data {id: number}
 * @description Gets the user's favorites
 * @returns 
 */
export const favoritos = async (data)=>{
    const response = await allFavourites(data);
    if(response.status === 200){
        try {
            const json = await response.json();
            return json;
        } catch (e) {
            // console.error(e)
        }
    }else{
        console.log('ERROR en favoritos');
        console.log('Codigo de respuesta en favoritos: ' + response.status);
        return response.status
    }
}

/**
 * 
 * @param {String} data idUser
 * @returns 
 */
export const Addfavorito = async (data)=>{
    const response = await addFav(data);
    if(response.status === 200){
        console.log("Se agregó a fav");
    }else{
        console.log('ERROR en Addfavorito');
        console.log('Codigo de respuesta en Addfavorito: ' + response.status);
    }
    return response.status
}

/**
 * 
 * @param {String} data idUser
 * @returns 
 */
 export const Delfavorito = async (data)=>{
    const response = await DelFav(data);
    if(response.status === 200){
        console.log("Se eliminó de Fav");
    }else{
        console.log('ERROR en Delfavorito');
        console.log('Codigo de respuesta en Delfavorito: ' + response.status);
    }
    return response.status
}

/**
 * 
 * @param {String} data idUser
 * @returns 
 */
 export const Esfavorito = async (data)=>{
    const response = await EsFav(data);
    if(response.status === 200){
        const json = await response.json();
        return json.length !== 0;
    }else{
        console.log('ERROR en Esfavorito');
        console.log('Codigo de respuesta en Esfavorito: ' + response.status);
        return response.status
    }
}



//-------------------------------------------------


/**
 * @description dummy get para que no se caiga la BD
 * @returns 
 */
export const dummyBD = async ()=>{
    const response = await dummyCheckin();
    if(response.status === 200){
        const json = await response.json();
        return json;
    }else{
        console.log('ERROR en dummyBD');
        console.log('Codigo de respuesta en dummyBD: ' + response.status);
        return response.status
    }
}

