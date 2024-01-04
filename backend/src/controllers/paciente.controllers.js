import Paciente from "../model/paciente.modelo.js"


export const mostrarPacientes = async (req,res) =>{
    try {
        const pacientes = await Paciente.find().where("veterinario").equals(req.veterinario)
        return res.json(pacientes)
        
    } catch (error) {
        console.log(error)
    }
}


export const agregarPaciente = async (req,res) =>{

    try{
        const nuevoPaciente = new Paciente(req.body)
        nuevoPaciente.veterinario = req.veterinario._id
        const pacienteGuardado = await nuevoPaciente.save()

        res.json({pacienteGuardado})
    }catch(error){
        console.log(error)
    }
}

export const obtenerPaciente = async (req,res)=>{
    const {id} = req.params

    const paciente = await Paciente.findById(id)
    if(!paciente) return res.status(400).json({mensaje:"Paciente no encontrado"})

    if(paciente.veterinario.toString() !== req.veterinario.id.toString()){
        return res.json({mensaje:"Accion no valida"})
    }

    try {
        res.json(paciente)        
    } catch (error) {
        console.log(error)
    }

}

export const actualizarPaciente = async(req,res)=>{
    const {id} = req.params
    const {nombre,email,propietario,sintomas} = req.body

    const paciente = await Paciente.findById(id)
    if(!paciente) return res.status(400).json({mensaje:"Paciente no encontrado"})

    if(paciente.veterinario.toString() !== req.veterinario.id.toString()){
        return res.json({mensaje:"Accion no valida"})
    }

    try{
        paciente.nombre = nombre || paciente.nombre
        paciente.email = email || paciente.email
        paciente.propietario = propietario || paciente.propietario
        paciente.sintomas = sintomas || paciente.sintomas

        await paciente.save()
        return res.json({mensaje:"Paciente actualizado correctamente"})
    }catch(error){
        console.log(error)
    }
}

export const eliminarPaciente = async (req,res)=>{
    const {id} = req.params
    const {nombre,email,propietario,sintomas} = req.body

    const paciente = await Paciente.findById(id)
    if(!paciente) return res.status(400).json({mensaje:"Paciente no encontrado"})

    if(paciente.veterinario.toString() !== req.veterinario.id.toString()){
        return res.json({mensaje:"Accion no valida"})
    }

    try {
        await paciente.deleteOne()

        return res.json({mensaje:"Paciente eliminado correctamente"})
    } catch (error) {
        console.log(error)
    }
}
