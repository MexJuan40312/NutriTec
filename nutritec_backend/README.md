# 🥦 NutriTec - Plataforma de planes nutricionales inteligentes

NutriTec es una aplicación web moderna que permite a los usuarios registrarse, crear un perfil nutricional detallado y generar planes personalizados utilizando inteligencia artificial. Está diseñada con un enfoque en la escalabilidad, seguridad y usabilidad.

---

## 📌 Tecnologías utilizadas

### 🖥️ Frontend
- **Next.js + React + TypeScript** – Framework moderno para apps web.
- **TailwindCSS** – Utilidad de estilos rápida y responsive.
- **Context API** – Para manejar la autenticación global.
- **Fetch API** – Para comunicación con el backend.

### 🌐 Backend
- **Node.js + Express.js** – API REST modular y eficiente.
- **MySQL** – Base de datos relacional con estructura normalizada.
- **JWT (JSON Web Tokens)** – Para autenticación segura de sesiones.
- **bcryptjs** – Para hashear contraseñas.
- **Nodemailer + Mailtrap** – Para enviar correos de verificación.

---

## 🔐 Conexión con el repositorio de datos

### ✅ Tipo de repositorio
- **MySQL** como base de datos relacional.

### 🔗 Protocolo y tecnologías
- Conexión establecida mediante `mysql2/promise`, usando consultas preparadas para evitar inyecciones SQL.

### 🛡️ Configuración y seguridad
- Variables sensibles (como la contraseña de MySQL o JWT_SECRET) se manejan vía `.env`.
- Las contraseñas de usuario se almacenan hasheadas con `bcrypt`.
- JWT protege rutas privadas.
- Verificación por correo antes de activar cuentas.

### 🚀 Rendimiento y escalabilidad
- Arquitectura basada en controladores y middlewares en Express.
- Consultas SQL eficientes y asincrónicas con `await`.
- Estructura modular para fácil mantenimiento y escalado.

### 🧩 Manejo de errores y monitoreo
- Middleware para capturar errores y devolver respuestas claras.
- Validación de tokens y errores personalizados en el login/registro.
- Los errores del frontend se muestran de forma visual y estilizada.

### 🧾 Documentación y mantenibilidad
- Código dividido por capas: `routes`, `controllers`, `models`, `middlewares`.
- Componentes de React organizados por vistas.
- Buenas prácticas en nombres, estructura de carpetas y uso de TypeScript.

---

## 🚀 Funcionalidades actuales

- Registro de usuarios con validación de correo.
- Inicio de sesión seguro con JWT.
- Actualización de perfil con datos como: peso, altura, objetivos, alergias.
- Dashboard personalizado para cada usuario.
- Generación futura de planes nutricionales con IA (en desarrollo).

---

## 🔧 Instalación y ejecución

```bash
# Clonar repositorio
git clone https://github.com/tu_usuario/nutritec.git

# Instalar backend
cd nutritec_backend
npm install
cp .env.example .env
npm run dev

# Instalar frontend
cd ../nutritec_frontend
npm install
npm run dev
