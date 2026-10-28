import { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentUser, sessionReady, subscribe } from '../lib/session'

const SessionContext = createContext({ user: null, ready: false })

export function SessionProvider({ children }) {
  const [state, setState] = useState(() => ({ user: getCurrentUser(), ready: sessionReady() }))

  useEffect(() => subscribe((user) => setState({ user, ready: true })), [])

  return <SessionContext.Provider value={state}>{children}</SessionContext.Provider>
}

export function useSession() {
  return useContext(SessionContext).user
}

export function useSessionState() {
  return useContext(SessionContext)
}
