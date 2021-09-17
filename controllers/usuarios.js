const { response } = require('express');

const usuariosGet =  (req, res) => {

    const { nombre, edad } = req.query;
    res.json({
        msg: "get api",
        nombre,
        edad
    });
}

const usuariosPost =  (req, res) => {
    
    /*const body = req.body;

    res.status(201).json({
        id: 1,
        nombre: body.nombre,
        edad: body.edad,
        metodo: 'post'
    })*/

    // Modo de desestructurado
    const { nombre, edad } = req.body;

    res.status(201).json({
        id: 1,
        nombre,
        edad,
        metodo: 'post'
    })
}

const usuariosPut =  (req, res) => {

    const id = req.params.id;

    res.json({
        id: id,
        nombre: 'Andres',
        apellido: 'Rivera',
        metodo: 'put'
    })
}

const usuariosDelete =  (req, res) => {
    res.json({
        id: 1,
        nombre: 'Andres',
        apellido: 'Rivera',
        metodo: 'delete'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}