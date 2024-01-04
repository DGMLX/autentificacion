import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { confirmarCuentaRequest } from "../axios/auth.axios"
import Alerta from "../components/Alerta"


const ConfirmarCuenta = () =>{

    const {token} = useParams()
    const [alerta,setAlerta] = useState({})



    useEffect(()=>{
        async function confirmandoCuenta(){
            try {
                const {data} = await confirmarCuentaRequest(token)
                setAlerta({
                    mensaje:data.mensaje,
                    error:false
                })
            
            }catch (error) {
                setAlerta({
                    mensaje:error.response.data.mensaje,
                    error:true
                })
            }
        }
        confirmandoCuenta()
    },[])

    return(
        <main className="bg-cyan-700 h-full md:h-screen md:flex md:justify-around md:items-center p-5">
  
            <h1 className="w-full text-center text-6xl md:w-2/5 text-white">Confirma tu cuenta y comienza a <span className="text-cyan-300">administrar tus <span className="text-cyan-300">pacientes</span></span></h1>
            
            <div className="bg-emerald-50 p-5 rounded-3xl w-full mt-10 md:w-2/5 flex justify-between">
              <Alerta alerta ={alerta}/>
              {!alerta.error && <Link to="/Login" className="underline text-blue-500">Iniciar sesion</Link>}
            </div>
  
  
          </main>
    )
}

export default ConfirmarCuenta