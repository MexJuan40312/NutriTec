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
  const verificationLink = `http://localhost:3000/verify?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: 'Activa tu cuenta en Nutritec',
    html: `
      <h2>¡Bienvenido a Nutritec!</h2>
      <p>Haz clic en el siguiente enlace para activar tu cuenta:</p>
      <a href="${verificationLink}">${verificationLink}</a>
    `,
  });
}

module.exports = { sendVerificationEmail };
