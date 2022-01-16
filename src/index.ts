import app from './app';
import dbConnecction from './database';
import cors from 'cors';
import bodyParser  from 'body-parser';
import appRouter from './router/app';

import adress from './router/adress';
import config from './router/config';
import cuenta from './router/cuentas';
import workplace from './router/workplaces';
import login  from './router/login';
import users from './router/users';
import postal from './router/postal'
import typenif from './router/typenif';
import taxes from './router/taxes';
import vias from './router/vias';

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
    app.use('/adress', adress);
    app.use('/config', config);
    app.use('/cuentas', cuenta);
    app.use('/workplace', workplace);
    app.use('/login', login);
    app.use('/postal',postal);
    app.use('/vias', vias);
    app.use('/taxes', taxes);
    app.use('/typenif', typenif);
    app.use('/users', users);
    app.use('/',appRouter);
    

    /**
    * Iniciamos el servidor en el puerto 3000
     */
    app.listen(3000, ()=>{
        console.log(`Puerto ${3000} en funcionamiento`);
    })

}


main();



