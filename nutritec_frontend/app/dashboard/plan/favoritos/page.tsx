"use client"

import { useProtectedRoute } from "@/app/auth/useProtectedRoute"
import UserDashboard from "@/app/components/dashboard/UserDashboard"
import { motion } from "framer-motion"
import { Calendar, Clock, Download, Eye, FileText, Heart, Share2 } from "lucide-react"
import { useAuth } from "@/app/auth/authContext"

export default function PlanesFavoritosPage() {
  const { isChecking, isValidToken } = useProtectedRoute()
  const { user } = useAuth()

  // Obtener el nombre del usuario
  const userName = user?.name || user?.email?.split("@")[0] || "Usuario"

  // Datos de ejemplo para los planes favoritos
  const planesFavoritos = [
    {
      id: 1,
      nombre: "Plan Nutricional - Mediterráneo",
      fecha: "20/04/2025",
      objetivo: "Salud general",
      duracion: "Indefinido",
    },
  ]

  // Mientras verifica el token hace un evento de carga
  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 border-4 border-emerald-200 border-t-emerald-500 dark:border-emerald-800 dark:border-t-emerald-400 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 text-xl font-medium">Verificando sesión...</p>
          <p className="text-gray-400 dark:text-gray-500 mt-2">Preparando tu experiencia personalizada</p>
        </div>
      </div>
    )
  }

  // Valida si el Token es valido, si no el es retorna nulo, por ende al login
  if (isValidToken === false) {
    return null
  }

  return (
    <UserDashboard>
      <div className="py-8 px-4 sm:px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          {/* Encabezado */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Planes Nutricionales Favoritos</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Hola {userName}, aquí puedes ver todos los planes nutricionales que has marcado como favoritos.
            </p>
          </div>

          {/* Lista de planes */}
          <div className="space-y-4">
            {planesFavoritos.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">{plan.nombre}</h2>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>Creado: {plan.fecha}</span>
                        </div>
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 mr-1" />
                          <span>Objetivo: {plan.objetivo}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>Duración: {plan.duracion}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button className="flex items-center px-3 py-1.5 text-sm bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors">
                        <Eye className="w-4 h-4 mr-1" />
                        <span>Ver</span>
                      </button>
                      <button className="flex items-center px-3 py-1.5 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                        <Download className="w-4 h-4 mr-1" />
                        <span>Descargar</span>
                      </button>
                      <button className="flex items-center px-3 py-1.5 text-sm bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                        <Share2 className="w-4 h-4 mr-1" />
                        <span>Compartir</span>
                      </button>
                      <button className="flex items-center px-3 py-1.5 text-sm bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                        <Heart className="w-4 h-4 mr-1 fill-current" />
                        <span>Quitar favorito</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Estado vacío */}
          {planesFavoritos.length === 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">No hay planes favoritos</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Aún no has marcado ningún plan nutricional como favorito.
              </p>
              <a
                href="/dashboard/plan/generados"
                className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Ver Planes Generados
              </a>
            </div>
          )}
        </div>
      </div>
    </UserDashboard>
  )
}
