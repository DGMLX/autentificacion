

const Alerta = ({alerta}) =>{
    return(
        <div className={`${alerta.error ? " bg-red-400" : " bg-green-400 " } text-white text-center font-bold p-2 rounded-2xl mb-2`}>
            <p>{alerta.mensaje}</p>
        </div>
    )
}
export default Alerta