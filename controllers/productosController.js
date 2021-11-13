import {producto, productos, searchProductos} from '../apiroutes/ApiRoutes';

export const getAllProductos = async ()=>{
    const response = await productos();
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

export const buscarProductos = async (data)=>{
    const response = await searchProductos(data);
    if(response.status === 200){
        const json = await response.json();
        return json;
    }else{
        console.log('ERROR en buscarProductos');
        console.log('Codigo de respuesta en buscarProductos: ' + response.status);
        return response.status
    }
}



