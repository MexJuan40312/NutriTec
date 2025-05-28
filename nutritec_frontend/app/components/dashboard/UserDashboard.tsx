"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/app/auth/authContext"
import { useProtectedRoute } from "@/app/auth/useProtectedRoute"
import { getProfile } from "@/app/utils/api"
import Navbar from "./Navbar"

interface UserDashboardProps {
  children?: React.ReactNode
}

const UserDashboard = ({ children }: UserDashboardProps) => {
  useProtectedRoute()
  const { token, user } = useAuth()
  const [profileData, setProfileData] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        setLoading(true)
        setError(null)
        try {
          const data = await getProfile(token)
          setProfileData(data)
        } catch (err: any) {
          setError(err.message)
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [token])

  const userName = profileData?.name || user?.name || user?.email?.split("@")[0] || "Usuario"
  const userEmail = profileData?.email || user?.email || ""

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-lg">Cargando datos del usuario...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-md p-6 max-w-md w-full">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4 mx-auto">
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">Error al cargar datos</h2>
          <p className="text-gray-600 text-center mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
          >
            Intentar nuevamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <Navbar userName={userName} userEmail={userEmail} userDisplayName={userName}>
      {children}
    </Navbar>
  )
}

export default UserDashboard
