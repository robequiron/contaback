import {Router, Request, Response} from 'express';
import autentication from '../middlewares/autentication';

import configSchema from '../schemas/config';
import newEmpresa from '../data/empresa';
import { ConfigModel } from '../models/config.model';
import { Mongoose } from 'mongoose';


/**
 * Router express
 */
 const  router = Router();

/**
 * Get config
 */
router.get('/',  autentication,   async(req:Request, res:Response)=>{


    let id:string = req.params.id;

  
    await configSchema.findOne().exec(

        (err:any, config:any)=>{
            if(!config) {
                let c = new configSchema(newEmpresa);
                c.save((err:any, configSave:any)=>{
                    if(err) {
                        res.status(500).json({
                        ok:false,
                        error:  err,
                        message: 'Error al crear el registro de configuración'
                        })
                    }
                    res.status(200).json({
                        ok:true,
                        config:configSave
                    })
                });
            } else {
                res.status(200).json({
                    ok:true,
                    config:config
                })
            }


            
        }
    )



})


/**
 * Update config
 */
router.put('/:id', autentication, async(req:Request, res:Response)=>{

    let id = req.params.id;
   
    if (!id) {
        return res.status(500).json({
        ok:false,
        message: 'Error no viene identificador'
        })
    }


    let body = req.body as ConfigModel;

    let config:ConfigModel = new ConfigModel();
    config.codeNif = body.codeNif;
    config.name = body.name;
    config.nif = body.nif;
    config.workplace = body.workplace;
    config.workplaceCuenta = body.workplaceCuenta;


    configSchema.findByIdAndUpdate(id, config, (err:any, doc:any)=>{
        
        
        if(err) {
            return res.status(500).json({
            ok:false,
            error:  err,
            message: 'Error al modificar la configuración'
            })
        }

        res.status(200).json({
        ok:true,
        menssage:"Modificado correctamente"
        })
        
    })

})


export default router;