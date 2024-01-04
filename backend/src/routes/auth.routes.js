import { comprobarPeticionPassword, confirmar, login, nuevaPassword, perfil, recuperarPassword, registro } from "../controllers/auth.controllers.js"
import {Router} from "express"
import comprobarAuth from "../middleware/comprobarAuth.js"

const router = Router()

//rutas publicas
router.post("/registro",registro)
router.post("/login",login)
router.get("/confirmar/:token",confirmar)
router.post("/recuperarPassword",recuperarPassword) //mandar solicitud con email 
router.get("/recuperarPassword/:token",comprobarPeticionPassword) //comprobamos el token enviado
router.post("/recuperarPassword/:token",nuevaPassword) //asignar nueva password

//rutas privadas
router.get("/perfil",comprobarAuth,perfil)

export default router