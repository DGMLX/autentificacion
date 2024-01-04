import {Navigate, Route, Routes} from "react-router-dom"
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AdminPage from "../pages/AdminPage";
import RecuperarPassword from "../pages/RecuperarPassword";
import ConfirmarCuenta from "../pages/ConfirmarCuenta";
import ComprobarPeticionPassword from "../pages/ComprobarPeticionPassword";
import NuevaPasswordPage from "../pages/NuevaPaswordPage";

const AppRouter = () =>{
    return(
        <>
            <Routes>
                {/*RUTAS PUBLICAS*/}
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/registro" element={<RegisterPage/>}/>
                <Route path="/recuperarPassword" element={<RecuperarPassword/>}/> 
                <Route path="/comprobarPassword/:token" element={<ComprobarPeticionPassword/>}/>
                <Route path="/nuevaPassword/:token" element={<NuevaPasswordPage/>}/>
                <Route path="/confirmarCuenta/:token" element={<ConfirmarCuenta/>}/>
                <Route path="/*" element={<Navigate to="/login"/>}/>
                {/*RUTAS PRIVADAS*/}
                <Route path="/admin" element={<AdminPage/>}/>

            </Routes>
        
        </>
    )
}

export default AppRouter;