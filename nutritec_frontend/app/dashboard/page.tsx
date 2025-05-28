"use client";

import { useProtectedRoute } from "@/app/auth/useProtectedRoute";
import UserDashboard from "@/app/components/dashboard/UserDashboard";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboardLogic } from "@/app/components/dashboard/useDashboardLogic";
import { Smile, Sparkles, Lightbulb, ChevronRight } from "lucide-react";

export default function DashboardPage() {
  const { isChecking, isValidToken } = useProtectedRoute();
  
  // Se usa "Usuario" como valor predeterminado
  const {
    displayName,
    typedText,
    isTypingComplete,
    typingRef,
    sections,
    loading
  } = useDashboardLogic("Usuario");

  const isLoading = isChecking || loading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 border-4 border-emerald-200 border-t-emerald-500 dark:border-emerald-800 dark:border-t-emerald-400 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 text-xl font-medium">Cargando datos del usuario...</p>
        </div>
      </div>
    );
  }

  if (isValidToken === false) {
    return null;
  }

  return (
    <UserDashboard>
      <div className="space-y-10 pb-16 px-4 sm:px-6 md:px-10 pt-8">
        {/* Mensaje de bienvenida con efecto de escritura */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 border-2 border-emerald-100 dark:border-gray-700"
        >
          <div className="flex flex-col sm:flex-row items-start sm:space-x-6">
            <div className="bg-gradient-to-br from-emerald-400 to-teal-500 dark:from-emerald-500 dark:to-teal-600 rounded-2xl p-4 flex-shrink-0 shadow-md mb-4 sm:mb-0">
              <Smile className="h-10 w-10 text-white" />
            </div>
            <div className="flex-1 w-full">
              <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400 mb-4 flex items-center">
                Bienvenido a NutriTec, {displayName}
                <Sparkles className="ml-2 h-6 w-6 text-amber-400 dark:text-amber-300" />
              </h2>
              <div
                ref={typingRef}
                className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg bg-gradient-to-r from-emerald-50 to-transparent dark:from-gray-700 dark:to-transparent p-4 rounded-xl w-full typing-container"
              >
                {typedText}
                <span className="inline-block w-0.5 h-6 bg-emerald-500 dark:bg-emerald-400 ml-0.5 animate-pulse"></span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Secciones */}
        <AnimatePresence>
          {isTypingComplete && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-8"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 p-3 rounded-xl shadow-md">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200">Explora NutriTec</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {sections.map((section, index) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 border-2 border-gray-100 dark:border-gray-700"
                  >
                    <div className={`h-3 bg-gradient-to-r ${section.gradient} dark:${section.darkGradient}`}></div>
                    <div className="p-5 sm:p-7">
                      <div className="flex items-center mb-5">
                        <div
                          className={`bg-gradient-to-br ${section.gradient} dark:${section.darkGradient} p-3 rounded-xl shadow-md mr-4 sm:mr-5`}
                        >
                          <section.icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                        </div>
                        <h3 className="font-bold text-lg sm:text-xl text-gray-800 dark:text-gray-200 flex items-center">
                          {section.title}
                          <span className="ml-2 text-xl sm:text-2xl" role="img" aria-label={section.title}>
                            {section.emoji}
                          </span>
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg mb-5 leading-relaxed">
                        {section.description}
                      </p>

                      {section.subSections.length > 0 && (
                        <div className="mt-5 space-y-4 pl-4 sm:pl-5 border-l-3 border-gray-200 dark:border-gray-600">
                          {section.subSections.map((subSection) => (
                            <div key={subSection.title} className="group">
                              <div className="flex items-center">
                                <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors" />
                                <div className="flex items-center">
                                  <subSection.icon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors" />
                                  <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center">
                                    {subSection.title}
                                    <span className="ml-2 text-lg" role="img" aria-label={subSection.title}>
                                      {subSection.emoji}
                                    </span>
                                  </span>
                                </div>
                              </div>
                              <p className="text-gray-500 dark:text-gray-400 mt-1 ml-12">{subSection.description}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-6 flex justify-center sm:justify-end">
                        <button
                          className={`bg-gradient-to-r ${section.gradient} dark:${section.darkGradient} text-white px-4 sm:px-5 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center font-medium w-full sm:w-auto explore-button`}
                        >
                          <span>Explorar</span>
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </UserDashboard>
  );
}
