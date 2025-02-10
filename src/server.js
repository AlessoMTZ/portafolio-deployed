const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();


const app = express();
const port = 5000; // Puerto donde correrá el backend

// Middlewares
app.use(cors({ origin: 'http://localhost:3000' })); // Reemplaza con la URL de tu frontend si está en otro dominio
 // Permitir solicitudes desde tu frontend
app.use(bodyParser.json()); // Parsear JSON en las solicitudes

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true para SSL/TLS
    auth: {
        user: process.env.GMAIL_USER, // Usa la variable de entorno para el correo
        pass: process.env.GMAIL_PASS, // Usa la variable de entorno para la contraseña
    },
    logger: true, // Habilita logs detallados (opcional)
    debug: true,  // Activa modo depuración (opcional)
});

// Endpoint para enviar correos
app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;
    console.log('Datos recibidos:', { name, email, message });

    const mailOptions = {
        from: email,
        to: process.env.GMAIL_RECIPIENT, // Usa la variable de entorno para el destinatario
        subject: `Nuevo mensaje de ${name}`,
        text: `${email}\n\n${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Correo enviado exitosamente');
    } catch (error) {
        console.error('Error al enviar correo:', error);
        res.status(500).send('Error al enviar el correo');
    }
});


// Arrancar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
