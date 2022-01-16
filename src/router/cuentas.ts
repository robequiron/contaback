import {Router,Response,Request} from 'express';
import { cuentasModel } from '../models/cuentas.model';
import { workplaceModel } from 'models/workplace.model';
import autentication from '../middlewares/autentication';
import cuentas from '../schemas/cuentas';
import workplaces from '../schemas/workplaces';
import { RegisterModel } from '../models/register.model';

const router = Router();

/**
 * Get cuentas.
 * 
 * Obtenemos todas las cuentas 
 */
 router.get('/', autentication ,async(req:Request, res:Response)=>{


    //Paginación
    let from:number = Number(req.query.page) || 0;
    let limit:number = Number(req.query.pageSize)|| 10;
    from = (from - 1)  * limit;

    //Orden
    let sortField:string = req.query.sortField as string;
    let sortOrder:string = req.query.sortOrder as string;
    
    let order:number = 0;
    if (sortOrder==='ascend') { order=1};
    if (sortOrder==='descend') { order =-1};

    let orderName: number = 0;
    let orderEmail:number = 0;
    if (sortField==='name') {orderName=order};
    if (sortField==='email') {orderEmail=order}

    //Busqueda
    var nameSearch = new RegExp(req.query.name as string , 'i');
    var emailSearch = new RegExp(req.query.email as string , 'i');
    

    await cuentas.find(
        {
            name: nameSearch,
        },'_id code name surname surname2 typeNif nif')
    .skip(from)
    .limit(limit)
    .sort({
        name: orderName ,
        email: orderEmail,
    })
    .exec( 
        (err:any,cuentasDb:cuentasModel[])=>{
            if (err) {
                return res.status(500).json({
                   ok:false,
                   error: {
                        message: 'Error al buscar usuarios',
                        error: err
                   }
                })      
            }

            //Get number of records
            cuentas.countDocuments({
                name: nameSearch,
                
            }, (err,count)=>{
                res.status(200).json({
                    ok:true,
                    count: count,
                    from:from,
                    limit:limit,
                    data: cuentasDb,
                })
            })

            
    })

})

/**
 * Obtenemos el último código disponible
 */
router.get('/lastcode', autentication, async(req:Request, res:Response)=>{
    let count:number = 0;

    //Si no hay cuenta creamos e retorno 1
    cuentas.countDocuments({}, (err:any,count:any)=>{

            if(err) {
                return res.status(500).json({
                ok:false,
                error:  err,
                message: 'Error al consultar el número de counts'
                })
            } 

            if(count===0) {
                return  res.status(200).json({
                ok:true,
                data:0
                })
            } 

            res.status(200).json({
            ok:true,
            data:count,
            })



    })


})

/**
 * Obtenemos la cuenta según el identificador
 */
router.get('/:id', autentication, async(req:Request, res:Response)=>{

    let id:string = req.params.id;

    if (!id) {
        return res.status(500).json({
        ok:false,
        message: 'Error no existe identificador para encontrar el registro'
        })
    }

    await cuentas.findById(id, (err:any , cuentadb:cuentasModel)=>{
        if (err) {
            return res.status(500).json({
            ok:false,
            error:  err,
            message: 'Error al buscar buscar la cuenta'
            })
        }

        res.status(200).json({
        ok:true,
        cuenta: cuentadb
        })
    })

})

/**
 * Creamos la cuenta personal 
 */
router.post('/', autentication, async(req: Request, res:Response)=>{

    
    var body = req.body as cuentasModel;


    if (!body.code || !body.name) {
        return res.status(500).json({
        ok:false,
        message: 'Error no existen datos'
        })
    }

   
    let register = new RegisterModel(
        req.body.usuario._id,
        req.body.usuario.name
    )


   let cuentaSave = new cuentas({
        email: [],
        code: body.code,
        category: body.category,
        name: body.name,
        surname: body.surname,
        surname2: body.surname2,
        typeNif: body.typeNif,
        nif: body.nif,
        sex: body.sex,
        dateBirth: body.dateBrith,
        locked: body.locked,
        register:[register],
   });

   let workplaceSave = new workplaces({
        code:1,
        name:'',
        headquarters:true,
   })

   

   


   await cuentaSave.save( (err:any, cuentaDB:cuentasModel)=>{

        if (err) {
            return res.status(500).json({
            ok:false,
            error:  err,
            message: 'Error, al crear la cuenta'
            })
        }

        workplaceSave._idCuenta = cuentaDB._id;

        workplaceSave.save();

        return res.status(200).json({
        ok:true,
        data:cuentaDB
        })

   })

    
       
    
})

/**
 * Modificamos la cuenta personal
 */
router.put('/:id', autentication, async(req:Request, res:Response)=>{

    let id = req.params.id;
    let body = req.body as cuentasModel;

    if (!id) {
        return res.status(500).json({
        ok:false,
        message: 'Error no existe identificador'
        })
    }

    await cuentas.findById(id, (err:any, cuentaDB:any)=>{
        
        if (err) {
            return res.status(500).json({
            ok:false,
            error:  err,
            message: 'Error al encontrar la cuenta para modificar'
            })
        }
        
        cuentaDB.name = body.name;
        cuentaDB.surname = body.surname;
        cuentaDB.surname2 = body.surname2;
        cuentaDB.nif = body.nif;
        cuentaDB.dateBrith = body.dateBrith;
        cuentaDB.email = body.email;
        cuentaDB.sex = body.sex;

        console.log(cuentaDB);

        cuentaDB.save((err:any, cuentaSave:any)=>{
            if(err) {
                return res.status(500).json({
                ok:false,
                error:  err,
                message: 'Error al modificar la cuenta'
                })
            }

            res.status(200).json({
            ok:true,
            tax:cuentaSave
            })
        })


    })

})

export default router;