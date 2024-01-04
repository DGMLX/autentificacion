import nodemailer from "nodemailer"

const emailRegistro =async (datos) =>{
    const{nombre,email,token} = datos

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
        subject:"Comprueba tu cuenta APV",
        text:"Comprueba tu cuenta APV",
        html:` <p>Hola ${nombre} comprueba tu cuenta APV <p>
            <p>Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace:
            <a href="${process.env.FRONTEND_URL}/confirmarCuenta/${token}"> Confirmar cuenta </a>

            <p>Si no eres el propietario de esta email, ignora este mensaje</p>
        `
    })

}

export default emailRegistro