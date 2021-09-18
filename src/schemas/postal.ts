import mongoose, {Collection, Schema} from 'mongoose';
import { PostalModel } from '../models/postal.model';


/**
 * Modelo para la base de datos de código postales 
 * */ 
let postalSchema = new Schema({
    code: {type:Number, required: [true, 'El código es obligatorio'], 
            max: [5, 'El número máximo no puede ser superior a 5']
    },
    provincia:  {type:String, required: [true, 'El nombre es obligatorio']},
    poblacion: {type:String, required: [true, 'El nombre es obligatorio']},
    
})
/**
 * Exportacion modelo postal
 */
export default mongoose.model<PostalModel>('postal', postalSchema,'postales')