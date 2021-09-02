import { Router, Request, Response } from "express";
import autentication from '../middlewares/autentication';
import typeNifSchema from "../schemas/typenif";
import dataTypenif from "../data/typenif";


/**
 * Router express
 */
const router = Router();





/**
 * Get all typeNIf
 */
router.get('/', autentication, async(req:Request,res:Response)=>{


    await typeNifSchema.find().exec(
        (err:any, data:any)=>{
            let typenif:any;
            if (err) {
                return res.status(500).json({
                ok:false,
                error:  err,
                message: 'Error en el servidor al cargar los tipos de nif'
                })
            }
            //Si no existe tipo de nif crear 
            if (data.length===0) {
                
                typeNifSchema.insertMany(dataTypenif).then(
                    (resp)=>{
                        res.status(200).json({
                            ok:true,
                            typeNif: resp
                        })
                    }
                ).catch(
                    (e)=>{
                        res.status(500).json({
                        ok:false,
                        error:  e,
                        message: 'Error al crear los tipos de Nif iniciales'
                        })
                    }
                )
                
            } else {
               
                res.status(200).json({
                    ok:true,
                    typeNif: data
                })
            }

            

            
        }

       
    )

})


export default router;