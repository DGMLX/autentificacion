import { useState } from "react"
import {Link, useNavigate} from "react-router-dom"
import Alerta from "../components/Alerta"
import { loginUsuarioRequest } from "../axios/auth.axios"

const LoginPage = () =>{

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [alerta,setAlerta] = useState({mensaje:"",error:false})

  const navigate = useNavigate()

  const enviarDatos = async(e) =>{
    e.preventDefault()

    if(email=== "" || password === ""){
      setAlerta({
        mensaje:"Todos los datos son obligatorios",
        error:true
      })
      return
    }

    const usuarioLogueado = {
      email,
      password
    }

    try {
      await loginUsuarioRequest(usuarioLogueado)
      console.log(`Usuario logueado correctamente`)
      setAlerta({})
      navigate("/admin")
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

          <h1 className="w-full text-center text-6xl md:w-2/5 text-white">Ingresa a tu cuenta y <span className="text-cyan-300">administra a tus <span className="text-cyan-300">pacientes</span></span></h1>
          
          <div className="bg-emerald-50 p-5 rounded-3xl w-full mt-10 md:w-2/5">
            <form onSubmit={e=>enviarDatos(e)}>
              {alerta.mensaje !== "" && <Alerta alerta={alerta}/>}
              <label className="block mb-2 text-xl" >Email</label>
              <input className="block w-full mb-4 p-2 rounded-xl" value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="example@hotmail.com"/>

              <label className="block mb-2 text-xl" >Contraseña</label>
              <input className="block w-full mb-4 p-2 rounded-xl" value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Ingresa tu contraseña"/>

              <button className="block mt-10 text-center w-full bg-cyan-900 text-white text-2xl p-3 rounded-3xl">Ingresar</button>

              <div className="mt-3 md:flex md:justify-between">
                <Link to="/registro" className="block mb-2 text-indigo-700 underline">Crear una cuenta</Link>
                <Link to="/recuperarPassword" className="text-indigo-700 underline">Recuperar contraseña</Link>
              </div>
              


            </form>
          </div>


        </main>
      
      </>
    )
  }
  
  
  export default LoginPage