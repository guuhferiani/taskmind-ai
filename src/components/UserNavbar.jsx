import React from 'react'
import { LogIn, LogOut, User, Shield } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function UserNavbar({ onOpenAuthModal }) {
  const { currentUser, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (err) {
      console.error('Erro ao sair:', err)
    }
  }

  if (!currentUser) {
    return (
      <button
        onClick={onOpenAuthModal}
        className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
      >
        <LogIn className="w-3.5 h-3.5" />
        <span>Entrar / Cadastrar</span>
      </button>
    )
  }

  return (
    <div className="flex items-center space-x-3">
      {/* Badge com UID (Conceito Chave do SENAI: Isolamento por UID) */}
      <div 
        className="hidden md:flex items-center space-x-1.5 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 text-[11px] text-slate-600"
        title={`UID Completo: ${currentUser.uid}\nUsado pelas regras de segurança para garantir que apenas você acesse suas metas.`}
      >
        <Shield className="w-3 h-3 text-indigo-500" />
        <span className="font-medium text-slate-500">UID:</span>
        <span className="font-mono text-indigo-700 font-semibold">
          {currentUser.uid.substring(0, 8)}...
        </span>
      </div>

      {/* Perfil do Usuário */}
      <div className="flex items-center space-x-2">
        {currentUser.photoURL ? (
          <img 
            src={currentUser.photoURL} 
            alt="Avatar" 
            className="w-7 h-7 rounded-full border border-slate-200 object-cover" 
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
            {currentUser.email ? currentUser.email.charAt(0).toUpperCase() : <User className="w-3.5 h-3.5" />}
          </div>
        )}
        <span className="text-xs font-medium text-slate-700 hidden sm:inline truncate max-w-[140px]">
          {currentUser.displayName || currentUser.email}
        </span>
      </div>

      {/* Botão Sair */}
      <button
        onClick={handleLogout}
        className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
        title="Encerrar sessão"
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  )
}

