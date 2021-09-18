import mongoose, {Schema} from 'mongoose';
import {ViasModel}  from '../models/vias.model'
var uniqueValidator = require("mongoose-unique-validator");

/**
 * Vias schema
 */
var viaSchema = new Schema({
    code:{type:String, required: [true, "El código es obligatorio"], uppercase:true,unique:true,max:4},
    name: {type:String, required: [true, "El nombre es obligatorio"], uppercase:true},
});


viaSchema.plugin(uniqueValidator, {menssage: '{PATH} debe ser único'});

export default mongoose.model<ViasModel>('via', viaSchema);