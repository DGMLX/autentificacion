import {Schema,model} from "mongoose"

const PacienteSchema = new Schema({
    nombre:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    propietario:{
        type:String,
        required:true,
        trim:true
    },
    sintomas:{
        type:String,
        required:true,
        trim:true
    },
    veterinario:{
        type:Schema.Types.ObjectId,
        ref:'Veterinario'
    }
})


export default model("Paciente",PacienteSchema)