import app from "./app.js";
import conectarDB from "./db.js";

app.listen(process.env.PORT,()=>{
    console.log("Servidor corriendo en el puerto ",process.env.PORT)
})

conectarDB()