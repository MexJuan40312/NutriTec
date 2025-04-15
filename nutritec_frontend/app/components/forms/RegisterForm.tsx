"use client"

import type React from "react"

import { useState } from "react"
import { registerUser } from "@/app/utils/api"
import { motion } from "framer-motion"
import { LucideApple, User, Mail, Lock, CheckCircle } from "lucide-react"
import Image from "next/image"
import frutasRegister from "@/app/assets/images/icon_reg.png" // Importa la imagen

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (form.password !== form.confirmPassword) {
      alert("Las contraseñas no coinciden")
      setIsLoading(false)
      return
    }

    try {
      const { name, email, password } = form
      const response = await registerUser({ name, email, password })
      alert("Revisa tu correo para activar la cuenta.")
    } catch (err: any) {
      alert(err.message || "Error en el registro")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-center bg-white rounded-3xl shadow-xl overflow-hidden max-w-4xl w-full">
      {/* Lado izquierdo - Imagen decorativa */}
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
            Tu asistente nutricional inteligente para una vida más saludable
          </motion.p>
          <motion.div // Envuelve el componente Image con motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Image
              src={frutasRegister}
              alt="Nutrición saludable"
              width={300}
              height={300}
              className="mt-8 rounded-lg"
              style={{ objectFit: 'cover' }}
            />
          </motion.div>
        </div>
      </div>

      {/* Lado derecho - Formulario */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 p-8"
      >
        <div className="flex justify-center md:hidden mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
            <LucideApple size={32} className="text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Crear cuenta</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-emerald-500" />
            </div>
            <input
              type="text"
              name="name"
              placeholder="Escribe tu nombre"
              className="w-full pl-10 pr-3 py-3 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all duration-200 outline-none text-gray-800 font-semibold"
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-emerald-500" />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Escribe tu correo"
              className="w-full pl-10 pr-3 py-3 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all duration-200 outline-none text-gray-800 font-semibold **caret-black**"
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
              placeholder="Escribe tu contraseña"
              className="w-full pl-10 pr-3 py-3 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all duration-200 outline-none text-gray-800 font-semibold **caret-black**"
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
            </div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Repite tu contraseña"
              className="w-full pl-10 pr-3 py-3 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all duration-200 outline-none text-gray-800 font-semibold **caret-black**"
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
              "Crear cuenta"
            )}
          </motion.button>

          <p className="text-center text-sm text-gray-600 mt-6">
            ¿Ya tienes cuenta?{" "}
            <a href="/login" className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
              Inicia sesión
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  )
}