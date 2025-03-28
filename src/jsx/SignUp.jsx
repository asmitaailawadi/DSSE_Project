"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./AuthContext"
import "../css/SignUp.css"

const SignUp = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_name: username, email, password }),
      })

      const data = await response.json()
      console.log("Backend Response:", data)  

      if (response.ok) {
        login(data.user, data.access_token)
        navigate("/login")
      } else {
        setError(data.detail || "Registration failed. Please try again.")
      }
    } catch (err) {
      setError("An error occurred during registration.")
      console.error("Fetch Error:", err)
    }
  }

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="input-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      <p className="login-link">
        Already have an account? <span onClick={() => navigate("/login")}>Login</span>
      </p>
    </div>
  )
}

export default SignUp
