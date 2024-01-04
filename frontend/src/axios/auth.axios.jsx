import axios from "axios"


export const registrarUsuarioRequest = async(user) => await axios.post("http://localhost:4000/registro",user)

export const loginUsuarioRequest = async(user) => await axios.post("http://localhost:4000/login",user)

export const confirmarCuentaRequest = async(token) => await axios.get(`http://localhost:4000/confirmar/${token}`)

export const recuperarPasswordRequest = async(email)=> await axios.post("http://localhost:4000/recuperarPassword",email)

export const comprobarPeticionPasswordRequest = async(token)=> await axios.post(`http://localhost:4000/recuperarPassword/${token}`)

export const nuevaPasswordRequest = async(token,datos) => await axios.post(`http://localhost:4000/recuperarPassword/${token}`,datos)