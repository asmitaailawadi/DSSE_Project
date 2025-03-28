"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./AuthContext"
import "../css/Login.css"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false);

  

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
  
    const formData = new URLSearchParams()
    formData.append("username", email)  // `username` instead of `email`
    formData.append("password", password)
  
    try {
      const response = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData, // ✅ Form Data instead of JSON
      })
  
      const data = await response.json()
      if (!response.ok) throw new Error(data.detail || "Login failed")
  
      login({email}, data.access_token)
      navigate("/home")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  

  return (
    <div className="page-container">
        <div className="login-container">
        <h1 className="login-title">Login</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
            <label>Email:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field"
            />
            </div>
            <div className="form-group">
            <label>Password:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field"
            />
            </div>
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
        </form>
        <p className="signup-link">
            Don't have an account? <span onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
        </div>
    </div>

  )
}

export default Login