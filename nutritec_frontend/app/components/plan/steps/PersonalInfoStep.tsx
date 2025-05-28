"use client"

import { useState } from "react"
import { Info, Plus, X } from "lucide-react"

interface PersonalInfoStepProps {
  formData: any
  updateFormData: (data: any) => void
}

export default function PersonalInfoStep({ formData, updateFormData }: PersonalInfoStepProps) {
  const [newHealthIssue, setNewHealthIssue] = useState("")
  const [newMedication, setNewMedication] = useState("")
  const [newAllergy, setNewAllergy] = useState("")

  const handleAddHealthIssue = () => {
    if (newHealthIssue.trim() && !formData.healthIssues.includes(newHealthIssue.trim())) {
      updateFormData({
        healthIssues: [...formData.healthIssues, newHealthIssue.trim()],
      })
      setNewHealthIssue("")
    }
  }

  const handleRemoveHealthIssue = (issue: string) => {
    updateFormData({
      healthIssues: formData.healthIssues.filter((item: string) => item !== issue),
    })
  }

  const handleAddMedication = () => {
    if (newMedication.trim() && !formData.medications.includes(newMedication.trim())) {
      updateFormData({
        medications: [...formData.medications, newMedication.trim()],
      })
      setNewMedication("")
    }
  }

  const handleRemoveMedication = (medication: string) => {
    updateFormData({
      medications: formData.medications.filter((item: string) => item !== medication),
    })
  }

  const handleAddAllergy = () => {
    if (newAllergy.trim() && !formData.allergies.includes(newAllergy.trim())) {
      updateFormData({
        allergies: [...formData.allergies, newAllergy.trim()],
      })
      setNewAllergy("")
    }
  }

  const handleRemoveAllergy = (allergy: string) => {
    updateFormData({
      allergies: formData.allergies.filter((item: string) => item !== allergy),
    })
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg flex items-start">
        <Info className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Esta información nos ayudará a crear un plan nutricional adaptado a tus características físicas y condiciones
          de salud.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Edad */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Edad
          </label>
          <input
            type="number"
            id="age"
            value={formData.age}
            onChange={(e) => updateFormData({ age: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Ej: 30"
          />
        </div>

        {/* Género */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Género</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={() => updateFormData({ gender: "male" })}
                className="w-4 h-4 text-emerald-500 dark:text-emerald-400 focus:ring-emerald-500 dark:focus:ring-emerald-400"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Masculino</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={() => updateFormData({ gender: "female" })}
                className="w-4 h-4 text-emerald-500 dark:text-emerald-400 focus:ring-emerald-500 dark:focus:ring-emerald-400"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Femenino</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="other"
                checked={formData.gender === "other"}
                onChange={() => updateFormData({ gender: "other" })}
                className="w-4 h-4 text-emerald-500 dark:text-emerald-400 focus:ring-emerald-500 dark:focus:ring-emerald-400"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Otro</span>
            </label>
          </div>
        </div>

        {/* Peso */}
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Peso (kg)
          </label>
          <input
            type="number"
            id="weight"
            value={formData.weight}
            onChange={(e) => updateFormData({ weight: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Ej: 70"
            step="0.1"
          />
        </div>

        {/* Altura */}
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Altura (cm)
          </label>
          <input
            type="number"
            id="height"
            value={formData.height}
            onChange={(e) => updateFormData({ height: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Ej: 175"
          />
        </div>
      </div>

      {/* Problemas de salud */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Problemas de salud a considerar
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.healthIssues.map((issue: string) => (
            <div key={issue} className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              <span className="text-sm text-gray-700 dark:text-gray-300">{issue}</span>
              <button
                type="button"
                onClick={() => handleRemoveHealthIssue(issue)}
                className="ml-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={newHealthIssue}
            onChange={(e) => setNewHealthIssue(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Ej: Diabetes, Hipertensión"
          />
          <button
            type="button"
            onClick={handleAddHealthIssue}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white rounded-r-lg"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Agrega cualquier condición médica que debamos considerar para tu plan nutricional.
        </p>
      </div>

      {/* Medicamentos */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Medicamentos que tomas actualmente
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.medications.map((medication: string) => (
            <div key={medication} className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              <span className="text-sm text-gray-700 dark:text-gray-300">{medication}</span>
              <button
                type="button"
                onClick={() => handleRemoveMedication(medication)}
                className="ml-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={newMedication}
            onChange={(e) => setNewMedication(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Ej: Metformina, Enalapril"
          />
          <button
            type="button"
            onClick={handleAddMedication}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white rounded-r-lg"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Algunos medicamentos pueden interactuar con ciertos alimentos.
        </p>
      </div>

      {/* Alergias */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Alergias o intolerancias alimentarias
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.allergies.map((allergy: string) => (
            <div key={allergy} className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              <span className="text-sm text-gray-700 dark:text-gray-300">{allergy}</span>
              <button
                type="button"
                onClick={() => handleRemoveAllergy(allergy)}
                className="ml-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={newAllergy}
            onChange={(e) => setNewAllergy(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Ej: Lactosa, Gluten, Maní"
          />
          <button
            type="button"
            onClick={handleAddAllergy}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white rounded-r-lg"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Especifica cualquier alergia o intolerancia alimentaria que tengas.
        </p>
      </div>
    </div>
  )
}
