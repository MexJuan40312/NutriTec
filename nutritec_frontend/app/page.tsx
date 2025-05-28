"use client";

import inicioImage from "@/app/assets/images/Inicio.png";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Smile, Sparkles, Lightbulb, ChevronRight, Leaf, HeartPulse, Scale, CalendarCheck, Utensils, Goal, Dumbbell, Apple } from "lucide-react";

export default function Home() {
  const sections = [
    {
      title: "Nutrición Personalizada",
      emoji: "🥗",
      description: "Planes alimenticios adaptados a tus necesidades específicas, objetivos y preferencias.",
      gradient: "from-emerald-400 to-teal-500",
      darkGradient: "from-emerald-500 to-teal-600",
      icon: Leaf,
      subSections: [
        {
          title: "Plan Semanal",
          emoji: "📅",
          description: "Menús diseñados para cada día de la semana",
          icon: CalendarCheck
        },
        {
          title: "Recetas Saludables",
          emoji: "🍳",
          description: "Ideas deliciosas y fáciles de preparar",
          icon: Utensils
        }
      ]
    },
    {
      title: "Tips de Alimentación",
      emoji: "🍎",
      description: "Consejos prácticos para mejorar tus hábitos alimenticios día a día.",
      gradient: "from-amber-400 to-orange-500",
      darkGradient: "from-amber-500 to-orange-600",
      icon: Apple,
      subSections: [
        {
          title: "Superalimentos",
          emoji: "🌟",
          description: "Descubre los alimentos más nutritivos",
          icon: Sparkles
        },
        {
          title: "Hidratación",
          emoji: "💧",
          description: "La importancia del agua en tu dieta",
          icon: Goal
        }
      ]
    },
    {
      title: "Rutinas de Ejercicio",
      emoji: "🏋️",
      description: "Completa tu plan nutricional con rutinas adaptadas a tus objetivos.",
      gradient: "from-indigo-400 to-purple-500",
      darkGradient: "from-indigo-500 to-purple-600",
      icon: Dumbbell,
      subSections: [
        {
          title: "En Casa",
          emoji: "🏠",
          description: "Ejercicios sin necesidad de gimnasio",
          icon: HeartPulse
        },
        {
          title: "Cardio",
          emoji: "🏃",
          description: "Rutinas para mejorar tu resistencia",
          icon: Scale
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section Mejorada */}
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="md:w-1/2 space-y-6">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
            >
              Tu <span className="text-emerald-600 dark:text-emerald-400">transformación</span> nutricional comienza aquí
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300"
            >
              Nutritec combina ciencia nutricional y tecnología para ayudarte a alcanzar tus objetivos de salud.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Link
                href="/auth/login"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 font-medium text-center flex items-center justify-center gap-2"
              >
                <span>Iniciar Sesión</span>
                <ChevronRight className="h-5 w-5" />
              </Link>
              <Link
                href="/auth/register"
                className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-emerald-600 dark:text-emerald-400 px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 font-medium text-center border border-emerald-200 dark:border-gray-700 flex items-center justify-center gap-2"
              >
                <span>Registrarse</span>
                <Sparkles className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="md:w-1/2 flex justify-center"
          >
            <Image
              src={inicioImage}
              alt="Nutritec App"
              width={600}
              height={500}
              className="object-contain max-h-[400px] w-auto"
              priority
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            El camino más inteligente hacia tu bienestar
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Nutritec te ofrece las herramientas necesarias para transformar tu relación con la alimentación.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
          >
            <div className="bg-emerald-100 dark:bg-emerald-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <Leaf className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">Nutrición precisa</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Planes creados por expertos y ajustados a tus necesidades metabólicas.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
          >
            <div className="bg-amber-100 dark:bg-amber-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <Apple className="h-8 w-8 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">Hábitos saludables</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Aprende a tomar decisiones alimenticias inteligentes en cualquier situación.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
          >
            <div className="bg-indigo-100 dark:bg-indigo-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <Dumbbell className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">Ejercicio integrado</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Complementa tu nutrición con rutinas diseñadas para potenciar tus resultados.
            </p>
          </motion.div>
        </div>
      </div>

      {/* App Sections */}
      <div className="bg-white dark:bg-gray-900 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4"
            >
              Todo lo que necesitas en un solo lugar
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Nutritec integra las herramientas esenciales para tu transformación saludable.
            </motion.p>
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

                  <div className="mt-6">
                    <Link
                      href="/auth/register"
                      className={`bg-gradient-to-r ${section.gradient} dark:${section.darkGradient} text-white px-4 sm:px-5 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center font-medium w-full justify-center`}
                    >
                      <span>Empezar ahora</span>
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            ¿Listo para comenzar tu viaje saludable?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-emerald-100 max-w-3xl mx-auto mb-8"
          >
            Regístrate ahora y obtén tu plan personalizado en minutos.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              href="/auth/register"
              className="bg-white hover:bg-gray-100 text-emerald-600 px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 font-medium text-lg flex items-center justify-center gap-2"
            >
              <span>Crear cuenta gratis</span>
              <Sparkles className="h-5 w-5" />
            </Link>
            <Link
              href="/auth/login"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 font-medium text-lg flex items-center justify-center gap-2"
            >
              <span>Iniciar sesión</span>
              <ChevronRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}