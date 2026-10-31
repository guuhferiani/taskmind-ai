import React from 'react'
import { Flame, CheckCircle, AlertTriangle } from 'lucide-react'
import { app } from '../services/firebase'

export default function FirebaseStatus() {
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID
  const isConfigured = Boolean(app && projectId && projectId !== 'sua_api_key_aqui')

  if (!isConfigured) {
    return (
      <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-medium">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
        <span>Firebase: Pendente .env</span>
      </div>
    )
  }

  return (
    <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-orange-50 text-orange-800 border border-orange-200 text-xs font-medium" title={`Conectado ao projeto: ${projectId}`}>
      <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
      <span className="font-semibold">Firebase:</span>
      <span className="text-orange-700 font-mono text-[11px] truncate max-w-[120px] sm:max-w-none">{projectId}</span>
      <span className="hidden md:inline bg-orange-200/60 text-orange-800 text-[10px] px-1.5 py-0.2 rounded font-bold uppercase">
        Spark
      </span>
    </div>
  )
}
