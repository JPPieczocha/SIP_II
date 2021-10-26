import {producto, productos} from '../apiroutes/ApiRoutes';

export const getAllProductos = async ()=>{
    const response = await productos();
    if(response.status === 200){
        const json = await response.json();
        return json;
    }else{
        console.log('ERROR en getAllProductos');
        console.log('Codigo de respuesta en getAllProductos: ' + response.status);
        return response.status
    }
}

export const getProducto = async (data)=>{
    const response = await producto(data);
    if(response.status === 200){
        const json = await response.json();
        return json;
    }else{
        console.log('ERROR en getProducto');
        console.log('Codigo de respuesta en getProducto: ' + response.status);
        return response.status
    }
}


