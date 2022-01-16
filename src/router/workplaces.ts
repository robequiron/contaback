import {Router, Request, Response} from 'express';
/*
* Importe schema workplace
*/
import user  from '../schemas/users';


import workplaces from '../schemas/workplaces';
import { workplaceModel } from '../models/workplace.model';
import autentication from '../middlewares/autentication';
import { Error } from 'mongoose';



/**
 * Router express
 */
const router = Router();

/**
 * Obtenemos la sede principal de una cuenta personal
 */
router.get('/headquater/:idCuenta', autentication, (req:Request,res:Response)=>{

    let idCuenta = req.params.idCuenta as string;

    if (!idCuenta) {
        return res.status(400).json({
        ok:false,
        error:  'Error no existe cuenta personal para buscar',
        message: 'Error no existe cuenta personal para buscar'
        })
    }

    workplaces.find({_idCuenta:idCuenta, headquarters:true},(err:Error,workplacesDb:workplaceModel)=>{

        if (err) {
            return res.status(500).json({
            ok:false,
            error:  err,
            message: 'Error en la consulta de la DB workplace. Consulte con el administrador'
            })
        }

        return res.status(200).json({
            ok:true,
            data:workplacesDb
        })

    })



}) 




/**
 * Get user
 * 
 * Obtenemos el usuario
 */
router.get('/:id', autentication, (req:Request, res:Response)=>{

    let id = req.params.id;


    if(!id) {
        return res.status(400).json({
        ok:false,
        error: {
            message:"No existe usuario para buscar"
        }
        })
    }


    user.findById(id, (err:any, user:any)=>{

        if (err) {
            return res.status(500).json({
            ok:false,
            error:  err,
            message: 'Error al buscar el registro'
            })
        }

        return res.status(200).json({
            ok:true,
            usuario:user
        })

    })


})





export default router;