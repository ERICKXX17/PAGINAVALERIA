const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

// Configura la carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear datos JSON
app.use(bodyParser.json());

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para manejar el envío de correos
app.post('/send-email', async (req, res) => {
    const { name, phone, date, time } = req.body;

    // Configuración del transporte de Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jareddd1719@gmail.com', // Reemplaza con tu correo Gmail
            pass: 'hngu lxvm tqns kkcc' // Reemplaza con tu contraseña de aplicación de Gmail
        }
    });

    // Configuración del correo
    const mailOptions = {
        from: 'jareddd1719@gmail.com',
        to: 'psic.valeriagaribay@gmail.com', // Correo del receptor
        subject: 'Nueva solicitud de cita',
        text: `
            Nombre: ${name}
            Teléfono: ${phone}
            Día de la cita: ${date}
            Hora de la cita: ${time}
        `
    };

    try {
        // Enviar el correo
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Correo enviado exitosamente' });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ message: 'Error al enviar el correo' });
    }
});

// Configura el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
