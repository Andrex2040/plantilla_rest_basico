const { response, request } = require("express");
const encripta = require("bcryptjs");
const Usuario = require("../models/usuario");

const usuariosGet = async(req, res) => {
  // const { nombre, edad } = req.query;
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  // Manera de llamar dos await lo cual puede llevar mucho tiempo
  // const usuarios = await Usuario.find( query )
  //                 .skip( Number(desde) )
  //                 .limit( Number(limite) );

  // const total = await Usuario.countDocuments( query );

  // Manera de disparar varios await en simultaneo
  const [ total, usuarios ] = await Promise.all([
    Usuario.countDocuments( query ),
    Usuario.find( query )
      .skip( Number(desde) )
      .limit( Number(limite) )
  ])

  res.json({
    total,
    usuarios
  });
};

const usuariosPost = async (req = request, res = response) => {
  /*const body = req.body;

    res.status(201).json({
        id: 1,
        nombre: body.nombre,
        edad: body.edad,
        metodo: 'post'
    })*/

  // Modo de desestructurado
  const { nombre, correo, contrasena, rol } = req.body;
  //const body= req.body;
  const usuario = new Usuario({ nombre, correo, contrasena, rol });

  // Encriptar la contraseña
  const salt = encripta.genSaltSync();
  usuario.contrasena = encripta.hashSync(contrasena, salt);

  await usuario.save();

  res.json({
    usuario,
    metodo: "post",
  });
};

const usuariosPut = async (req, res = response) => {
  const id = req.params.id;
  const { _id, contrasena, google, correo, ...resto } = req.body;

  // Validar contra base de datos
  if (contrasena) {
    //Encriptar la contraseña
    const salt = encripta.genSaltSync();
    resto.contrasena = encripta.hashSync(contrasena, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    usuario,
    metodo: "put",
  });
};

const usuariosDelete = async(req, res = response) => {

  const { id } = req.params;

  // Borrar 
  // const usuario = await Usuario.findByIdAndDelete( id );
  const usuario = await Usuario.findByIdAndUpdate( id, { estado:false } )

  res.json({
    usuario
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
