import jwt from 'jsonwebtoken';
import { Request, Response} from 'express';
const SEED:string = require('../config/config').SEED;

/**
 * Check token
 */
var checkToken = (req:Request, res:Response, next:any)=>{

    var token:any = req.query.token || req.headers.token;

    jwt.verify(token, SEED, (err:any,decoded:any)=>{

        if(err) {
            res.status(401).json({
                ok:false,
                error: {
                    message:'Token incorrectos',
                    error: err
                }
            })
        }
        
       req.body.usuario  = decoded.usuario ;

        next();
    })

}

export default checkToken;