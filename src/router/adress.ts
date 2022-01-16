import {Router, Request, Response} from 'express';
import autentication from "../middlewares/autentication";
import { AdresModel } from '../models/adress.model';
import adress from '../schemas/adress';



const router = Router();

/**
 * Buscarmos la dirección por su identificador
 */
router.get('/:id', autentication, async(req:Request, res:Response)=>{

    let id = req.params.id;

    if (!id) {
        return res.status(500).json({
        ok:false,
        message: 'Error no existe identificador'
        })
    }

    adress.findById(id, (err:any,adressDb:AdresModel)=>{

        if(err) {
            return res.status(400).json({
            ok:false,
            error:  err,
            message: 'Error no existe registro a encontrar'
            })
        }

        res.status(200).json({
        ok:true,
        data:adressDb
        })



    })
})

/**
 * Creamos la dirección 
 */
router.post('/', autentication, async(req:Request, res:Response)=>{

    var body  = req.body as AdresModel;

    if(!body._idCuenta) {
        return res.status(500).json({
        ok:false,
        message: 'Error no existe el Identificador de la cuenta personal'
        })
    }

    let adressSave = new adress({
        _id: body._idWorkplace,
        _idCuenta: body._idCuenta,
        _idWorkplace : body._idWorkplace,
        _idVia :body._idVia,
        nameVia: body.nameVia,
        number: body.number,
        flat: body.flat,
        door: body.door,
        postal: body.postal,
        town : body.town,
        other: body.other
    });

    await adressSave.save( (err:any, adressDB:AdresModel)=>{

        if(err) {
            return res.status(500).json({
            ok:false,
            error:  err,
            message: 'Error, al crear la dirección'
            })
        }

        return res.status(200).json({
            ok:true,
            data:adressDB
        })


    });


})

/**
 * Modificamos la dirección
 */
router.put('/:id', autentication, async(req:Request, res:Response)=>{

    let id:string = req.params.id;
    let body = req.body as AdresModel;


    if (!id) {
        return res.status(500).json({
        ok:false,
        message: 'Error no existe identificador'
        })
    }

    await adress.findById(id, (err:any, adressDB:any)=>{

        if (err) {
            return res.status(400).json({
            ok:false,
            error:  err,
            message: 'Error no se encuentra el registro a modificar'
            })
        }

        adressDB._idVia=body._idVia;
        adressDB.nameVia=body.nameVia;
        adressDB.number=body.number;
        adressDB.door=body.door;
        adressDB.flat=body.flat;
        adressDB.postal=body.postal;
        adressDB.town=body.town;
        adressDB.other=body.other;

        

        adressDB.save((err:any, adressSave:any)=>{
            if(err){
                return res.status(500).json({
                ok:false,
                error:  err,
                message: 'Error al modificar la dirección'
                })
            }
            res.status(200).json({
            ok:true,
            data:adressSave
            })
        })

    })




})



export default router;