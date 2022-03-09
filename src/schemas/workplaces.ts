import { workplaceModel } from '../models/workplace.model';
import mongoose, {Schema} from 'mongoose';
/**
 * Shcema workplace - Centro de trabajo
 */
const workplaceSchema = new Schema({
    code:{type:Number, required:[true, 'El código es obligatorio'], max:[99,'No puede ser superior a 2 dígitos']},
    _idCuenta:{type:Schema.Types.ObjectId, ref:'cuenta'},
    name:{type:String},
    headquarters:{type:Boolean, default:false} 
});

export default mongoose.model<workplaceModel>('workplace',workplaceSchema,'workplaces');