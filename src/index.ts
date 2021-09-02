import app from './app';
import dbConnecction from './database';
import cors from 'cors';
import bodyParser  from 'body-parser';
import appRouter from './router/app';


import config from './router/config';
import login  from './router/login';
import users from './router/users';
import typenif from './router/typenif';
import taxes from './router/taxes';


const mongoose = require('mongoose');



/**
 * Main aplication
 */
function main(){

    /**
     * Uso de cors
     */
    app.use(cors());

    /**
     * Connección base de datos
     */
    dbConnecction();

    /**
     * Use body parser
     */
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());
    /**
     * Use routes
     */
    app.use('/config', config);
    app.use('/taxes', taxes);
    app.use('/typenif', typenif);
    app.use('/users', users);
    app.use('/login', login);
    app.use('/',appRouter);
    

    /**
    * Iniciamos el servidor en el puerto 3000
     */
    app.listen(3000, ()=>{
        console.log(`Puerto ${3000} en funcionamiento`);
    })

}


main();



