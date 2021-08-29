import {Router, Request, Response} from 'express';
import autentication from '../middlewares/autentication';
import configSchema from '../schemas/config';
import typenif from 'schemas/typenif';
import  dataTypenif  from 'data/typenif';


/**
 * Router express
 */
const router = Router();

/**
 * Get config
 */
router.get('/',  async(req:Request, res:Response)=>{


    let id:string = req.params.id;

    await configSchema.findOne().exec(

        (err:any, config:any)=>{
            if(!config) {
                let c = new configSchema({name:'Nombre de empresa nueva', nif:"78487761P"});
                c.save((err:any, configSave:any)=>{
                    if(err) {
                        return res.status(500).json({
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
                return res.status(200).json({
                    ok:true,
                    config:config
                })
            }


            
        }
    )



})




export default router;