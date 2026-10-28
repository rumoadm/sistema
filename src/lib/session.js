import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { createSamplePlan } from '../data/countries/portugal'
import { auth, db } from './firebase'

const listeners = new Set()
let current = null
let ready = false

function emit() {
  listeners.forEach((listener) => listener(current))
}

function userRef(uid) {
  return doc(db, 'users', uid)
}

function authMessage(error) {
  const code = error?.code || ''
  if (code === 'auth/email-already-in-use') return 'Este e-mail já tem conta. Entre com ele.'
  if (code === 'auth/invalid-email') return 'Confira o e-mail digitado.'
  if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
    return 'E-mail ou senha incorretos.'
  }
  if (code === 'auth/too-many-requests') return 'Muitas tentativas. Espere um pouco e tente de novo.'
  if (code === 'auth/network-request-failed') return 'Sem conexão. Tente de novo.'
  if (code === 'auth/weak-password') return 'A senha precisa ter pelo menos 8 caracteres.'
  if (code === 'auth/invalid-api-key' || code === 'auth/api-key-not-valid.-please-pass-a-valid-api-key.') {
    return 'A chave do Firebase não foi aceita. Copie o firebaseConfig de novo.'
  }
  if (code === 'permission-denied') return 'O banco ainda está fechado. Publique as regras do Firestore e tente de novo.'
  return 'Não foi possível concluir agora. Tente de novo.'
}

async function toPublic(firebaseUser) {
  if (!firebaseUser) return null
  const snap = await getDoc(userRef(firebaseUser.uid))
  const data = snap.exists() ? snap.data() : {}
  return {
    id: firebaseUser.uid,
    name: data.name || '',
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    phone: data.phone || '',
    email: firebaseUser.email || '',
    emailVerified: firebaseUser.emailVerified,
    plan: data.plan || createSamplePlan(),
  }
}

onAuthStateChanged(auth, async (firebaseUser) => {
  try {
    current = await toPublic(firebaseUser)
  } catch {
    current = firebaseUser
      ? {
          id: firebaseUser.uid,
          name: '',
          firstName: '',
          lastName: '',
          phone: '',
          email: firebaseUser.email || '',
          emailVerified: firebaseUser.emailVerified,
          plan: createSamplePlan(),
        }
      : null
  }
  ready = true
  emit()
})

export function subscribe(listener) {
  listeners.add(listener)
  if (ready) listener(current)
  return () => listeners.delete(listener)
}

export function getCurrentUser() {
  return current
}

export function sessionReady() {
  return ready
}

function validAccount({ firstName, lastName, phone, email, password }) {
  const cleanFirst = String(firstName || '').trim()
  const cleanLast = String(lastName || '').trim()
  const digits = String(phone || '').replace(/\D/g, '')
  const cleanEmail = String(email || '').trim().toLowerCase()
  if (cleanFirst.length < 2) return { ok: false, error: 'Escreva seu nome.' }
  if (cleanLast.length < 2) return { ok: false, error: 'Escreva seu sobrenome.' }
  if (digits.length < 10 || digits.length > 11) return { ok: false, error: 'Confira o telefone com DDD.' }
  if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) return { ok: false, error: 'Confira o e-mail digitado.' }
  if (String(password || '').length < 8) return { ok: false, error: 'A senha precisa ter pelo menos 8 caracteres.' }
  return { ok: true, cleanFirst, cleanLast, digits, cleanEmail }
}

export async function signup({ firstName, lastName, phone, email, password }) {
  const check = validAccount({ firstName, lastName, phone, email, password })
  if (!check.ok) return check

  try {
    const credential = await createUserWithEmailAndPassword(auth, check.cleanEmail, password)
    const profile = {
      firstName: check.cleanFirst,
      lastName: check.cleanLast,
      name: `${check.cleanFirst} ${check.cleanLast}`,
      phone: check.digits,
      email: check.cleanEmail,
      plan: createSamplePlan(),
    }
    try {
      await setDoc(userRef(credential.user.uid), profile)
    } catch (error) {
      await credential.user.delete().catch(() => {})
      throw error
    }
    current = { id: credential.user.uid, ...profile, emailVerified: credential.user.emailVerified }
    emit()
    return { ok: true }
  } catch (error) {
    return { ok: false, error: authMessage(error) }
  }
}

export async function login({ email, password }) {
  const cleanEmail = String(email || '').trim().toLowerCase()
  if (!cleanEmail || !password) return { ok: false, error: 'Escreva o e-mail e a senha.' }
  try {
    await signInWithEmailAndPassword(auth, cleanEmail, password)
    return { ok: true }
  } catch (error) {
    return { ok: false, error: authMessage(error) }
  }
}

export async function logout() {
  await signOut(auth)
}

export async function requestPasswordReset(email) {
  const cleanEmail = String(email || '').trim().toLowerCase()
  if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) return { ok: false, error: 'Confira o e-mail digitado.' }
  try {
    await sendPasswordResetEmail(auth, cleanEmail)
    return { ok: true }
  } catch (error) {
    if (error?.code === 'auth/user-not-found') return { ok: true }
    return { ok: false, error: authMessage(error) }
  }
}

async function withPlan(change) {
  if (!auth.currentUser || !current?.plan) return
  const plan = change(current.plan)
  current = { ...current, plan }
  emit()
  try {
    await updateDoc(userRef(auth.currentUser.uid), { plan })
  } catch (error) {
    current = await toPublic(auth.currentUser)
    emit()
    return authMessage(error)
  }
}

export function toggleTask(taskId) {
  return withPlan((plan) => ({
    ...plan,
    tasks: plan.tasks.map((task) => (task.id === taskId ? { ...task, done: !task.done } : task)),
  }))
}

export function cycleDocument(documentId) {
  const order = ['pendente', 'andamento', 'pronto']
  return withPlan((plan) => ({
    ...plan,
    documents: plan.documents.map((document) => {
      if (document.id !== documentId) return document
      const index = Math.max(0, order.indexOf(document.status))
      return { ...document, status: order[(index + 1) % order.length] }
    }),
  }))
}

export function planStats(plan, path) {
  const tasks = path.tasks.map((task) => ({
    ...task,
    done: plan.tasks.find((item) => item.id === task.id)?.done ?? false,
  }))
  const documents = path.documents.map((document) => ({
    ...document,
    status: plan.documents.find((item) => item.id === document.id)?.status ?? 'pendente',
  }))
  const total = tasks.length + documents.length
  const done =
    tasks.filter((task) => task.done).length +
    documents.filter((document) => document.status === 'pronto').length
  return {
    tasks,
    documents,
    progress: total ? Math.round((done / total) * 100) : 0,
    next: tasks.find((task) => !task.done) || null,
    documentsReady: documents.length > 0 && documents.every((document) => document.status === 'pronto'),
    tasksReady: tasks.length > 0 && tasks.every((task) => task.done),
  }
}
