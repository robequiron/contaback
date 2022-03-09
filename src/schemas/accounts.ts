import mongoose, {Schema} from 'mongoose';
import { AccountModel } from '../models/account.model';


const accountShema = new Schema({

    account:{type:Number, required:[true, 'El código de la cuenta es obligatorio'], max:[99999, 'Np puede ser superior a 6 dígitos']},
    _idSubgrupo: {type:Schema.Types.ObjectId, ref:'subgrupo'},
    name:{type:String, required:[true, 'Nombre de la cuenta obligatorio']},
    type: {type:String, required:[true, 'Es obligatorio el tipo de cuenta']}

})

export default mongoose.model<AccountModel>('account',accountShema,'accounts');