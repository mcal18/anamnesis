import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from './services/firebase'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navigate } from "react-router-dom"

import AppLayout from './layouts/AppLayout'

import ProtectedRoute from "./components/ProtectedRoute"
import SignUp from "./pages/SignUp"
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Memories from './pages/Memories'
import Timeline from './pages/Timeline'
import Capsules from './pages/Capsules'
import ThenAndNow from './pages/ThenAndNow'
import FutureMe from './pages/FutureMe'


function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return unsubscribe
  }, [])

  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route
            path="/signup"
            element={user ? <Navigate to="/" replace /> : <SignUp />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <Login />}
          />
          <Route path="/" element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>}
          />
          <Route path="/memories" element={
            <ProtectedRoute user={user}>
              < Memories />
            </ProtectedRoute>}
          />
          <Route path="/timeline" element={
            <ProtectedRoute user={user}>
              <Timeline />
            </ProtectedRoute>}
          />
          <Route path="/capsules" element={
            <ProtectedRoute user={user}>
              <Capsules />
            </ProtectedRoute>}
          />
          <Route path="/then-and-now" element={
            <ProtectedRoute user={user}>
              <ThenAndNow />
            </ProtectedRoute>}
          />
          <Route path="/future-me" element={
            <ProtectedRoute user={user}>
              <FutureMe />
            </ProtectedRoute>}
          />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App