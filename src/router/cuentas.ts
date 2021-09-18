import {Router,Response,Request} from 'express';
import { cuentasModel } from '../models/cuentas.model';
import autentication from '../middlewares/autentication';
import cuentas from '../schemas/cuentas';

const router = Router();

/**
 * Get cuentas.
 * 
 * Obtenemos todos las cuentas 
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
        })
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


    })


})

/**
 * Create user
 * 
 * Creamos el usuario
 */
 router.post('/', autentication, async(req: Request, res:Response)=>{

    var body = req.body as cuentasModel;

    if (!body.code || !body.name) {
        return res.status(500).json({
        ok:false,
        message: 'Error no existen datos'
        })
    }
    /*
    let userSave  = new user({
        name: body.name,
        email: body.email,
        rol : body.rol || 'USER_ROLE',
        password: bcryptjs.hashSync(body.password, 10)
    })
    
    await userSave.save((err:any, userDB:any)=>{

        userDB as UserModel;

        if (err) {
            res.status(400).json({
                ok:false,
                error:  err,
                message: 'Error al crear el usuario'
            })
        }

        userDB.password = ':)';

        res.status(201).json({
            ok:true,
            usuario: userDB,
            usuarioDecode: body
        })

    })*/
    
})

export default router;