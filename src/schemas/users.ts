import mongoose, { Schema }  from "mongoose";


var uniqueValidator = require("mongoose-unique-validator");

var validRoles = {
    values: ['ADMIN_ROLE','SUPER_ROLE','USER_ROLE'],
    menssage: '{VALUE} no es un rol válido',
};


/**
 * User models
 */
var userSchema = new Schema({
    name: {type:String, required: [true, "El usuario es obligatorio"], uppercase:true},
    img: {type:String, required:false},
    rol: {type:String, required:[true, "Es necesario un rol"], default:'USER_ROLE', enum: validRoles }, 
    password: {type:String, required:[true, "Es necesario un password"]},
    email: {type:String, unique:true, required:[true,"Es necesario un email"]},
});




userSchema.plugin(uniqueValidator, {menssage: '{PATH} debe ser único'});



export default mongoose.model('user',userSchema);