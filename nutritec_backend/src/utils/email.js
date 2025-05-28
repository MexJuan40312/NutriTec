// backend/utils/email.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10), // Asegúrate de que el puerto sea un número
    secure: process.env.EMAIL_PORT === '465', // true para 465 (SSL/TLS), false para otros (STARTTLS)
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    // Añadir opciones TLS si usas Mailtrap o un SMTP que lo requiera y tienes problemas
    tls: {
      rejectUnauthorized: false // Importante para entornos de desarrollo como Mailtrap o si usas certificados auto-firmados
    }
});

async function sendVerificationEmail(to, token) {
    // Si BACKEND_PUBLIC_URL no está definida (ej. en desarrollo local), usará localhost:3001
    const backendBaseUrl = process.env.BACKEND_PUBLIC_URL || `http://localhost:${process.env.PORT || 3001}`;
    const verificationLink = `${backendBaseUrl}/api/auth/verify?token=${token}`; // Añade /api porque tus rutas están bajo ese prefijo

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject: 'Activa tu cuenta en NutriTec',
        html: `
            <h2>¡Bienvenido a NutriTec!</h2>
            <p>Haz clic en el siguiente enlace para activar tu cuenta:</p>
            <p><a href="${verificationLink}" style="display: inline-block; background-color: #007bff; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Dale clic aquí</a></p>
            <p>Si el botón de arriba no funciona, puedes copiar y pegar el siguiente enlace en tu navegador:</p>
            <p><a href="${verificationLink}">${verificationLink}</a></p>
        `,
    });
}

async function sendPasswordResetEmail(to, token) {
    // Si FRONTEND_PUBLIC_URL no está definida (ej. en desarrollo local), usará localhost:3000
    const frontendBaseUrl = process.env.FRONTEND_PUBLIC_URL || 'http://localhost:3000';
    const resetLink = `${frontendBaseUrl}/auth/reset-password?token=${token}`;

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject: 'Restablece tu contraseña de NutriTec',
        html: `
            <h2>Restablecer contraseña</h2>
            <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta NutriTec.</p>
            <p>Haz clic en el siguiente enlace para establecer una nueva contraseña:</p>
            <p><a href="${resetLink}" style="display: inline-block; background-color: #007bff; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Restablecer contraseña</a></p>
            <p>Este enlace expirará en 1 hora.</p>
            <p>Si el botón de arriba no funciona, puedes copiar y pegar el siguiente enlace en tu navegador:</p>
            <p><a href="${resetLink}">${resetLink}</a></p>
        `,
    });
}

module.exports = { sendVerificationEmail, sendPasswordResetEmail };