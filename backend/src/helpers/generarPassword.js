import bcrypt from "bcrypt"

const generarPassword = async (password) =>{
    const passwordHash = await bcrypt.hash(password,10)
    return passwordHash
}

export default generarPassword