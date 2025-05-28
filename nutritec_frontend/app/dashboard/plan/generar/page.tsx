"use client"

import { useProtectedRoute } from "@/app/auth/useProtectedRoute"
import UserDashboard from "@/app/components/dashboard/UserDashboard"
import PlanGenerator from "@/app/components/plan/PlanGenerator"
import { useAuth } from "@/app/auth/authContext"

export default function GenerarPlanPage() {
  const { isChecking, isValidToken } = useProtectedRoute()
  const { user } = useAuth()

  // Obtener el nombre del usuario
  const userName = user?.name || user?.email?.split("@")[0] || "Usuario"

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
        <PlanGenerator userName={userName} />
      </div>
    </UserDashboard>
  )
}
