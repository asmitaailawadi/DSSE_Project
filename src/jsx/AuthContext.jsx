"use client"

import { createContext, useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (token && storedUser) {
      try {
        setUser(storedUser ? JSON.parse(storedUser) : null)
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error)
        localStorage.removeItem("user")
        setUser(null)  // Fallback to null if JSON parsing fails
      }
    }

    setLoading(false)
  }, [])

  const login = (userData, token) => {
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    navigate("/login")
  }

  const checkToken = async () => {
    const token = localStorage.getItem("token")

    if (!token) {
      logout()
      return false
    }

    try {
      const response = await fetch("http://localhost:8000/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        logout()
        return false
      }

      return true
    } catch (error) {
      logout()
      return false
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkToken, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}