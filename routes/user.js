const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExiste, usuarioIdExiste } = require('../helpers/db-validators');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( usuarioIdExiste ),
    check('rol').custom( esRolValido ),
    validarCampos
] , usuariosPut);

router.post('/',[
    check('nombre', 'el nombre es obloigatorio').not().isEmpty(),
    check('contrasena', 'la contraseña es obloigatorio y debe ser mayor a 6 letras').isLength( { min:6 } ),
    check('correo', 'el correo no es valido').isEmail(),
    //check('rol', 'no es un rol valido').isIn( ['ADMIN_ROLE','USER_ROLE'] ),
    check('correo').custom( emailExiste ),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPost);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( usuarioIdExiste ),
    validarCampos
]
, usuariosDelete);


module.exports = router;