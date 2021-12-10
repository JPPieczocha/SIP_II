const url = 'http://a464-186-143-197-3.ngrok.io/';

//-----------Endpoints-----------------------------

//GET de datos de perfil segun ID.
export const profile = async (data) =>{
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    try {
        const response = await fetch(url+'perfil/id/'+data,options);
        return response
    } 
    catch (error) {
        console.error(error)
    }
}

//GET de todos los platos.
export const platos = async () =>{
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    try {
        const response = await fetch(url+'platos',options);
        return response
    } 
    catch (error) {
        console.error(error)
    }
}


//GET de un plato segun su id.
export const plato = async (data) =>{
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    try {
        const response = await fetch(url+'plato/id/'+data,options);
        return response
    } 
    catch (error) {
        console.error(error)
    }
}

export const ingredientes = async (data) =>{
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    try {
        const response = await fetch(url+'Ingredientes/id/'+data,options);
        return response
    } 
    catch (error) {
        console.error(error)
    }
}

//GET de todos los productos.
export const productos = async () =>{
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    try {
        const response = await fetch(url+'productos',options);
        return response
    } 
    catch (error) {
        console.error(error)
    }
}

export const producto = async (data) =>{
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    try {
        const response = await fetch(url+'producto/id/'+data,options);
        return response
    } 
    catch (error) {
        console.error(error)
    }
}


export const dummyCheckin = async()=>{
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    try {
        const response = await fetch(url+'Checking',options);
        return response
    } 
    catch (error) {
        console.error(error)
    }
}


export const searchPlatos = async(data)=>{
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    try {
        const response = await fetch(url+'SearchPlatos/name/'+data.name+'/c/'+data.c+'/d/'+data.d+'/o/'+data.o,options);
        return response
    } 
    catch (error) {
        console.error(error)
    }
}

export const searchProductos = async(data)=>{
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    try {
        const response = await fetch(url+'SearchProductos/name/'+data.name+'/c/'+data.c+'/d/'+data.d+'/o/'+data.o,options);
        return response
    } 
    catch (error) {
        console.error(error)
    }
}

//-----------------------------------------

//GET de favoritos, ya sea receta o producto.
export const allFavourites = async (data) =>{
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    try {
        const response = await fetch(url+'favorito/id/'+data,options);
        return response
    } 
    catch (error) {
        console.error(error)
    }
}

export const addFav = async(data)=>{
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    try {
        const response = await fetch(url+'AddFav/id/'+data.Usuario+'/producto/'+data.idProducto+'/plato/'+data.idPlato,options);
        return response
    } 
    catch (error) {
        console.error(error)
    }
}

export const DelFav = async(data)=>{
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    try {
        const response = await fetch(url+'DeleteFav/id/'+data.Usuario+'/producto/'+data.idProducto+'/plato/'+data.idPlato,options);
        return response
    } 
    catch (error) {
        console.error(error)
    }
}

export const EsFav = async(data)=>{
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    try {
        const response = await fetch(url+'EsFav/id/'+data.Usuario+'/producto/'+data.idProducto+'/plato/'+data.idPlato,options);
        return response
    } 
    catch (error) {
        console.error(error)
    }
}

//----------------------------------------------------

//GET de historial, ya sea receta o producto.
export const history = async (data) =>{
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    try {
        const response = await fetch(url+'historial/id/'+data,options);
        return response
    } 
    catch (error) {
        console.error(error)
    }
}

export const addHistory = async(data)=>{
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    try {
        const response = await fetch(url+'AddHistorial/id/'+data.Usuario+'/producto/'+data.idProducto+'/plato/'+data.idPlato,options);
        return response
    } 
    catch (error) {
        console.error(error)
    }
}

export const deleteHistory = async (data) => {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    try {
        const response = await fetch(url+'DeleteHis/id/'+data,options);
        return response
    } 
    catch (error) {
        console.error(error)
    }
}