import { useState } from 'react'
import Dashboard from './Dashboard'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })

      const data = await response.json()

      if (data.success) {
        setIsLoggedIn(true)
      } else {
        setIsSuccess(false)
        setMessage('Invalid username or password')
      }
    } catch (error) {
      setIsSuccess(false)
      setMessage('Connection error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername('')
    setPassword('')
    setMessage('')
    setIsSuccess(false)
  }

  if (isLoggedIn) {
    return <Dashboard user={username} onLogout={handleLogout} />
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>Welcome Back</h1>
        <p className="login-subtitle">Sign in to your account</p>
        {message && (
          <div className={`message ${isSuccess ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
        <div className="login-footer">
          <a href="#">Forgot your password?</a>
        </div>
      </form>
    </div>
  )
}

export default App
