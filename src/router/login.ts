import {Router, Request, Response} from 'express';
import user from '../schemas/users'
import { UserModel } from 'models/users.model';
import { Error } from 'mongoose';
import  bcryptjs  from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SEED:string = require('../config/config').SEED;


//Router express
const router = Router();

/**
 * Comprobar usuario y contraseña
 * @return Status response - Json
 * 
 */
router.post('/', (req:Request, res:Response)=>{

    var body:any = req.body;

    user.findOne({email:body.email}, (err:Error,userDB:UserModel)=>{
        
        //Si existe un error
        if (err) {
            return res.status(500).json({
                ok:false,
                message: err.message
            })
        }

        //Si el email no existe en la base de datos
        if (!userDB) {
             return res.status(400).json({
               ok:false,
               error: {
               message: 'Credenciales incorrectas',
               error: err
               }
            })
        }

        if(!bcryptjs.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok:false,
                error: {
                 //TODO:Quitar más adelante -email, es para produccion
                message: 'Credenciales incorrectas',
                error: err
                }
             })
        }

        //Crear un token!!!
        userDB.password = ':)';
        var token = jwt.sign({usuario:userDB},SEED,{expiresIn:14400})//4 Hours

        
        res.status(200).json({
            ok:true,
            usuario: userDB,
            token: token,
            id: userDB._id
            
        })

    })


})

/**
 * Comprobar token
 * @return Status response
 */
router.get('/', (req:Request, res:Response)=>{

  let token:string = req.query.token as string;

  jwt.verify(token,SEED,(err)=>{

    if(err) {
        return res.status(401).json({
           ok:false,
           token: token,
           error: {
           message: 'Token incorrecto',
           error: err,
           token: token
           }
        })
    }
    
    res.status(200).json({
        ok:true,
        menssage: 'Token correcto',
    })

  })
  

})

export default router;