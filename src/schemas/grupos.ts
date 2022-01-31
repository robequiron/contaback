import  mongoose, {Schema}  from "mongoose";
import {GrupoModel} from '../models/grupo.model';


const grupoSchema = new Schema({
    code:{type:Number, required:[true,'El código de la cuenta es obligatorio'], max:[10,'La longitud no puede ser superior a 1 dígito']},
    name:{type:String, required:[true, 'Es obligatorio el nombre']}
});

export default mongoose.model<GrupoModel>('grupo',grupoSchema,'grupos');
