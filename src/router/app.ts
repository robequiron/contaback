import { json } from 'body-parser';
import  { Router,Request,Response } from 'express';

const router:Router = Router();


router.get("/", (req:Request,res:Response)=>{

        res.status(200).json(
            {
                ok:true
            }
        )

});

export default router;