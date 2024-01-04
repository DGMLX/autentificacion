import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { comprobarPeticionPasswordRequest } from "../axios/auth.axios"


const ComprobarPeticionPassword = () =>{
    const {token} = useParams()

    useEffect(()=>{
      async function comprobarToken(){
        try{
          const resp = await comprobarPeticionPasswordRequest(token)
          console.log(resp)
        }catch(error){
          console.log(error)
        }
      }
      comprobarToken()
    },[])
    
    return(
        <>
  
        <main className="bg-cyan-700 h-full md:h-screen md:flex md:justify-around md:items-center p-5">

          <h1 className="w-full text-center text-6xl md:w-2/5 text-white">Recupera tu cuenta y no pierdas <span className="text-cyan-300">la administración de tus <span className="text-cyan-300">pacientes</span></span></h1>
          
          <div className="bg-emerald-50 p-5 rounded-3xl w-full mt-10 md:w-2/5">
            <form>
              <label className="block mb-2 text-xl" >Comprobación exitosa.</label>
              <Link to={`/nuevaPassword/${token}`} className="underline text-blue-700">Crear nueva contraseña</Link>


            </form>
          </div>


        </main>
      
      </>
    )
}

export default ComprobarPeticionPassword