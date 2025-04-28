const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function sendVerificationEmail(to, token) {
    const verificationLink = `http://localhost:3001/api/auth/verify?token=${token}`;

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject: 'Activa tu cuenta en Nutritec',
        html: `
            <h2>¡Bienvenido a Nutritec!</h2>
            <p>Haz clic en el siguiente enlace para activar tu cuenta:</p>
            <p><a href="${verificationLink}" style="display: inline-block; background-color: #007bff; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Dale clic aquí</a></p>
            <p>Si el botón de arriba no funciona, puedes copiar y pegar el siguiente enlace en tu navegador:</p>
            <p><a href="${verificationLink}">${verificationLink}</a></p>
        `,
    });
}

module.exports = { sendVerificationEmail };