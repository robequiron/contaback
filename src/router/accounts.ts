import {Router,Request,Response} from 'express';
import { AccountModel } from '../models/account.model';
import accountShema  from '../schemas/accounts';
import dataAccount from '../data/acount';
import autentication from '../middlewares/autentication';

/**
 * Router express
 */
const router = Router();


/**
 * Obtenemos todas la cuentas
 */
router.get('/', autentication, async(req:Request, res:Response)=>{
    
    accountShema.find().exec( (err:any, datos:AccountModel[])=>{

        if(err) {
            return res.status(500).json({
            ok:false,
            error:  err,
            message: 'Error en el servidor al cargar las cuentas contables'
            })
        }


        if (datos.length===0) {
            accountShema.insertMany(dataAccount).then(
                (resp:any)=>{
                    return res.status(200).json({
                    ok:true,
                    data:resp
                    })
                }
            ).catch( (e)=>{
                return res.status(500).json({
                ok:false,
                error:  err,
                message: 'Error al crear las cuentas contables'
                })
            })
        } 
        else {
            return res.status(200).json({
            ok:true,
            data:datos
            })
        }



    })

})

export default router;