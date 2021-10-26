const url = '';

//-----------Endpoints-----------------------------

//GET de favoritos, ya sea receta o producto.
export const allFavourites = async (data) =>{
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    try {
        const response = await fetch(url+'favorito',options);
        return response
    } 
    catch (error) {
        console.error(error)
    }
}

//GET de historial, ya sea receta o producto.
export const history = async (data) =>{
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    try {
        const response = await fetch(url+'historial',options);
        return response
    } 
    catch (error) {
        console.error(error)
    }
}

//GET de datos de perfil segun ID.
export const profile = async (data) =>{
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    try {
        const response = await fetch(url+'perfil',options);
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
        body: JSON.stringify(data)
    }
    try {
        const response = await fetch(url+'plato',options);
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
        body: JSON.stringify(data)
    }
    try {
        const response = await fetch(url+'producto',options);
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
        body: JSON.stringify(data)
    }
    try {
        const response = await fetch(url+'Checking',options);
        return response
    } 
    catch (error) {
        console.error(error)
    }
}