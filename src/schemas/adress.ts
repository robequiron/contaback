import { AdresModel } from "../models/adress.model";
import mongoose, {Schema} from 'mongoose';

/**
 * Schema adress - Direcciones
 */
const adressSchema = new Schema({
    _idCuenta: {type:Schema.Types.ObjectId, ref:'cuenta'},
    _idWorkplace:{type:Schema.Types.ObjectId, ref:'workplace'},
    _idVia:{type:Schema.Types.ObjectId, ref:'via'},
    nameVia:{type:String,require:[true, 'El nombre es obligatorio']},
    number:{type:Number},
    flat:{type:String},
    door:{type:String},
    postal:{type:Number, require:[true, 'El código postal es obligatorio'], max:[53000,'No puede ser superior de 53000']},
    town:{type:String},
    other:{type:String}
})

export default mongoose.model<AdresModel>('adress',adressSchema,'adresses');
