import { useState } from "react"
import Alerta from "../components/Alerta"
import { recuperarPasswordRequest } from "../axios/auth.axios"


const RecuperarPassword = () =>{

    const [email,setEmail] = useState("")
    const [alerta,setAlerta] = useState({mensaje:"",error:true})

    const enviarDatos =async e =>{
        e.preventDefault()
        if(email===""){
            setAlerta({
                mensaje:"Todos los campos son obligatorios",
                error:true
            })
            return
        }
        const emailBody = {email}
    
        try {
          const resp = await recuperarPasswordRequest(emailBody)
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
              <form onSubmit={e=>enviarDatos(e)}>
                {alerta.mensaje !== "" && <Alerta alerta={alerta}/>}
                <label className="block mb-2 text-xl" >Email</label>
                <input className="block w-full mb-4 p-2 rounded-xl" value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="example@hotmail.com"/>
  
                <button className="block mt-10 text-center w-full bg-cyan-900 text-white text-2xl p-3 rounded-3xl mb-2">Recuperar contraseña</button>
  
              </form>
            </div>
  
  
          </main>
        
        </>
      )
}

export default RecuperarPassword