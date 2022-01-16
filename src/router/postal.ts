import {Router, Request, Response} from 'express';
import autentication from "../middlewares/autentication";
import { PostalModel } from '../models/postal.model';
import postal from '../schemas/postal';

const router = Router();

/**
 * Obtenemos todos los codigos postales
 */
router.get('/all', autentication, async(req:Request, res:Response)=>{

    await postal.find().limit(10).exec(
        (err:any, postaldb:PostalModel[])=>{

            if(err) {
                return res.status(500).json({
                ok:false,
                error:  err,
                message: 'Error al carga los códigos postales'
                })
            }

            if (postaldb.length===0) {
                return res.status(500).json({
                ok:false,
                error:  err,
                message: 'Error, no existen código postales, es necesario su carga manual en la base de datos'
                })
            }

            res.status(200).json({
                ok:true,
                postal:postaldb
            })

            
        }

       
    )



})
/**
 * Obtenemos los registro según el código postal
 */
router.get('/code/:code', autentication,  async(req:Request, res:Response) => {
  
    let code:number= parseInt(req.params.code);


    if(!code) {
        return res.status(500).json({
        ok:false,
        error:  'Error params code',
        message: 'Error no existe código para buscar'
        })
    }



    await postal.find({code: code}).exec(
        (err:any , postalModel:PostalModel[])=>{
            if (err) {
                return res.status(500).json({
                ok:false,
                error:  err,
                message: 'Error '
                })
            }

            return res.status(200).json({
            ok:true,
            data:postalModel
            })
     });
    


})

export default router;