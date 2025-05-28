"use client";
import { useState } from "react";
import { requestPasswordReset } from "@/app/utils/api";
import { Mail, CheckCircle } from "lucide-react";
import ErrorAlert from "./ErrorAlert";
import { motion } from "framer-motion";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitted) return;

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Ingresa un correo electrónico válido");
      return;
    }

    setIsLoading(true);
    setIsSubmitted(true);
    setError("");
    setSuccessMessage("");

    try {
      await requestPasswordReset(email);
      setSuccessMessage("¡Correo enviado! Revisa tu bandeja de entrada.");
      setEmail("");
    } catch (err: any) {
      setError(
        err.message.includes("<!DOCTYPE html>")
          ? "Error del servidor. Contacta al soporte."
          : err.message || "Error al procesar la solicitud"
      );
    } finally {
      setIsSubmitted(false);
      setIsLoading(false);
    }
  };

  if (successMessage) {
    return (
      <div className="text-center p-8">
        <CheckCircle className="mx-auto h-12 w-12 text-emerald-500 mb-4" />
        <p className="text-lg font-semibold">{successMessage}</p>
        <a
          href="/auth/login"
          className="text-emerald-600 mt-4 inline-block hover:text-emerald-700"
        >
          Volver a inicio de sesión
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center bg-white rounded-3xl shadow-xl overflow-hidden max-w-4xl w-full">
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Recuperar contraseña
        </h2>

        <ErrorAlert 
          message={error} 
          successMessage={successMessage}
          aria-live="assertive"
        />

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-emerald-500" />
            </div>
            <input
              type="email"
              placeholder="Correo electrónico registrado"
              className="w-full pl-10 pr-3 py-3 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-800 font-semibold"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
            aria-disabled={isLoading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all duration-300"
          >
            {isLoading ? "Enviando..." : "Enviar enlace"}
          </motion.button>

          <p className="text-center text-sm text-gray-600 mt-6">
            ¿Recordaste tu contraseña?{" "}
            <a
              href="/auth/login"
              className="text-emerald-600 font-medium hover:text-emerald-700"
            >
              Inicia sesión
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  );
}