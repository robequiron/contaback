import mongoose  from "mongoose";

/**
 * Conección de la base de datos

const dbConnecction = async() =>{

    mongoose.connection.openUri("mongodb://localhost:27017/conta", (err,res)=>{
        if (err) { throw err}

        if(res) {
            console.log("Connección base de datos establecidad")
        }

    })

} */

const dbConnecction= async() =>{
    try {
        await mongoose.connect("mongodb://localhost:27017/conta", 
                {useNewUrlParser: true, 
                useUnifiedTopology: true,
                useCreateIndex:true,
                });
        console.log("Conectado")    
    } catch (error) {
        throw new Error('Error in connect DB');
    }


    
}

export default dbConnecction;

