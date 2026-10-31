import React, { createContext, useContext, useState, useEffect } from 'react'
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut 
} from 'firebase/auth'
import { auth, googleProvider } from '../services/firebase'

// Criação do Contexto de Autenticação
const AuthContext = createContext({})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Cadastro com E-mail e Senha
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  // Login com E-mail e Senha
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // Login com Conta Google
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider)
  }

  // Logout / Encerramento da Sessão
  const logout = () => {
    return signOut(auth)
  }

  // Observador de Estado de Autenticação em Tempo Real (onAuthStateChanged)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    // Limpeza do listener ao desmontar o componente
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signUp,
    signIn,
    signInWithGoogle,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

