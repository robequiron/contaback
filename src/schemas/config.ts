import mongoose, {Schema} from "mongoose";
import { ConfigModel } from '../models/config.model';


/**
 * Config schemas
 */
var configSchema = new Schema({
    name: {type:String, required: [true, "El nombre de la compañía es obiligatorio"]},
    nif: {type:String, required: [true,"El cif es obligatorio"]},
    codeNif: {type:Number, required: [true, "El tipo de Nif es obligatorio"]},
    workplace: {type:Boolean, default:false},
    workplaceCuenta: {type:Boolean, default:false},
})



export default mongoose.model<ConfigModel>('config', configSchema);