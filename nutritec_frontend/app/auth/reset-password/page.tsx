"use client";

import { useState } from "react";
import { resetPassword } from "@/app/utils/api";
import { Lock, CheckCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import ErrorAlert from "@/app/components/forms/ErrorAlert";
import { useRouter } from "next/navigation"; 

export const dynamic = 'force-dynamic';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Obtener token de la URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Nuevo estado para confirmar contraseña
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordResetSuccessful, setPasswordResetSuccessful] = useState(false); // Nuevo estado para controlar la vista
  const router = useRouter(); // Inicializar useRouter

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos

    if (!token) {
      setError("Token inválido o faltante");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      await resetPassword({ token, newPassword });
      setSuccessMessage("¡Contraseña actualizada! Ahora puedes iniciar sesión.");
      setNewPassword("");
      setConfirmPassword(""); // Limpiar campo de confirmación
      setPasswordResetSuccessful(true); // Cambiar el estado para mostrar el mensaje de éxito y el botón de inicio de sesión
    } catch (err: any) {
      setError(err.message || "Error al actualizar la contraseña");
    }
  };

  const handleLoginRedirect = () => {
    router.push("/auth/login"); // Redirigir a la página de login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {passwordResetSuccessful ? "¡Contraseña actualizada!" : "Nueva contraseña"}
        </h2>

        <ErrorAlert message={error} successMessage={successMessage} />

        {passwordResetSuccessful ? (
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
            <p className="text-gray-700 mb-6">
              Tu contraseña ha sido actualizada exitosamente.
            </p>
            <button
              onClick={handleLoginRedirect}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all duration-300"
            >
              Iniciar sesión
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-emerald-500" />
              </div>
              <input
                type="password"
                placeholder="Nueva contraseña"
                className="w-full pl-10 pr-3 py-3 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-800 font-semibold"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            {/* Campo de Confirmar Contraseña */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-emerald-500" />
              </div>
              <input
                type="password"
                placeholder="Repetir contraseña"
                className="w-full pl-10 pr-3 py-3 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-800 font-semibold"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all duration-300"
            >
              Actualizar contraseña
            </button>
          </form>
        )}
      </div>
    </div>
  );
}