import { subgrupoModel } from '../models/subgrupos.model';
import mongoose, {Schema} from 'mongoose';

const subgrupoSchema = new Schema({

    _idGrupo: {type:Schema.Types.ObjectId, ref:'grupo'}, 
    subgrupo:{type:Number, required:[true, 'El código de grupo es obligatorio'], max:[99, 'No puede ser superior a 2 dígitos']},
    name:{type:String, required:[true, 'El nombre no puede ser nulo']}

})

export default mongoose.model<subgrupoModel>('subgrupo',subgrupoSchema,'subgrupos');