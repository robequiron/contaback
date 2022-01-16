import { cuentasModel } from '../models/cuentas.model';
import mongoose, {Schema} from 'mongoose';
var uniqueValidator = require("mongoose-unique-validator");


const email = new Schema({
    email:{type:String},
    description: {type:String},
})

//email.plugin(uniqueValidator, {menssage: '{PATH} debe ser único'});

var categories = {
    values: ['R','P','I'],
    menssage: '{VALUE} no es una categoría válida',
};

var sexo = {
    values : ['M','F',''],
    menssage: '{VALUE} no es un sexo válido'
}

const cuentaSchema = new Schema({
    code:{type:Number, required:[true,'El código es obligatorio'], max:[4, 'No puede ser superior a 5 dígitos']},
    category: {type:String, required:[true, 'La categoría es obligatoria'], enum:categories, default:'R'},
    name:{type:String, required:[true, 'El nombre es obligatorio']},
    surname:{type:String, required:[true,'El apellido es obligatorio']},
    surname2: {type:String},
    typeNif: {type:Number},
    nif: {type:String},
    sex: {type:String, enum:sexo},
    dateBirth: {type:Date},
    locked:{type:Boolean},
    email: [email],
    register:{type:Array}
});

export default mongoose.model<cuentasModel>('cuenta',cuentaSchema,'cuentas');