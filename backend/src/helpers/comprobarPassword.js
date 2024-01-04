import bcrypt from "bcrypt"

const comprobarPassword =async (passwordForm,passwordUser) =>{
    const existePassword = await bcrypt.compare(passwordForm,passwordUser)
    
    return existePassword
}



export default comprobarPassword