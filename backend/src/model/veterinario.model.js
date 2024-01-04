import mongoose from "mongoose"
import generarId from "../helpers/generarId.js"
import bcrypt from "bcrypt"

const VeterinarioSchema = new mongoose.Schema({
    nombre:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    token:{
        type:String,
        default:generarId
    },
    confirmado:{
        type:Boolean,
        default:false
    }
})



export default mongoose.model("Veterinario",VeterinarioSchema)


