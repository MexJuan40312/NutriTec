"use client"

import { useState } from "react"
import { Info, Plus, X } from "lucide-react"

interface GoalsStepProps {
  formData: any
  updateFormData: (data: any) => void
}

export default function GoalsStep({ formData, updateFormData }: GoalsStepProps) {
  const [newSpecificGoal, setNewSpecificGoal] = useState("")

  const handleAddSpecificGoal = () => {
    if (newSpecificGoal.trim() && !formData.specificGoals.includes(newSpecificGoal.trim())) {
      updateFormData({
        specificGoals: [...formData.specificGoals, newSpecificGoal.trim()],
      })
      setNewSpecificGoal("")
    }
  }

  const handleRemoveSpecificGoal = (goal: string) => {
    updateFormData({
      specificGoals: formData.specificGoals.filter((item: string) => item !== goal),
    })
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg flex items-start">
        <Info className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Definir objetivos claros nos ayudará a crear un plan nutricional enfocado en lo que realmente quieres lograr.
        </p>
      </div>

      {/* Objetivo principal */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Objetivo principal</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { value: "weight_loss", label: "Pérdida de peso" },
            { value: "muscle_gain", label: "Ganancia muscular" },
            { value: "maintenance", label: "Mantenimiento de peso" },
            { value: "health_improvement", label: "Mejorar salud general" },
            { value: "energy_boost", label: "Aumentar energía" },
            { value: "athletic_performance", label: "Rendimiento deportivo" },
          ].map((option) => (
            <label
              key={option.value}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                formData.primaryGoal === option.value
                  ? "border-amber-500 bg-amber-50 dark:border-amber-400 dark:bg-amber-900/20"
                  : "border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
              }`}
            >
              <input
                type="radio"
                name="primaryGoal"
                value={option.value}
                checked={formData.primaryGoal === option.value}
                onChange={() => updateFormData({ primaryGoal: option.value })}
                className="w-4 h-4 text-amber-500 dark:text-amber-400 focus:ring-amber-500 dark:focus:ring-amber-400"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Peso objetivo */}
      {(formData.primaryGoal === "weight_loss" || formData.primaryGoal === "muscle_gain") && (
        <div className="mt-4">
          <label htmlFor="targetWeight" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Peso objetivo (kg)
          </label>
          <input
            type="number"
            id="targetWeight"
            value={formData.targetWeight}
            onChange={(e) => updateFormData({ targetWeight: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Ej: 65"
            step="0.1"
          />
        </div>
      )}

      {/* Plazo para alcanzar objetivo */}
      <div>
        <label htmlFor="timeframe" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Plazo para alcanzar tu objetivo
        </label>
        <select
          id="timeframe"
          value={formData.timeframe}
          onChange={(e) => updateFormData({ timeframe: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="">Selecciona una opción</option>
          <option value="1-month">1 mes</option>
          <option value="3-months">3 meses</option>
          <option value="6-months">6 meses</option>
          <option value="1-year">1 año</option>
          <option value="long-term">Largo plazo (más de 1 año)</option>
        </select>
      </div>

      {/* Objetivos específicos */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Objetivos específicos</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.specificGoals.map((goal: string) => (
            <div
              key={goal}
              className="flex items-center bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800"
            >
              <span className="text-sm text-emerald-700 dark:text-emerald-300">{goal}</span>
              <button
                type="button"
                onClick={() => handleRemoveSpecificGoal(goal)}
                className="ml-2 text-emerald-500 dark:text-emerald-400 hover:text-red-500 dark:hover:text-red-400"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={newSpecificGoal}
            onChange={(e) => setNewSpecificGoal(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Ej: Reducir colesterol, Mejorar digestión"
          />
          <button
            type="button"
            onClick={handleAddSpecificGoal}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white rounded-r-lg"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Agrega objetivos específicos que te gustaría lograr con tu plan nutricional.
        </p>
      </div>

      {/* Motivación */}
      <div>
        <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          ¿Qué te motiva a mejorar tu nutrición?
        </label>
        <textarea
          id="motivation"
          value={formData.motivation}
          onChange={(e) => updateFormData({ motivation: e.target.value })}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          placeholder="Comparte tu motivación principal para mejorar tus hábitos alimenticios..."
        ></textarea>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Entender tu motivación nos ayuda a personalizar mejor tu plan y darte consejos más relevantes.
        </p>
      </div>
    </div>
  )
}
