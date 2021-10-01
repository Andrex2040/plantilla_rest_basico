const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async(rol='') => {
    const existeRol = await Role.findOne({ rol });

    if(!existeRol){
        throw new Error(`Èl rol ${ rol } no esta registrado en la base de datos`)
    }
}

const emailExiste = async(correo='') => {
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ){
        throw new Error(`El correo: ${ correo }, ya esta registrado`);
    }
}

const usuarioIdExiste = async( id ) => {
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ){
        throw new Error(`El Usuario: ${ id }, no existe`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    usuarioIdExiste
}