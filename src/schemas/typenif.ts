import mongoose, {Schema} from 'mongoose';
var uniqueValidator = require("mongoose-unique-validator");


var typeNifSchema = new Schema({
    //Código del tipo de nif
    code: {type:Number, unique:true, required:[true, "El código es obligatorio"], max:[9,'Nivel máximo de entradas']},
    //Nombre del tipo de nif
    name: {type: String, required:[true, "El nombre es obligatorio"], uppercase:true},
    //Si el campo tiene algún proceso de validación. Si es true no pueden eliminarse ni modificarse
    valida: {type:Boolean},
})

typeNifSchema.plugin(uniqueValidator, {menssage: '{PATH} debe ser único'});

//TODO: CREAR MODELO TIPO DE NIF
export default mongoose.model('typenif', typeNifSchema,'typenifs');