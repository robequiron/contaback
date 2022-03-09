import { Router,Request,Response } from "express";
import autentication from "../middlewares/autentication";
import subgrupoSchema  from "../schemas/subgrupos";
import { subgrupoModel } from "../models/subgrupos.model";
import dataSubgrupos from "../data/subgrupos";


/**
 * Router express
 */
const router = Router();

/**
 * Obtenemos todos los subgrupos
 */
router.get('/', autentication, async(req:Request, res:Response)=>{

        subgrupoSchema.find().exec( (err:any, datos:subgrupoModel[])=>{


            if (err) {
                return res.status(500).json({
                ok:false,
                error:  err,
                message: 'Error en el servidor al cargar los subgrupos contables'
                })
            }

            if(datos.length===0) {
                subgrupoSchema.insertMany(dataSubgrupos).then(
                    (resp:any)=>{
                        res.status(200).json({
                        ok:true,
                        data:resp
                        })
                    }
                ).catch(
                    (e)=>{
                        return res.status(500).json({
                        ok:false,
                        error:  err,
                        message: 'Error al crear las subgrupos contables'
                        })
                    }
                )
            } else {
                res.status(200).json({
                    ok:true,
                    data:datos
                })
            }

            

        })

})


export default router;