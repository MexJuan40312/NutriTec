// app/auth/login/page.tsx
"use client";

import LoginForm from "@/app/components/forms/LoginForm";
import { Suspense } from 'react'; // ¡Importa Suspense!

export const dynamic = 'force-dynamic'; // Mantén esta línea

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4">
      {/* Envuelve LoginForm en Suspense */}
      <Suspense fallback={<p>Cargando formulario de inicio de sesión...</p>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}