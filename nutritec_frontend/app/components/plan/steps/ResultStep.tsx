"use client"

import { useState } from "react"
import { Clipboard, Download, Share2, Check, AlertCircle } from "lucide-react"
import ReactMarkdown from "react-markdown"

interface ResultStepProps {
  plan: string | null
  userName?: string
}

export default function ResultStep({ plan, userName = "Usuario" }: ResultStepProps) {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCopy = async () => {
    if (!plan) return

    try {
      await navigator.clipboard.writeText(plan)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      setError("No se pudo copiar al portapapeles. Intenta nuevamente.")
      setTimeout(() => setError(null), 3000)
    }
  }

  const handleDownload = () => {
    if (!plan) return

    const blob = new Blob([plan], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "plan-nutricional.md"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleShare = async () => {
    if (!plan) return

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Mi Plan Nutricional Personalizado",
          text: "Mira mi plan nutricional personalizado generado por NutriTec",
          // url: window.location.href,
        })
      } catch (err) {
        setError("No se pudo compartir el plan. Intenta nuevamente.")
        setTimeout(() => setError(null), 3000)
      }
    } else {
      setError("Tu navegador no soporta la función de compartir.")
      setTimeout(() => setError(null), 3000)
    }
  }

  if (!plan) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="w-12 h-12 text-amber-500 dark:text-amber-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">No se pudo generar el plan</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Hubo un problema al generar tu plan nutricional. Por favor, intenta nuevamente.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg flex items-start">
          <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
        <div className="prose dark:prose-invert max-w-none prose-headings:text-emerald-700 dark:prose-headings:text-emerald-400 prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg">
          <ReactMarkdown>{plan}</ReactMarkdown>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={handleCopy}
          className="flex items-center px-6 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg border border-gray-300 dark:border-gray-600"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2 text-green-500" />
              Copiado
            </>
          ) : (
            <>
              <Clipboard className="w-4 h-4 mr-2" />
              Copiar Plan
            </>
          )}
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <Download className="w-4 h-4 mr-2" />
          Descargar PDF
        </button>
        <button
          onClick={handleShare}
          className="flex items-center px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Compartir
        </button>
      </div>

      <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-800">
        <h3 className="text-lg font-medium text-emerald-800 dark:text-emerald-300 mb-2">¿Qué sigue, {userName}?</h3>
        <p className="text-emerald-700 dark:text-emerald-400 mb-4">
          Tu plan nutricional personalizado está listo. Aquí hay algunos consejos para comenzar:
        </p>
        <ul className="space-y-2 text-emerald-700 dark:text-emerald-400">
          <li className="flex items-start">
            <span className="w-5 h-5 bg-emerald-500 dark:bg-emerald-600 rounded-full text-white flex items-center justify-center mr-2 mt-0.5 text-xs">
              1
            </span>
            <span>Descarga o guarda tu plan para tenerlo siempre a mano.</span>
          </li>
          <li className="flex items-start">
            <span className="w-5 h-5 bg-emerald-500 dark:bg-emerald-600 rounded-full text-white flex items-center justify-center mr-2 mt-0.5 text-xs">
              2
            </span>
            <span>Comienza implementando los cambios gradualmente para crear hábitos sostenibles.</span>
          </li>
          <li className="flex items-start">
            <span className="w-5 h-5 bg-emerald-500 dark:bg-emerald-600 rounded-full text-white flex items-center justify-center mr-2 mt-0.5 text-xs">
              3
            </span>
            <span>Haz seguimiento de tu progreso y ajusta según sea necesario.</span>
          </li>
          <li className="flex items-start">
            <span className="w-5 h-5 bg-emerald-500 dark:bg-emerald-600 rounded-full text-white flex items-center justify-center mr-2 mt-0.5 text-xs">
              4
            </span>
            <span>Consulta con un profesional de la salud antes de realizar cambios significativos en tu dieta.</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
