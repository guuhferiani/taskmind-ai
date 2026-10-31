import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

/**
 * Configuração do Firebase usando variáveis de ambiente do Vite.
 * Essas variáveis são injetadas a partir do arquivo .env local.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

// Validação didática para alertar os alunos caso falte alguma variável
const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'appId']
const missingKeys = requiredKeys.filter(key => !firebaseConfig[key])

if (missingKeys.length > 0) {
  console.warn(
    `[Firebase] Atenção: as seguintes variáveis não foram encontradas no .env: ${missingKeys.join(', ')}. ` +
    `Verifique o arquivo .env na raiz do projeto.`
  )
}

// Inicialização do aplicativo Firebase (SDK Modular v10+)
export const app = initializeApp(firebaseConfig)

// Exportação dos serviços essenciais prontos para uso
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const googleProvider = new GoogleAuthProvider()

export default app

