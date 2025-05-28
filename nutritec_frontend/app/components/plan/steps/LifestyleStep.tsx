"use client"

import { Info } from "lucide-react"

interface LifestyleStepProps {
  formData: any
  updateFormData: (data: any) => void
}

export default function LifestyleStep({ formData, updateFormData }: LifestyleStepProps) {
  const handleExerciseTypeChange = (type: string) => {
    const updatedTypes = formData.exerciseType.includes(type)
      ? formData.exerciseType.filter((t: string) => t !== type)
      : [...formData.exerciseType, type]

    updateFormData({ exerciseType: updatedTypes })
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg flex items-start">
        <Info className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Tu estilo de vida influye significativamente en tus necesidades nutricionales. Esta información nos ayudará a
          ajustar tu plan según tu nivel de actividad diaria.
        </p>
      </div>

      {/* Nivel de actividad */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Nivel de actividad diaria
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: "sedentary", label: "Sedentario", description: "Poco o nada de ejercicio" },
            { value: "lightly_active", label: "Ligeramente activo", description: "Ejercicio ligero 1-3 días/semana" },
            {
              value: "moderately_active",
              label: "Moderadamente activo",
              description: "Ejercicio moderado 3-5 días/semana",
            },
            { value: "very_active", label: "Muy activo", description: "Ejercicio intenso 6-7 días/semana" },
          ].map((option) => (
            <div key={option.value}>
              <label
                className={`flex flex-col h-full p-4 border rounded-lg cursor-pointer transition-all ${
                  formData.activityLevel === option.value
                    ? "border-amber-500 bg-amber-50 dark:border-amber-400 dark:bg-amber-900/20"
                    : "border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
                }`}
              >
                <div className="flex items-center mb-1">
                  <input
                    type="radio"
                    name="activityLevel"
                    value={option.value}
                    checked={formData.activityLevel === option.value}
                    onChange={() => updateFormData({ activityLevel: option.value })}
                    className="w-4 h-4 text-amber-500 dark:text-amber-400 focus:ring-amber-500 dark:focus:ring-amber-400"
                  />
                  <span className="ml-2 font-medium text-gray-700 dark:text-gray-300">{option.label}</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{option.description}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Frecuencia de ejercicio */}
      <div>
        <label htmlFor="exerciseFrequency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Frecuencia de ejercicio (días por semana)
        </label>
        <select
          id="exerciseFrequency"
          value={formData.exerciseFrequency}
          onChange={(e) => updateFormData({ exerciseFrequency: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="">Selecciona una opción</option>
          <option value="0">0 días - No hago ejercicio</option>
          <option value="1-2">1-2 días por semana</option>
          <option value="3-4">3-4 días por semana</option>
          <option value="5-6">5-6 días por semana</option>
          <option value="7">7 días por semana</option>
        </select>
      </div>

      {/* Tipo de ejercicio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tipo de ejercicio que realizas
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { value: "cardio", label: "Cardio (correr, nadar, ciclismo)" },
            { value: "strength", label: "Entrenamiento de fuerza" },
            { value: "flexibility", label: "Flexibilidad (yoga, pilates)" },
            { value: "sports", label: "Deportes de equipo" },
            { value: "hiit", label: "HIIT / Entrenamiento por intervalos" },
            { value: "walking", label: "Caminata" },
          ].map((option) => (
            <label
              key={option.value}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                formData.exerciseType.includes(option.value)
                  ? "border-emerald-500 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-900/20"
                  : "border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
              }`}
            >
              <input
                type="checkbox"
                checked={formData.exerciseType.includes(option.value)}
                onChange={() => handleExerciseTypeChange(option.value)}
                className="w-4 h-4 text-emerald-500 dark:text-emerald-400 focus:ring-emerald-500 dark:focus:ring-emerald-400"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Horas de sueño */}
        <div>
          <label htmlFor="sleepHours" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Horas de sueño por noche
          </label>
          <select
            id="sleepHours"
            value={formData.sleepHours}
            onChange={(e) => updateFormData({ sleepHours: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">Selecciona una opción</option>
            <option value="less-than-5">Menos de 5 horas</option>
            <option value="5-6">5-6 horas</option>
            <option value="7-8">7-8 horas</option>
            <option value="more-than-8">Más de 8 horas</option>
          </select>
        </div>

        {/* Consumo de agua */}
        <div>
          <label htmlFor="waterIntake" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Consumo diario de agua
          </label>
          <select
            id="waterIntake"
            value={formData.waterIntake}
            onChange={(e) => updateFormData({ waterIntake: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">Selecciona una opción</option>
            <option value="less-than-1L">Menos de 1 litro</option>
            <option value="1-2L">1-2 litros</option>
            <option value="2-3L">2-3 litros</option>
            <option value="more-than-3L">Más de 3 litros</option>
          </select>
        </div>

        {/* Nivel de estrés */}
        <div>
          <label htmlFor="stressLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nivel de estrés habitual
          </label>
          <select
            id="stressLevel"
            value={formData.stressLevel}
            onChange={(e) => updateFormData({ stressLevel: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">Selecciona una opción</option>
            <option value="low">Bajo - Raramente me siento estresado</option>
            <option value="moderate">Moderado - Me estreso ocasionalmente</option>
            <option value="high">Alto - Frecuentemente estresado</option>
            <option value="very-high">Muy alto - Constantemente estresado</option>
          </select>
        </div>

        {/* Ocupación */}
        <div>
          <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tipo de ocupación
          </label>
          <select
            id="occupation"
            value={formData.occupation}
            onChange={(e) => updateFormData({ occupation: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">Selecciona una opción</option>
            <option value="sedentary">Trabajo sedentario (oficina)</option>
            <option value="lightly-active">Ligeramente activo (profesor, vendedor)</option>
            <option value="moderately-active">Moderadamente activo (camarero, enfermero)</option>
            <option value="very-active">Muy activo (construcción, agricultura)</option>
            <option value="student">Estudiante</option>
            <option value="retired">Jubilado</option>
            <option value="other">Otro</option>
          </select>
        </div>
      </div>
    </div>
  )
}
