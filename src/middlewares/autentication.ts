import jwt from 'jsonwebtoken';
const SEED:string = require('../config/config').SEED;

/**
 * Check token
 */
var checkToken = (req:any, res:any, next:any)=>{

    var token:any = req.query.token;
    

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

        res.usuario  = decoded.usuario;

        next();
    })

}

export default checkToken;