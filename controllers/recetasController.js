import {plato, platos, searchPlatos} from '../apiroutes/ApiRoutes';

export const getAllPlatos = async ()=>{
    const response = await platos();
    if(response.status === 200){
        const json = await response.json();
        return json;
    }else{
        console.log('ERROR en getAllProductos');
        console.log('Codigo de respuesta en getAllProductos: ' + response.status);
        return response.status
    }
}

export const getPLato = async (data)=>{
    const response = await plato(data);
    if(response.status === 200){
        const json = await response.json();
        return json;
    }else{
        console.log('ERROR en getProducto');
        console.log('Codigo de respuesta en getProducto: ' + response.status);
        return response.status
    }
}

export const buscarPlatos = async (data)=>{
    const response = await searchPlatos(data);
    if(response.status === 200){
        const json = await response.json();
        return json;
    }else{
        console.log('ERROR en buscarProductos');
        console.log('Codigo de respuesta en buscarProductos: ' + response.status);
        return response.status
    }
}