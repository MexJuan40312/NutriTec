"use client"

import { AlertCircle } from "lucide-react"

interface ReviewStepProps {
  formData: any
  onSubmit: () => void
  isLoading: boolean
  error: string | null
}

export default function ReviewStep({ formData, onSubmit, isLoading, error }: ReviewStepProps) {
  // Función para formatear los arrays en texto legible
  const formatArray = (array: string[]) => {
    if (!array || array.length === 0) return "No especificado"
    return array.join(", ")
  }

  // Mapeo de valores de formulario a texto legible
  const getReadableValue = (key: string, value: any) => {
    if (!value) return "No especificado"

    const mappings: Record<string, Record<string, string>> = {
      gender: {
        male: "Masculino",
        female: "Femenino",
        other: "Otro",
      },
      activityLevel: {
        sedentary: "Sedentario",
        lightly_active: "Ligeramente activo",
        moderately_active: "Moderadamente activo",
        very_active: "Muy activo",
      },
      exerciseFrequency: {
        "0": "0 días - No hago ejercicio",
        "1-2": "1-2 días por semana",
        "3-4": "3-4 días por semana",
        "5-6": "5-6 días por semana",
        "7": "7 días por semana",
      },
      sleepHours: {
        "less-than-5": "Menos de 5 horas",
        "5-6": "5-6 horas",
        "7-8": "7-8 horas",
        "more-than-8": "Más de 8 horas",
      },
      waterIntake: {
        "less-than-1L": "Menos de 1 litro",
        "1-2L": "1-2 litros",
        "2-3L": "2-3 litros",
        "more-than-3L": "Más de 3 litros",
      },
      stressLevel: {
        low: "Bajo - Raramente me siento estresado",
        moderate: "Moderado - Me estreso ocasionalmente",
        high: "Alto - Frecuentemente estresado",
        "very-high": "Muy alto - Constantemente estresado",
      },
      occupation: {
        sedentary: "Trabajo sedentario (oficina)",
        "lightly-active": "Ligeramente activo (profesor, vendedor)",
        "moderately-active": "Moderadamente activo (camarero, enfermero)",
        "very-active": "Muy activo (construcción, agricultura)",
        student: "Estudiante",
        retired: "Jubilado",
        other: "Otro",
      },
      dietType: {
        omnivore: "Omnívora (de todo)",
        vegetarian: "Vegetariana",
        vegan: "Vegana",
        pescatarian: "Pescetariana",
        keto: "Cetogénica",
        paleo: "Paleo",
        mediterranean: "Mediterránea",
        low_carb: "Baja en carbohidratos",
        gluten_free: "Sin gluten",
      },
      cookingTime: {
        minimal: "Mínimo - Recetas rápidas (menos de 15 min)",
        moderate: "Moderado - 15-30 minutos por comida",
        extended: "Extendido - 30-60 minutos por comida",
        extensive: "Extenso - Más de 60 minutos, disfruto cocinar",
      },
      budget: {
        economic: "Económico - Opciones accesibles",
        moderate: "Moderado - Balance calidad/precio",
        premium: "Premium - Priorizo calidad sobre precio",
      },
      primaryGoal: {
        weight_loss: "Pérdida de peso",
        muscle_gain: "Ganancia muscular",
        maintenance: "Mantenimiento de peso",
        health_improvement: "Mejorar salud general",
        energy_boost: "Aumentar energía",
        athletic_performance: "Rendimiento deportivo",
      },
      timeframe: {
        "1-month": "1 mes",
        "3-months": "3 meses",
        "6-months": "6 meses",
        "1-year": "1 año",
        "long-term": "Largo plazo (más de 1 año)",
      },
    }

    if (key in mappings && value in mappings[key]) {
      return mappings[key][value]
    }

    return value
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg flex items-start">
          <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      <div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-amber-800 dark:text-amber-300 mb-2">Revisa tu información</h3>
        <p className="text-sm text-amber-700 dark:text-amber-400 mb-4">
          Por favor, verifica que todos los datos sean correctos antes de generar tu plan nutricional personalizado.
        </p>

        {/* Información Personal */}
        <div className="mb-4">
          <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-2 border-b border-gray-200 dark:border-gray-700 pb-1">
            Información Personal
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Edad:</span>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-200">{formData.age || "No especificado"}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Género:</span>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-200">
                {getReadableValue("gender", formData.gender)}
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Peso (kg):</span>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-200">{formData.weight || "No especificado"}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Altura (cm):</span>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-200">{formData.height || "No especificado"}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Problemas de salud:</span>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-200">{formatArray(formData.healthIssues)}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Medicamentos:</span>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-200">{formatArray(formData.medications)}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Alergias:</span>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-200">{formatArray(formData.allergies)}</span>
            </div>
          </div>
        </div>

        {/* Estilo de Vida */}
        <div className="mb-4">
          <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-2 border-b border-gray-200 dark:border-gray-700 pb-1">
            Estilo de Vida
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Nivel de actividad:</span>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-200">
                {getReadableValue("activityLevel", formData.activityLevel)}
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Frecuencia de ejercicio:</span>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-200">
                {getReadableValue("exerciseFrequency", formData.exerciseFrequency)}
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tipo de ejercicio:</span>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-200">{formatArray(formData.exerciseType)}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Horas de sueño:</span>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-200">
                {getReadableValue("sleepHours", formData.sleepHours)}
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Consumo de agua:</span>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-200">
                {getReadableValue("waterIntake", formData.waterIntake)}
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Nivel de estrés:</span>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-200">
                {getReadableValue("stressLevel", formData.stressLevel)}
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Ocupación:</span>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-200">
                {getReadableValue("occupation", formData.occupation)}
              </span>
            </div>
          </div>
        </div>

        {/* Preferencias Alimentarias */}
        <div className="mb-4">
          <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-2 border-b border-gray-200 dark:border-gray-700 pb-1">
            Preferencias Alimentarias
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tipo de dieta:</span>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-200">
                {getReadableValue("dietType", formData.dietType)}
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Alimentos preferidos:</span>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-200">{formatArray(formData.foodPreferences)}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Alimentos a evitar:</span>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-200">{formatArray(formData.dislikedFoods)}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Frecuencia de comidas:</span>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-200">
                {formData.mealFrequency ? `${formData.mealFrequency} comidas al día` : "No especificado"}
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tiempo para cocinar:</span>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-200">
                {getReadableValue("cookingTime", formData.cookingTime)}
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Presupuesto:</span>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-200">
                {getReadableValue("budget", formData.budget)}
              </span>
            </div>
          </div>
        </div>

        {/* Objetivos */}
        <div>
          <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-2 border-b border-gray-200 dark:border-gray-700 pb-1">
            Objetivos
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Objetivo principal:</span>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-200">
                {getReadableValue("primaryGoal", formData.primaryGoal)}
              </span>
            </div>
            {formData.targetWeight && (
              <div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Peso objetivo (kg):</span>{" "}
                <span className="text-sm text-gray-800 dark:text-gray-200">{formData.targetWeight}</span>
              </div>
            )}
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Plazo:</span>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-200">
                {getReadableValue("timeframe", formData.timeframe)}
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Objetivos específicos:</span>{" "}
              <span className="text-sm text-gray-800 dark:text-gray-200">{formatArray(formData.specificGoals)}</span>
            </div>
          </div>
          {formData.motivation && (
            <div className="mt-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Motivación:</span>{" "}
              <p className="text-sm text-gray-800 dark:text-gray-200 mt-1">{formData.motivation}</p>
            </div>
          )}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 align-middle"></span>
              <span>Generando Plan...</span>
            </>
          ) : (
            "Generar Mi Plan Nutricional"
          )}
        </button>
      </div>
    </div>
  )
}
