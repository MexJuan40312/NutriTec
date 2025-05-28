"use client"

import { useState } from "react"
import { Info, Plus, X } from "lucide-react"

interface DietaryPreferencesStepProps {
  formData: any
  updateFormData: (data: any) => void
}

export default function DietaryPreferencesStep({ formData, updateFormData }: DietaryPreferencesStepProps) {
  const [newFoodPreference, setNewFoodPreference] = useState("")
  const [newDislikedFood, setNewDislikedFood] = useState("")

  const handleAddFoodPreference = () => {
    if (newFoodPreference.trim() && !formData.foodPreferences.includes(newFoodPreference.trim())) {
      updateFormData({
        foodPreferences: [...formData.foodPreferences, newFoodPreference.trim()],
      })
      setNewFoodPreference("")
    }
  }

  const handleRemoveFoodPreference = (food: string) => {
    updateFormData({
      foodPreferences: formData.foodPreferences.filter((item: string) => item !== food),
    })
  }

  const handleAddDislikedFood = () => {
    if (newDislikedFood.trim() && !formData.dislikedFoods.includes(newDislikedFood.trim())) {
      updateFormData({
        dislikedFoods: [...formData.dislikedFoods, newDislikedFood.trim()],
      })
      setNewDislikedFood("")
    }
  }

  const handleRemoveDislikedFood = (food: string) => {
    updateFormData({
      dislikedFoods: formData.dislikedFoods.filter((item: string) => item !== food),
    })
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg flex items-start">
        <Info className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Tus preferencias alimentarias son fundamentales para crear un plan que disfrutes y puedas mantener a largo
          plazo.
        </p>
      </div>

      {/* Tipo de dieta */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tipo de dieta que sigues o prefieres
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { value: "omnivore", label: "Omnívora (de todo)" },
            { value: "vegetarian", label: "Vegetariana" },
            { value: "vegan", label: "Vegana" },
            { value: "pescatarian", label: "Pescetariana" },
            { value: "keto", label: "Cetogénica" },
            { value: "paleo", label: "Paleo" },
            { value: "mediterranean", label: "Mediterránea" },
            { value: "low_carb", label: "Baja en carbohidratos" },
            { value: "gluten_free", label: "Sin gluten" },
          ].map((option) => (
            <label
              key={option.value}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                formData.dietType === option.value
                  ? "border-amber-500 bg-amber-50 dark:border-amber-400 dark:bg-amber-900/20"
                  : "border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
              }`}
            >
              <input
                type="radio"
                name="dietType"
                value={option.value}
                checked={formData.dietType === option.value}
                onChange={() => updateFormData({ dietType: option.value })}
                className="w-4 h-4 text-amber-500 dark:text-amber-400 focus:ring-amber-500 dark:focus:ring-amber-400"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Alimentos preferidos */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Alimentos que prefieres o disfrutas
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.foodPreferences.map((food: string) => (
            <div
              key={food}
              className="flex items-center bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800"
            >
              <span className="text-sm text-emerald-700 dark:text-emerald-300">{food}</span>
              <button
                type="button"
                onClick={() => handleRemoveFoodPreference(food)}
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
            value={newFoodPreference}
            onChange={(e) => setNewFoodPreference(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Ej: Pollo, Brócoli, Aguacate"
          />
          <button
            type="button"
            onClick={handleAddFoodPreference}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white rounded-r-lg"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Agrega alimentos que disfrutas y te gustaría incluir en tu plan.
        </p>
      </div>

      {/* Alimentos que no gustan */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Alimentos que no te gustan o prefieres evitar
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.dislikedFoods.map((food: string) => (
            <div
              key={food}
              className="flex items-center bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full border border-red-200 dark:border-red-800"
            >
              <span className="text-sm text-red-700 dark:text-red-300">{food}</span>
              <button
                type="button"
                onClick={() => handleRemoveDislikedFood(food)}
                className="ml-2 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={newDislikedFood}
            onChange={(e) => setNewDislikedFood(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Ej: Cebolla, Hígado, Coliflor"
          />
          <button
            type="button"
            onClick={handleAddDislikedFood}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white rounded-r-lg"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Agrega alimentos que no te gustan o prefieres evitar en tu plan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Frecuencia de comidas */}
        <div>
          <label htmlFor="mealFrequency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Frecuencia de comidas diarias
          </label>
          <select
            id="mealFrequency"
            value={formData.mealFrequency}
            onChange={(e) => updateFormData({ mealFrequency: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">Selecciona una opción</option>
            <option value="2">2 comidas al día</option>
            <option value="3">3 comidas al día</option>
            <option value="4">4 comidas al día</option>
            <option value="5">5 comidas al día</option>
            <option value="6+">6 o más comidas al día</option>
          </select>
        </div>

        {/* Tiempo para cocinar */}
        <div>
          <label htmlFor="cookingTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tiempo disponible para cocinar
          </label>
          <select
            id="cookingTime"
            value={formData.cookingTime}
            onChange={(e) => updateFormData({ cookingTime: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">Selecciona una opción</option>
            <option value="minimal">Mínimo - Recetas rápidas (menos de 15 min)</option>
            <option value="moderate">Moderado - 15-30 minutos por comida</option>
            <option value="extended">Extendido - 30-60 minutos por comida</option>
            <option value="extensive">Extenso - Más de 60 minutos, disfruto cocinar</option>
          </select>
        </div>

        {/* Presupuesto */}
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Presupuesto para alimentación
          </label>
          <select
            id="budget"
            value={formData.budget}
            onChange={(e) => updateFormData({ budget: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">Selecciona una opción</option>
            <option value="economic">Económico - Opciones accesibles</option>
            <option value="moderate">Moderado - Balance calidad/precio</option>
            <option value="premium">Premium - Priorizo calidad sobre precio</option>
          </select>
        </div>
      </div>
    </div>
  )
}
