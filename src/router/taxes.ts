import { Router,Request,Response } from "express";
import { TaxesModel } from "../models/taxes.model";
import taxes from "../schemas/taxes";
import autentication from "../middlewares/autentication";
import ObjectID from "bson-objectid";

const router = Router();

/**
 * Obtenemos todos los impuestos
 */
router.get('/', autentication, async(req:Request, res:Response)=>{
        
   
        let nameSearch = new RegExp(req.query.name as string | '', 'i');
        let code = parseInt(req.query.code as string) | 0;
        let codeSearch = {};
        if (code===0) {
            codeSearch = {$gt:0};
        } else {
            codeSearch = {$eq:code}
        }

        //Query
        let query:any = {
            name: nameSearch,
            code : codeSearch
        };

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
        if (sortField==='name') {orderName=order};
        
        //Buscamos por el codigo directamente
        if (req.query.code) {
          query = { code: parseInt(req.query.code as string)}
        }

        await taxes.find(query)
        .skip(from)
        .limit(limit)
        .sort({
            name:orderName
        })
        .exec(
            (err:any, taxesdb:any)=>{
                taxesdb = taxesdb as TaxesModel[];

                if(err) {
                    return res.status(500).json({
                    ok:false,
                    error:  err,
                    message: 'Error al cargar los impuesto'
                    })
                }

                taxes.countDocuments(query,(err:any, count:any)=>{
                    res.status(200).json({
                    ok:true,
                    count: count,
                    taxes:taxesdb,
                    from:from,
                    limit:limit
                    })
                })
                

                
            }
        )

})
/**
 * Obtenemos el último código disponible
 */
router.get('/lastcode', autentication, async(req:Request, res: Response)=>{

    let count:number=0;

    


    //Si no hay impuestos creados retorno 1
    taxes.countDocuments({},(err,tax:any)=>{
        
        if(err) {
            return res.status(500).json({
            ok:false,
            error:  err,
            message: 'Error al obtener el total de registros'
            })
        }
        
        count = tax;
        
        if (tax===0) {
            return res.status(200).json({
                ok:true,
                lastCode: 0
            })
        }

        taxes.find()
        .sort({code:-1})
        .limit(1)
        .exec((err:any, taxdb:any)=>{
            if (err) {
                return res.status(500).json({
                ok:false,
                error:  err,
                message: 'Error al consulta el último código disponible'
                })
            }

            if (taxdb[0].code===9) {
                return res.status(500).json({
                ok:false,
                message: 'Error no existen más códigos disponible'
                })
            }

            res.status(200).json({
            ok:true,
            lastCode: taxdb[0].code 
            })

        }) 
    
    })

   

      

       

})
/**
 * Obtenemos el impuesto según el identificador
 */
router.get('/:id', autentication, async(req:Request, res:Response)=>{

    let id:string = req.params.id;

    if (!id) {
        return res.status(500).json({
        ok:false,
        message: 'Error no existe identificador para encontrar el registro'
        })
    }

    taxes.findById(id, (err:any , taxdb:any)=>{
        if (err) {
            return res.status(500).json({
            ok:false,
            error:  err,
            message: 'Error al buscar buscar el impuesto'
            })
        }

        res.status(200).json({
        ok:true,
        tax: taxdb
        })
    })

})
/**
 * Creamos el impuesto
 */
router.post('/', autentication, async(req:Request, res:Response)=>{
    


    var body  = req.body as TaxesModel;

    if(!body.code) {
        return res.status(500).json({
        ok:false,
        message: 'Error no existen tipos de datos'
        })
    }


    let taxSave = new taxes({
        code: body.code,
        name: body.name,
        percentages: [] = []
       
    })

    await taxSave.save( (err:any, taxDB:any)=>{
       
       
        if (err) {
           
            return res.status(500).json({
            ok:false,
            error:  err,
            message: 'Error al crear el impuesto'
            })
        }

        res.status(200).json({
        ok:true,
        tax:taxDB
        })

    })


})

/**
 * Modificamos el impuesto
 */
router.put('/:id', autentication, async(req:Request, res:Response)=>{

    let id = req.params.id;
    let body = req.body as TaxesModel;

    

    taxes.findById(id, (err:any, taxDB:any)=>{
        
        if (err) {
            return res.status(500).json({
            ok:false,
            error:  err,
            message: 'Error al encontrar el impuesto para modificar'
            })
        }

        taxDB.name = body.name;

        body.percentages.forEach( (item)=>{
            if(item._id==='') {
                item._id = new ObjectID().toHexString();
            }
        })

        taxDB.percentages = body.percentages; 

        

        taxDB.save((err:any, taxSave:any)=>{
            if(err) {
                return res.status(500).json({
                ok:false,
                error:  err,
                message: 'Error al modificar el impuesto'
                })
            }

            res.status(200).json({
            ok:true,
            tax:taxSave
            })
        })


    })

})


/**
 * Eliminamos el impuesto
 */
router.delete('/:id', autentication, async(req:Request, res:Response)=>{
    //Identificador del registro
    var id:string = req.params.id as string | '';

    //Buscamos el registro a eliminar
    taxes.findById(id).then(
        (resp:any)=>{
            //Si tiene porcentajes eliminamos
            if (resp.percentages.length===0) {
                taxes.findByIdAndDelete(id).then(
                    ()=>{
                        return res.status(200).json({
                        ok:true,
                        taxes:resp
                        })
                    }
                ).catch((err:any)=>{
                    return res.status(500).json({
                    ok:false,
                    error:  err,
                    message: 'Error al eliminar el registro'
                    })
                })
            } else {
                return res.status(200).json({
                ok:false,
                message: 'Error existen porcentajes, no es posible eliminar'
                })
            }
        }
    ).catch((err:any)=>{
        return res.status(500).json({
        ok:false,
        error:  err,
        message: 'Error en la busqueda del registro'
        })
    })


})

export default router;