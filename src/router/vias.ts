import dataVias from '../data/vias';
import {Router, Request, Response} from 'express';
import autentication from "../middlewares/autentication";
import { ViasModel } from '../models/vias.model';
import vias from '../schemas/vias';



const router = Router();

/**
 * Obtenemos todas las vias
 */
router.get('/all', autentication, async(req:Request, res:Response)=>{

    
    await vias.find().exec(
        (err:any, viasdb:ViasModel[])=>{

            if(err) {
                return res.status(500).json({
                ok:false,
                error:  err,
                message: 'Error al carga las vias'
                })
            }

            //Si no existen las vias creamos
            if (viasdb.length===0) {
                vias.insertMany(dataVias).then(
                    (resp)=>{
                        res.status(200).json({
                        ok:true,
                        vias: resp
                        })
                    }
                ).catch(
                    (e)=>{
                        res.status(500).json({
                        ok:false,
                        error:  e,
                        message: 'Error al crear las vias'
                        })
                    }
                )
            } else {
                res.status(200).json({
                ok:true,
                vias:viasdb
                })
            }
        }

       
    )



})



export default router;