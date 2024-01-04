import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { nuevaPasswordRequest } from "../axios/auth.axios"
import Alerta from "../components/Alerta"


const NuevaPasswordPage = () =>{
    const {token} =useParams()
    const [password,setPassword] = useState("")
    const [confirmarPassword,setConfirmarPassword] = useState("")
    const [alerta,setAlerta] = useState({mensaje:"",error:false})

    const enviarDatos =async(e) => {
      e.preventDefault()

      if(password === "" && confirmarPassword === ""){
        console.log("Todos los campos son obligatorios")
        setAlerta({
          mensaje:"Todos los campos son obligatorios",
          error:true
        })
        return
      }

      if(password !== confirmarPassword){
        console.log("Las contraseñas no coinciden")
        setAlerta({
          mensaje:"Las contraseñas no coinciden",
          error:true
        })
        return
      }
      try {
        const resp = await nuevaPasswordRequest(token,{password})
        setAlerta({
          mensaje:resp.data.mensaje,
          error:false
        })
      } catch (error) {
        console.log(error)
        setAlerta({
          mensaje:error.response.data.mensaje,
          error:true
        })
      }
      
    } 

    return(
        <>
  
        <main className="bg-cyan-700 h-full md:h-screen md:flex md:justify-around md:items-center p-5">

          <h1 className="w-full text-center text-6xl md:w-2/5 text-white">Recupera tu cuenta y no pierdas <span className="text-cyan-300">la administración de tus <span className="text-cyan-300">pacientes</span></span></h1>
          
          <div className="bg-emerald-50 p-5 rounded-3xl w-full mt-10 md:w-2/5">
            <form  onSubmit={e=>enviarDatos(e)}>
              {alerta.mensaje !== "" && <Alerta alerta={alerta}/>}
              <label className="block mb-2 text-xl" >Nueva contraseña</label>
              <input className="block w-full mb-4 p-2 rounded-xl"  type="password" placeholder="Ingresa tu nueva contraseña" value={password} onChange={(e)=>setPassword(e.target.value)}/>

              <label className="block mb-2 text-xl" >Confirmar contraseña</label>
              <input className="block w-full mb-4 p-2 rounded-xl"  type="password" placeholder="Confirma tu nueva contraseña" value={confirmarPassword} onChange={(e)=>setConfirmarPassword(e.target.value)}/>

              <button className="block mt-10 text-center w-full bg-cyan-900 text-white text-2xl p-3 rounded-3xl mb-2">Guardar cambios</button>
              
              {(!alerta.error && alerta.mensaje !== "") && <Link to="/login" className="underline text-blue-700 text-center">Iniciar sesión</Link>}
            
            </form>
          </div>


        </main>
      
      </>
    )
}

export default NuevaPasswordPage