import { useState } from "react"
import {Link} from "react-router-dom"
import Alerta from "../components/Alerta"
import { registrarUsuarioRequest } from "../axios/auth.axios"

const RegisterPage =() =>{

  const [nombre,setNombre] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confirmarPassword,setConfirmarPassword] = useState("")
  const [alerta,setAlerta] = useState({mensaje:"",error:true})

  const enviarDatos = async(e) =>{
    e.preventDefault()

    if(nombre === "" || email === "" || password === "" || confirmarPassword === "") {
      console.log("Todos los datos son obligatorios")
      setAlerta({
        mensaje:"Todos los datos son obligatorios",
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
    

    const nuevoUsuario = {
      nombre,
      email,
      password,
      token:null,
      confirmado:false
    }
    try {
      await registrarUsuarioRequest(nuevoUsuario)

      setAlerta({
        mensaje:"Usuario registrado, porfavor confirma tu registro",
        error:false
      })

      setNombre("")
      setEmail("")
      setPassword("")
      setConfirmarPassword("")
  
      
    } catch (error) {
      setAlerta({
        mensaje:error.response.data.mensaje,
        error:true
      })
      return
    }

   
  }

    return(
      <>
        <main className="bg-cyan-700 h-full md:h-screen md:flex md:justify-around md:items-center p-5">

          <h1 className="w-full text-center text-6xl md:w-2/5 text-white">Registrate y <span className="text-cyan-300">administra a tus <span className="text-cyan-300 font-bold">pacientes</span></span></h1>
          
          <div className="bg-emerald-50 p-5 border-gray-100  rounded-3xl w-full mt-10 md:w-2/5">
            <form onSubmit={e=>enviarDatos(e)}>
              {alerta.mensaje !== "" && <Alerta alerta={alerta}/>} 
         
              <label className="block mb-2 text-xl">Nombre</label>
              <input className="block w-full mb-4 p-2 rounded-xl" type="text" value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Ingresa tu nombre"/>

              <label className="block mb-2 text-xl" >Email</label>
              <input className="block w-full mb-4 p-2 rounded-xl" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="example@hotmail.com"/>

              <label className="block mb-2 text-xl" >Contraseña</label>
              <input className="block w-full mb-4 p-2 rounded-xl" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Ingresa tu contraseña"/>

              <label className="block mb-2 text-xl">Confirmar contraseña</label>
              <input className="block w-full mb-4 p-2 rounded-xl" type="password" value={confirmarPassword} onChange={e=>setConfirmarPassword(e.target.value)} placeholder="Reingresa tu contraseña"/>

              <button className="block mt-10 text-center w-full bg-cyan-900 text-white text-2xl p-3 font-bold rounded-3xl">Registrarse</button>
              
                <Link to="/login" className="block mb-2 mt-3">¿Ya posees una cuenta? <span className="text-indigo-700 underline">Iniciar sesión</span></Link>

            </form>
          </div>


        </main>
      
      </>
    )
  }
  
  
  export default RegisterPage