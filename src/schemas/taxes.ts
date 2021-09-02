import mongoose, {Schema} from 'mongoose';

let percentage = new Schema({
    name: {type:String, required:[true, 'El nombre es obligatorio']},
    percentage: {type:Number, required: [true, 'El porcentaje es obligatorio'],
        max: [100, 'No puede ser superior a 100'],
        min: [-100, 'No puede ser inferior a -100']
    },
    dateInit: {type:Date, default: Date.now},
    dateEnd: {type:Date}
})



let taxesSchema = new Schema({
    code: {type:Number, required: [true, 'El código es obligatorio'], 
            max: [9, 'El número máximo no puede ser superior a 9']
    },
    name:  {type:String, required: [true, 'El nombre es obligatorio']},
 
})


export default mongoose.model('taxes', taxesSchema)