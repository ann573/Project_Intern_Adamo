// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'intern-592a3.firebaseapp.com',
  projectId: 'intern-592a3',
  storageBucket: 'intern-592a3.firebasestorage.app',
  messagingSenderId: '14455118305',
  appId: '1:14455118305:web:21c331a03a93e3155e5aa0',
  measurementId: 'G-BN40VSB0M8'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }
