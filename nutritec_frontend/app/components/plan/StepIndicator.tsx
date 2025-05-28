"use client"

import { Check } from "lucide-react"

interface Step {
  id: number
  name: string
  description: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="hidden md:block">
      <ol className="flex items-center w-full">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id
          const isCurrent = currentStep === step.id

          return (
            <li key={step.id} className={`flex items-center ${index < steps.length - 1 ? "w-full" : ""}`}>
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium border-2 ${
                    isCompleted
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : isCurrent
                        ? "border-amber-500 text-amber-500 dark:border-amber-400 dark:text-amber-400"
                        : "border-gray-300 text-gray-500 dark:border-gray-600 dark:text-gray-400"
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : step.id}
                </div>
                <span
                  className={`mt-2 text-xs ${
                    isCurrent
                      ? "text-amber-500 font-medium dark:text-amber-400"
                      : isCompleted
                        ? "text-emerald-500 dark:text-emerald-400"
                        : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {step.name}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`w-full h-0.5 mx-2 ${
                    currentStep > index + 1 ? "bg-emerald-500 dark:bg-emerald-400" : "bg-gray-200 dark:bg-gray-700"
                  }`}
                ></div>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
