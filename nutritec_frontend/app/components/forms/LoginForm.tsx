"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, LucideApple } from "lucide-react";
import Image from "next/image";
import frutasLogin from "@/app/assets/images/tazon_frutas.png";
import { loginUser } from "@/app/utils/api";
import { useRouter, useSearchParams } from "next/navigation";
import ErrorAlert from "@/app/components/forms/ErrorAlert";
import { useAuth } from "@/app/auth/authContext";

export default function LoginForm() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null); // Para errores de inicio de sesión
    const [verificationSuccess, setVerificationSuccess] = useState<string | null>(null); // Para mensaje de éxito de verificación
    const router = useRouter();
    const searchParams = useSearchParams();
    const isVerified = searchParams.get('verified');
    const { setToken } = useAuth(); // Obtén la función setToken del contexto

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setLoginError(null); // Limpiar error al escribir
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setLoginError(null);
        setVerificationSuccess(null);

        try {
            const response = await loginUser(form);
            // alert("Inicio de sesión exitoso") // Puedes quitar este alert
            const { token } = response; // ¡Aquí obtenemos el token de la respuesta!
            setToken(token); // ¡Guardamos el token en el contexto!
            router.push("/dashboard");
        } catch (err: any) {
            // Manejamos los diferentes mensajes de error del backend
            if (err.message === 'Credenciales incorrectas o cuenta no verificada') {
                setLoginError('Credenciales incorrectas. Verifica tu correo electrónico y asegúrate de que tu cuenta esté activada.');
            } else if (err.message === 'Credenciales incorrectas') {
                setLoginError('Las credenciales que has introducido son incorrectas.');
            } else if (err.message === 'Cuenta no encontrada') {
                setLoginError('No existe una cuenta con este correo electrónico.');
            } else if (err.message === 'Cuenta no verificada') {
                setLoginError('Tu cuenta aún no ha sido verificada. Revisa tu correo electrónico para activarla.');
            } else {
                setLoginError(err.message || "Error al iniciar sesión. Intenta de nuevo.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Efecto para mostrar el mensaje de éxito de verificación
    useEffect(() => {
        if (isVerified === 'true') {
            setVerificationSuccess('Tu cuenta ha sido activada exitosamente. ¡Ahora puedes iniciar sesión!');
        } else {
            setVerificationSuccess(null);
        }
    }, [isVerified]);

    return (
        <div className="flex flex-col md:flex-row items-center bg-white rounded-3xl shadow-xl overflow-hidden max-w-4xl w-full">
            {/* Formulario - Izquierda */}
            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full md:w-1/2 p-8"
            >
                <div className="flex justify-center md:hidden mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                        <LucideApple size={32} className="text-white" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar sesión</h2>

                {/* Mostrar mensaje de éxito de verificación */}
                {verificationSuccess && <ErrorAlert successMessage={verificationSuccess} message={""} />}

                {/* Mostrar errores de inicio de sesión */}
                {loginError && <ErrorAlert message={loginError} />}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-emerald-500" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Correo electrónico"
                            className="w-full pl-10 pr-3 py-3 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-800 font-semibold"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-emerald-500" />
                        </div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            className="w-full pl-10 pr-3 py-3 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-800 font-semibold"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center"
                    >
                        {isLoading ? (
                            <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        ) : (
                            <>
                                <LogIn className="mr-2" size={20} /> Iniciar sesión
                            </>
                        )}
                    </motion.button>

                    <p className="text-center text-sm text-gray-600 mt-6">
                        ¿No tienes una cuenta?{" "}
                        <a href="../auth/register" className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
                            Regístrate
                        </a>
                    </p>
                    
                    <p className="text-center text-sm text-gray-600 mt-4">
                    <a 
                        href="/auth/forgot-password" 
                        className="text-emerald-600 font-medium hover:text-emerald-700"
                    >
                        ¿Olvidaste tu contraseña?
                    </a>
                    </p>
                </form>
            </motion.div>

            {/* Imagen - Derecha */}
            <div className="hidden md:block w-1/2 bg-gradient-to-br from-emerald-50 to-teal-100 p-8 h-full relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-100 opacity-90"></div>
                <div className="relative z-10 h-full flex flex-col items-center justify-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-6"
                    >
                        <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                            <LucideApple size={48} className="text-white" />
                        </div>
                    </motion.div>
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-3xl font-bold text-emerald-800 mb-4 text-center"
                    >
                        NutriTec
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-emerald-700 text-center max-w-xs"
                    >
                        Tu aliado para alcanzar tus objetivos nutricionales
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <Image
                            src={frutasLogin}
                            alt="Comida saludable"
                            width={300}
                            height={300}
                            className="mt-8 rounded-lg"
                            style={{ objectFit: "cover" }}
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}