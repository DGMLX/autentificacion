import jwt from "jsonwebtoken"
import Veterinario from "../model/veterinario.model.js"

const comprobarAuth =async (req,res,next) =>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(" ")[1]
            const tokenDecoded= jwt.decode(token,process.env.JWT_SECRET)
            req.veterinario = await Veterinario.findById(tokenDecoded.id).select("-password -token -confirmado")
            return next()    
        } catch (error) {
            return res.json({mensaje:"Token invalido"})
        }
    }else{
        return res.json({mensaje:"Token invalido o inexistente"})
    }

    next()
}

export default comprobarAuth