import { Router, Request, Response } from "express";
import autentication from '../middlewares/autentication';
import grupoSchema from '../schemas/grupos';
import { GrupoModel } from "../models/grupo.model";
import dataGrupos from "../data/grupos";


/**
 * Router express
*/
const router = Router();

/**
 * Get all Grupos
 */
router.get('/',autentication, async(req:Request, res:Response)=>{

    await grupoSchema.find().exec( (err:any, data:GrupoModel[])=>{

        if (err) {
            return res.status(500).json({
            ok:false,
            error:  err,
            message: 'Error en el servidor al cargar los grupos contables'
            })
        }
        
        if(data.length===0) {
            grupoSchema.insertMany(dataGrupos).then(
                (resp:any)=>{
                    res.status(200).json({
                    ok:true,
                    data:resp
                    })
                    
                }
            ).catch((e)=>{
                return res.status(500).json({
                ok:false,
                error: e,
                message: 'Error al crear los grupos contables'
                })
            })
        } else {
            res.status(200).json({
                ok:true,
                data: data
            })
        }

       
    })




})


export default router;