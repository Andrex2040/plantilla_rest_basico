const express = require('express')
const cors = require('cors');
const router = require('../routes/user');

class Server{

    constructor(){  
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Middlewares
        this.middlewares();


        this.routes();
    }

    middlewares(){
        // Cors
        this.app.use(cors())

        // Lectura y parceo del boby
        this.app.use( express.json() );

        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usuariosPath , require('../routes/user'));
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto: ', this.port);
        });
    }

}

module.exports = Server;