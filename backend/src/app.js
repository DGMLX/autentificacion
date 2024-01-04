import express from "express"
import dotenv from "dotenv"
import routerAuth from "./routes/auth.routes.js"
import routerPaciente from "./routes/paciente.routes.js"
import morgan from "morgan"
import cors from "cors"

dotenv.config()

const app = express();

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())
app.use(routerAuth)
app.use(routerPaciente)



export default app