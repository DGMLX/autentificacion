import mongoose from "mongoose"


const conectarDB = async () =>{
    try {
        const conexion = await mongoose.connect(process.env.MONGO_URL)

        console.log("Conexion a la BD con exito")
    } catch (error) {
        console.log("Error en la conexion de la BD")
        console.log(error)
    }
}

export default conectarDB