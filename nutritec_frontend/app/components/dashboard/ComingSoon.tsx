"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Construction } from "lucide-react";
import { useProtectedRoute } from "@/app/auth/useProtectedRoute";

export default function ComingSoon() {
  const { isChecking, isValidToken } = useProtectedRoute();

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-lg text-gray-500 dark:text-gray-300">
          Verificando sesión...
        </div>
      </div>
    );
  }

  if (isValidToken === false) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 p-4 mb-6">
            <Construction className="h-12 w-12 text-white" />
          </div>

          <motion.h2
            className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-gray-100"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            PROXIMAMENTE!
          </motion.h2>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Estamos trabajando en la construcción de esta sección.
          </p>

          <div className="mt-8">
            <Link
              href="/dashboard"
              className="group inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300"
            >
              <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              Volver al inicio
            </Link>
          </div>
        </div>

        <motion.div
          className="mt-12 text-center text-gray-400 dark:text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p>¿Tienes sugerencias para esta sección?</p>
          <p className="mt-1">Contáctanos en soporte@nutritec.com</p>
        </motion.div>
      </motion.div>
    </div>
  );
}