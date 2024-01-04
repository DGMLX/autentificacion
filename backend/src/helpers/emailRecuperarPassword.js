import nodemailer from "nodemailer"

const emailRecuperarPassword = async (datos) =>{
    const {email,nombre,token} = datos

    const transport = nodemailer.createTransport({
        host: process.env.HOST_EMAIL,
        port: process.env.PORT_EMAIL,
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.PASS_EMAIL
        }
      });

    const info = await transport.sendMail({
        from:"APV - Administrador de pacientes",
        to:email,
        subject:"Recuperar Contraseña",
        text:"Recuperar Contraseña",
        html:`
            <p> Hola ${nombre} recupera tu contraseña </p>
            <p> Visita el siguiente enlace y reestable una contraseña nueva
            <a href="${process.env.FRONTEND_URL}/comprobarPassword/${token}">Recuperar contraseña </a> </p>

            <p>Si no solicitaste un cambio de contraseña, porfavor ignorar este correo </p>
         `
    })

}

export default emailRecuperarPassword