import {ingredientes, plato, platos, searchPlatos} from '../apiroutes/ApiRoutes';

export const getAllPlatos = async ()=>{
    const response = await platos();
    if(response.status === 200){
        try {
            const json = await response.json();
            return json;
        } catch (e) {
            // console.error(e)
        }
    }else{
        console.log('ERROR en getAllProductos');
        console.log('Codigo de respuesta en getAllProductos: ' + response.status);
        return []
    }
}

export const getPLato = async (data)=>{
    const response = await plato(data);
    console.log(response);
    if(response.status === 200){
        const json = await response.json();
        return json[0];
    }else{
        console.log('ERROR en getPlato');
        console.log('Codigo de respuesta en getPlato: ' + response.status);
        return response.status
    }
}

export const getIngredientes = async (data)=>{
    const response = await ingredientes(data);
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
        console.log('ERROR en buscarPlatos');
        console.log('Codigo de respuesta en buscarPlatos: ' + response.status);
        return response.status
    }
}