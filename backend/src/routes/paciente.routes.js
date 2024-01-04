import {Router} from "express"
import { actualizarPaciente, agregarPaciente, eliminarPaciente, mostrarPacientes, obtenerPaciente } from "../controllers/paciente.controllers.js"
import comprobarAuth from "../middleware/comprobarAuth.js"

const router = Router()

router.get("/pacientes",comprobarAuth,mostrarPacientes)

router.post("/pacientes",comprobarAuth,agregarPaciente)

router.get("/pacientes/:id",comprobarAuth,obtenerPaciente)

router.put("/pacientes/:id",comprobarAuth,actualizarPaciente)

router.delete("/pacientes/:id",comprobarAuth,eliminarPaciente)




export default router