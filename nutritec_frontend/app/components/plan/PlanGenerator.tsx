"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Clipboard, Download, Share2, Sparkles } from "lucide-react"
import StepIndicator from "./StepIndicator"
import PersonalInfoStep from "./steps/PersonalInfoStep"
import LifestyleStep from "./steps/LifestyleStep"
import DietaryPreferencesStep from "./steps/DietaryPreferencesStep"
import GoalsStep from "./steps/GoalsStep"
import ReviewStep from "./steps/ReviewStep"
import ResultStep from "./steps/ResultStep"

// Actualizar la definición de la interfaz para incluir el nombre del usuario
interface PlanGeneratorProps {
  userName?: string
}

// Definición de los pasos del formulario
const steps = [
  { id: 1, name: "Información Personal", description: "Datos básicos para personalizar tu plan" },
  { id: 2, name: "Estilo de Vida", description: "Hábitos diarios y nivel de actividad" },
  { id: 3, name: "Preferencias Alimentarias", description: "Alimentos que prefieres y restricciones" },
  { id: 4, name: "Objetivos", description: "Lo que deseas lograr con tu plan" },
  { id: 5, name: "Revisión", description: "Confirma tus datos antes de generar" },
  { id: 6, name: "Resultado", description: "Tu plan nutricional personalizado" },
]

// Actualizar la definición de la función para recibir el nombre del usuario
export default function PlanGenerator({ userName = "Usuario" }: PlanGeneratorProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Información Personal
    age: "",
    gender: "",
    weight: "",
    height: "",
    healthIssues: [] as string[],
    medications: [] as string[],
    allergies: [] as string[],

    // Estilo de Vida
    activityLevel: "",
    exerciseFrequency: "",
    exerciseType: [] as string[],
    sleepHours: "",
    waterIntake: "",
    stressLevel: "",
    occupation: "",

    // Preferencias Alimentarias
    dietType: "",
    foodPreferences: [] as string[],
    dislikedFoods: [] as string[],
    mealFrequency: "",
    cookingTime: "",
    budget: "",

    // Objetivos
    primaryGoal: "",
    targetWeight: "",
    timeframe: "",
    specificGoals: [] as string[],
    motivation: "",
  })

  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Función para actualizar los datos del formulario
  const updateFormData = (stepData: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...stepData }))
  }

  // Función para avanzar al siguiente paso
  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  // Función para retroceder al paso anterior
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  // Función para generar el plan nutricional
  const generatePlan = async () => {
    setIsGenerating(true)
    setError(null)

    try {
      // Aquí iría la lógica para enviar los datos a la API y generar el plan
      // Por ahora, simulamos una respuesta después de 2 segundos
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Plan de ejemplo (en producción, esto vendría de la API)
      const examplePlan = `# Plan Nutricional Personalizado para ${userName}

## Información del Usuario
- **Nombre:** ${userName}
- **Edad:** ${formData.age} años
- **Peso actual:** ${formData.weight} kg
- **Altura:** ${formData.height} cm
- **Objetivo principal:** ${formData.primaryGoal}

## Recomendaciones Generales
Basado en tu perfil como ${formData.gender === "male" ? "hombre" : "mujer"} de ${formData.age} años con un nivel de actividad ${formData.activityLevel}, te recomendamos una ingesta diaria aproximada de 2000 calorías distribuidas en ${formData.mealFrequency} comidas.

## Plan Semanal
### Lunes
- **Desayuno:** Avena con frutas y nueces
- **Almuerzo:** Ensalada de quinoa con vegetales y proteína magra
- **Cena:** Pescado al horno con vegetales asados

### Martes
- **Desayuno:** Tostadas integrales con aguacate y huevo
- **Almuerzo:** Bowl de arroz integral con vegetales y pollo
- **Cena:** Sopa de verduras con legumbres

### Miércoles
- **Desayuno:** Batido verde con espinacas, plátano y proteína
- **Almuerzo:** Wrap de pavo con vegetales
- **Cena:** Pasta integral con salsa de tomate y albóndigas vegetales

### Jueves
- **Desayuno:** Yogur con granola y frutas
- **Almuerzo:** Ensalada mediterránea con garbanzos
- **Cena:** Tofu salteado con verduras y arroz

### Viernes
- **Desayuno:** Panqueques de avena con frutas
- **Almuerzo:** Bowl de fajitas con pollo o alternativa vegetal
- **Cena:** Hamburguesa casera con ensalada

### Sábado
- **Desayuno:** Huevos revueltos con vegetales y tostadas
- **Almuerzo:** Tacos de pescado con guacamole
- **Cena:** Pizza casera con base integral y toppings saludables

### Domingo
- **Desayuno:** Waffles integrales con frutas
- **Almuerzo:** Asado de vegetales con proteína de preferencia
- **Cena:** Sopa cremosa de calabaza

## Recomendaciones de Hidratación
Beber al menos 2 litros de agua al día, distribuidos a lo largo de la jornada.

## Suplementos Recomendados
- Vitamina D: 1000 UI diarias
- Omega 3: 1g diario

## Seguimiento
${userName}, recomendamos revisar este plan después de 4 semanas para evaluar progreso y hacer ajustes necesarios.`

      setGeneratedPlan(examplePlan)
      nextStep() // Avanzar al paso de resultados
    } catch (err) {
      setError("Hubo un error al generar tu plan. Por favor, intenta nuevamente.")
      console.error(err)
    } finally {
      setIsGenerating(false)
    }
  }

  // Renderizar el paso actual
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep formData={formData} updateFormData={updateFormData} />
      case 2:
        return <LifestyleStep formData={formData} updateFormData={updateFormData} />
      case 3:
        return <DietaryPreferencesStep formData={formData} updateFormData={updateFormData} />
      case 4:
        return <GoalsStep formData={formData} updateFormData={updateFormData} />
      case 5:
        return <ReviewStep formData={formData} onSubmit={generatePlan} isLoading={isGenerating} error={error} />
      case 6:
        return <ResultStep plan={generatedPlan} userName={userName} />
      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Generador de Plan Nutricional</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Hola {userName}, completa la información para crear un plan nutricional personalizado según tus necesidades y
          objetivos.
        </p>
      </div>

      {/* Indicador de pasos */}
      <div className="mb-8">
        <StepIndicator steps={steps} currentStep={currentStep} />
      </div>

      {/* Contenido del paso actual */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">{steps[currentStep - 1].name}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{steps[currentStep - 1].description}</p>

          {renderStep()}
        </motion.div>
      </AnimatePresence>

      {/* Botones de navegación */}
      {currentStep < 6 && (
        <div className="flex justify-between mt-6">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentStep === 1
                ? "opacity-50 cursor-not-allowed bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            } border border-gray-300 dark:border-gray-600`}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Anterior
          </button>

          {currentStep === 5 ? (
            <button
              onClick={generatePlan}
              disabled={isGenerating}
              className="flex items-center px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Generando...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generar Plan
                </>
              )}
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="flex items-center px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Siguiente
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      )}

      {/* Botones de acción para el resultado */}
      {currentStep === 6 && (
        <div className="flex flex-wrap gap-4 mt-6">
          <button className="flex items-center px-6 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg border border-gray-300 dark:border-gray-600">
            <Clipboard className="w-4 h-4 mr-2" />
            Copiar Plan
          </button>
          <button className="flex items-center px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
            <Download className="w-4 h-4 mr-2" />
            Descargar PDF
          </button>
          <button className="flex items-center px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
            <Share2 className="w-4 h-4 mr-2" />
            Compartir
          </button>
        </div>
      )}
    </div>
  )
}
