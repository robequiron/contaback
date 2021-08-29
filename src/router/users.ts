import {Router, Request, Response} from 'express';
/*
* Importe schema user
*/
import user  from '../schemas/users';
import { UserModel } from 'models/users.model';
import autentication from '../middlewares/autentication';
import  bcryptjs  from 'bcryptjs';
import { Error } from 'mongoose';



/**
 * Router express
 */
const router = Router();



/**
 * Get users.
 * 
 * Obtenemos todos los usuarios 
 */
router.get('/', autentication ,async(req:Request, res:Response)=>{


    let rol:Array<string> = [];
    if(!req.query.rol) {
        rol= ['USER_ROLE','SUPER_ROLE','ADMIN_ROLE']
    } else {
        rol = req.query.rol as Array<string>;
    }
    
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
    

    await user.find(
        {
            name: nameSearch,
            email: emailSearch,
            rol: { $in: rol}
        }, 'name img rol email')
    .skip(from)
    .limit(limit)
    .sort({
        name: orderName ,
        email: orderEmail,
    })
    .exec( 
        (err:any,users:any)=>{
            users = users as UserModel[];
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
            user.countDocuments({
                name: nameSearch,
                email: emailSearch,
                rol: { $in: rol}
            }, (err,count)=>{
                res.status(200).json({
                    ok:true,
                    count: count,
                    from:from,
                    limit:limit,
                    users: users,
                })
            })

            
    })
   






})

/**
 * Get users.
 * 
 * Obtenemos todos los usuarios para los listado. 
 */
 router.get('/list', autentication ,async(req:Request, res:Response)=>{


    let rol:Array<string> = [];
    if(!req.query.rol) {
        rol= ['USER_ROLE','SUPER_ROLE','ADMIN_ROLE']
    } else {
        rol = req.query.rol as Array<string>;
    }
    
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
    

    await user.find(
        {
            name: nameSearch,
            email: emailSearch,
            rol: { $in: rol}
        }, 'name img rol email')
    .sort({
        name: orderName ,
        email: orderEmail,
    })
    .exec( 
        (err:any,users:any)=>{
            users = users as UserModel[];
            if (err) {
                res.status(500).json({
                   ok:false,
                   error: {
                        message: 'Error al buscar usuarios',
                        error: err
                   }
                })      
            }

            //Get number of records
            user.countDocuments({
                name: nameSearch,
                email: emailSearch,
                rol: { $in: rol}
            }, (err,count)=>{
                res.status(200).json({
                    ok:true,
                    count: count,
                    users: users,
                })
            })

            
    })
   
})

/**
 * Check duplicate email
 * 
 * Comprobamos que el email no este duplicado
 */
router.get('/duplicateEmail', autentication, (req:Request, res:Response)=>{
  

    let emailSearch:string = req.query.email as string;
    let _id:any  = req.query._id as string ;
    if (_id==='') {
        _id = null;
    }

    if (!emailSearch) {
        return res.status(500).json({
        ok:false,
        message: 'Error no hay email para comparar'
        })
    }
    

    user.find({
        email:emailSearch,
        _id: {$ne :_id }
    }).exec( (err:any, users:any) =>{

        if(err) {
            res.status(500).json({
            ok:false,
            error:  err,
            message: 'Error en la consulta. Para comparar el email'
            })
        }
       
           
        if (users.length>0) {
            res.status(200).json({
                existe:true,
            })
        } else {
            res.status(200).json({
                existe:false,
            })
        }

        

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

/**
 * Update user
 * 
 * Actualizamos el usuario
 */
 router.put('/:id', autentication, async(req:Request, res:Response)=>{


    var id = req.params.id;
    var body = req.body as UserModel;

    user.findById(id, (err:any, usersDB:any)=>{

        if (err) {
             return res.status(500).json({
                ok:false,
                error:  err,
                message: 'Error al buscar el usuario'
            })
        }

        if(!usersDB) {
            return res.status(500).json({
                ok:false,
                error: {
                    message: 'Error, el usuario no se encuentra',
                    error:err
                }
            })
        }

        usersDB.name = body.name;
        usersDB.rol = body.rol;
        
        if (usersDB.email!=body.email){
            usersDB.email = body.email;
        }


        usersDB.save((err:any,usuarioSave:any)=>{
            if(err) {
                return res.status(500).json({
                    ok:false,
                    error: {
                        message: "Error al modificar el usuario",
                        error:err
                    },
                    
                })
            }   

            res.status(200).json({
                ok:true,
                usuario: usuarioSave,
            })
        })




    })



})

/**
 * Create user
 * 
 * Creamos el usuario
 */
router.post('/', autentication, async(req: Request, res:Response)=>{

    var body = req.body as UserModel;

    if (!body.email || !body.password) {
        return res.status(500).json({
        ok:false,
        message: 'Error no existen datos'
        })
    }

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

    })
    
})

/**
 * Delete user
 * 
 *  Eliminamos el usuario
 */
router.delete('/:id', autentication, async(req:Request, res:Response)=>{

    let id:string = req.params.id;

    
   await user.findByIdAndRemove(id).then(
       (userDelete:any)=>{
        return res.status(200).json({
            ok:true,
            usuario:userDelete
        })
       }
   ).catch(
       (err:Error)=>{
           return res.status(500).json({
           ok:false,
           error:  err,
           message: 'Error al eliminar el usario'
           })
       }
   )

})




export default router;