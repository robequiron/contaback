import mongoose, {Schema} from "mongoose";


/**
 * Config schemas
 */
var configSchema = new Schema({
    name: {type:String, required: [true, "El nombre de la compañía es obiligatorio"]},
    nif: {type:String, required: [true,"El cif es obligatorio"]},
})



export default mongoose.model('config', configSchema);