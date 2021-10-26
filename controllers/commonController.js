import { history, allFavourites, dummyCheckin } from "../apiroutes/ApiRoutes";

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
        console.log('ERROR en getProducto');
        console.log('Codigo de respuesta en getProducto: ' + response.status);
        return response.status
    }
}

/**
 * 
 * @param {JSON} data {id: number}
 * @description Gets the user's favorites
 * @returns 
 */
export const favoritos = async (data)=>{
    const response = await allFavourites(data);
    if(response.status === 200){
        const json = await response.json();
        return json;
    }else{
        console.log('ERROR en getProducto');
        console.log('Codigo de respuesta en getProducto: ' + response.status);
        return response.status
    }
}

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

