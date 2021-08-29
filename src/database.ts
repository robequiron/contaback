import mongoose  from "mongoose";

/**
 * Conección de la base de datos
 */
const dbConnecction = async() =>{

    mongoose.connection.openUri("mongodb://localhost:27017/conta", (err,res)=>{
        if (err) { throw err}

        if(res) {
            console.log("Connección base de datos establecidad")
        }

    })

}

export default dbConnecction;

