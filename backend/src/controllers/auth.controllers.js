import { trusted } from "mongoose"
import Veterinario from "../model/veterinario.model.js"
import generarJWT from "../helpers/generarJWT.js"
import generarId from "../helpers/generarId.js"
import emailRegistro from "../helpers/emailRegistro.js"
import comprobarPassword from "../helpers/comprobarPassword.js"
import generarPassword from "../helpers/generarPassword.js"
import emailRecuperarPassword from "../helpers/emailRecuperarPassword.js"

export const registro = async (req,res) =>{
    const {nombre,email,password} = req.body

    const usuarioExiste = await Veterinario.findOne({email})
    
    if(usuarioExiste){
        const error = new Error("El usuario ya existe")
        return res.status(400).json({mensaje:error.message})
    }

    const hash = await generarPassword(password)

    const usuarioRegistrar = new Veterinario({
        nombre,
        email,
        password:hash
    })

    const usuarioGuardado = await usuarioRegistrar.save()

    emailRegistro({nombre,email,token:usuarioGuardado.token})

    const usuarioJSON = {
        id:usuarioGuardado.id,
        nombre,
        email,
        token:usuarioGuardado.token,
        confirmado:usuarioGuardado.confirmado
    }
    return res.json(usuarioJSON)

}



export const login = async (req,res) =>{
    const {email,password} = req.body

    const usuarioExiste = await Veterinario.findOne({email})
    if(!usuarioExiste){
        const error = new Error("El usuario no existe")
        return res.status(400).json({mensaje:error.message})
    } 

    if(!usuarioExiste.confirmado){
        const error = new Error("Cuenta no confirmada")
        return res.status(400).json({mensaje:error.message})
    } 
    const coincidePassword = await comprobarPassword(password,usuarioExiste.password)
    console.log(coincidePassword)
    if(!coincidePassword){
        const error = new Error("El usuario no existe")
        return res.status(400).json({mensaje:error.message})
    } 
    

    return res.json({
        token:generarJWT(usuarioExiste._id)
    })

}

export const confirmar = async (req,res)=>{
    const {token} = req.params

    const usuarioConfirmar = await Veterinario.findOne({token})

    if(!usuarioConfirmar){
        const error = new Error("Token no válido")
        return res.status(400).json({mensaje:error.message})
    } 

    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true
        usuarioConfirmar.save()

        res.json({mensaje:"Usuario confirmado correctamente"})
    } catch (error) {
        console.log(error)
    }
    

}

export const perfil = (req,res) =>{
    console.log(req.veterinario)
    res.send("desde perfil")
}

export const recuperarPassword = async (req,res) =>{
    const {email} = req.body
    try {
        const usuarioExiste = await Veterinario.findOne({email})
        if(!usuarioExiste){
            const error = new Error("El usuario no existe")
            return res.status(400).json({mensaje:error.message})
        } 
        usuarioExiste.token = generarId()
        await usuarioExiste.save()
        emailRecuperarPassword({nombre:usuarioExiste.nombre,email,token:usuarioExiste.token})
        return res.json({mensaje:"Revisa tu correo y recupera tu contraseña"})
    } catch (error) {
        console.log(error)
    }
}

export const comprobarPeticionPassword = async (req,res) =>{
    const {token} = req.params

    if(!token){
        const error = new Error("Token inexistente")    
        return res.status(400).json({mensaje:error.message})
    }

    try {
        const usuarioExiste = await Veterinario.findOne({token}).select("-password -token -confirmado")
        if(!usuarioExiste){
            const error = new Error("Token inexistente")    
            return res.status(400).json({mensaje:error.message})
        }

        res.json(usuarioExiste)

    } catch (error) {
        console.log(error)
    }   
}

export const nuevaPassword =async (req,res) =>{
    const {token} = req.params
    const {password} = req.body

        const usuarioExiste = await Veterinario.findOne({token})
        if(!usuarioExiste){
            const error = new Error("Token inválido")
            return res.status(400).json({mensaje:error.message})
        } 

    try {
      
        const hashPassword = await generarPassword(password)
        usuarioExiste.password = hashPassword
        usuarioExiste.token = null
        await usuarioExiste.save()
        return res.json({mensaje:"Cambios guardados correctamente"})

    } catch (error) {
        console.log(error)
    }
}
