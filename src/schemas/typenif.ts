import mongoose, {Schema} from 'mongoose';
var uniqueValidator = require("mongoose-unique-validator");


var typeNifSchema = new Schema({
    code: {type:Number, unique:true, required:[true, "El código es obligatorio"], max:[9,'Nivel máximo de entradas']},
    name: {type: String, required:[true, "El nombre es obligatorio"], uppercase:true},
    valida: {type:Boolean},
})

typeNifSchema.plugin(uniqueValidator, {menssage: '{PATH} debe ser único'});


export default mongoose.model('typenif', typeNifSchema);